'use server';

import { CollectionFormSchema } from "@portfolio/types";
import { createCollection as createCollectionApi } from "@portfolio/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: any;
  data?: any;
};

export const createCollection = async (prevState: ActionState | null, formData: FormData): Promise<ActionState> => {
  try {
    const rawData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      order: Number(formData.get("order")),
      coverPhotoId: Number(formData.get("coverPhotoId")),
      photoIds: formData.getAll("photoIds").map(Number),
    };

    const collection = CollectionFormSchema.safeParse(rawData);

    if (!collection.success) {
      console.log('errors', z.treeifyError(collection.error));
      return {
        success: false,
        message: 'Invalid form data',
        errors: z.treeifyError(collection.error),
      };
    }

    console.log('collection:', collection);

    const { data: validCollection } = collection;

    const { collection: newCollection, error } = await createCollectionApi({
      ...validCollection,
      coverPhotoId: validCollection.coverPhotoId || undefined,
      photoIds: validCollection.photoIds || undefined
    });

    if (error) {
      console.log(error);
      return {
        success: false,
        message: 'Database insertion failed',
        errors: error,
      };
    }

    revalidatePath("/collections");

    return {
      success: true,
      message: 'Collection created successfully',
      data: newCollection,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: error,
    };
  }
}
