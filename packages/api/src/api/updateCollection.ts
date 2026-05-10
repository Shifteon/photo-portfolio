import { CollectionForm } from "@portfolio/types";
import { getSupabaseClient } from "../utils/getSupabaseClient";
import { addPhotosToCollection } from "../utils/addPhotosToCollection";

export async function updateCollection(slug: string, collection: CollectionForm) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("collections")
    .update({
      name: collection.name,
      slug: collection.slug,
      cover_photo_id: collection.coverPhotoId,
      order: collection.order,
    })
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    console.error("Error updating collection:", error);
    throw new Error(error.message);
  }

  // There might be photos to update or add
  if (collection.photoIds && collection.photoIds.length > 0) {
    const updatedPhotos = await addPhotosToCollection(slug, collection.photoIds);
    if (updatedPhotos.error) {
      console.error("Error updating photos:", updatedPhotos.error);
      throw new Error("Error updating photos");
    }
  }

  return data;
}
