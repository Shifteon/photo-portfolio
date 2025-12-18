import { CollectionSchema, Collection } from "@portfolio/types";
import { getSupabaseClient } from "./getSupabaseClient";

export const createCollection = async (collection: Collection) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('collections').insert({
      name: collection.name,
      slug: collection.slug,
      cover_photo: collection.coverPhoto?.id,
      order: collection.order,
    })

    const collectionData = data ? CollectionSchema.parse(data) : null;

    return { collection: collectionData, error }
  } catch (error) {
    console.log(error);
    return { collection: null, error }
  }
} 