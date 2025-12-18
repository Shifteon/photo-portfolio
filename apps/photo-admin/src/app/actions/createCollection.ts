'use server';

import { CollectionFormSchema } from "@portfolio/types";
import { createCollection as createCollectionApi } from "@portfolio/api";
import { revalidatePath } from "next/cache";

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
    };

    const collection = CollectionFormSchema.safeParse(rawData);

    if (!collection.success) {
      return {
        success: false,
        message: 'Invalid form data',
        errors: collection.error.flatten().fieldErrors,
      };
    }

    const { data: validCollection } = collection;

    const { collection: newCollection, error } = await createCollectionApi({
      ...validCollection,
      coverPhoto: null,
      photos: null
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
