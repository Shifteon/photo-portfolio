import { PhotoDbInsertSchema, PhotoDbInsert } from "@portfolio/types";
import { getSupabaseClient } from "./getSupabaseClient";

export const insertPhoto = async (photo: PhotoDbInsert): Promise<{ photoData: PhotoDbInsert | null, error: any }> => {
  try {

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.from('photos').insert({
      title: photo.title,
      storage_path: photo.storagePath,
      thumbnail_path: photo.thumbnailPath,
      width: photo.width,
      height: photo.height,
      aspect_ratio: photo.aspectRatio
    });

    const photoData = data ? PhotoDbInsertSchema.parse(data) : null;

    return { photoData, error };
  } catch (error) {
    console.error(error);
    return { photoData: null, error };
  }
}