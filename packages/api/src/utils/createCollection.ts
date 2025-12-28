import { CollectionSchema, CollectionForm } from "@portfolio/types";
import { getSupabaseClient } from "./getSupabaseClient";
import { addPhotosToCollection } from "./addPhotosToCollection";

export const createCollection = async (collection: CollectionForm) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('collections').insert({
      name: collection.name,
      slug: collection.slug,
      cover_photo_id: collection.coverPhotoId || null,
      order: collection.order,
    }).select();

    if (error) {
      console.log(error);
      return { collection: null, error }
    }

    // const collectionData = data ? CollectionSchema.parse(data) : null;

    if (collection.photoIds) {
      console.log(collection.photoIds);
      const { data, error } = await addPhotosToCollection(collection.slug, collection.photoIds);

      if (error) {
        console.log(error);
        return { collection: null, error }
      }
    }

    return { collection: data, error }
  } catch (error) {
    console.log(error);
    return { collection: null, error }
  }
} 