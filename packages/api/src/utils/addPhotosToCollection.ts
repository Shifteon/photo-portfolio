import { getSupabaseClient } from "./getSupabaseClient";

export const addPhotosToCollection = async (collectionSlug: string, photoIds: number[]) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('photo_collections').upsert(
      photoIds.map((photoId, index) => ({
        collection_slug: collectionSlug,
        photo_id: photoId,
        photo_order: index
      }))
    ).select();
    return { data, error };
  } catch (error) {
    console.log(error);
    return { data: null, error };
  }
}