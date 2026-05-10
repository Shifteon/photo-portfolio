import { Collection, CollectionTransformer } from "@portfolio/types";
import { getSupabaseClient } from "../utils/getSupabaseClient";

export default async function getCollectionFromDb(collectionSlug: string): Promise<Collection | null> {
  const supabase = getSupabaseClient();
  const { data: collectionData, error } = await supabase.from('collections') // Start the query on the main collection table
    .select(`
      name,
      slug,
      order,
      cover_photo:cover_photo_id (
        id,
        title,
        storage_path,
        thumbnail_path,
        width,
        height,
        aspect_ratio
      ),
      photo_collections ( 
        photo_order,
        photo:photos (
          id,
          title,
          storage_path,
          thumbnail_path,
          width,
          height,
          aspect_ratio
        )
      )
    `)
    .eq('slug', collectionSlug) // Filter by collection slug/ID
    .order('photo_order', { // Assumes a 'photo_order' column exists in the junction table/photos table
      referencedTable: 'photo_collections', // Specify which table to order
      ascending: true
    })
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  if (!collectionData) {
    return null;
  }

  return CollectionTransformer.parse(collectionData);
}