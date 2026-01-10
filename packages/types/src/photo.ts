import { z } from "zod";

// export interface Photo {
//   id: number;
//   title: string;
//   storagePath: string | null;
//   width: number | null;
//   height: number | null;
//   aspectRatio: number | null;
// }

export const PhotoDbSchema = z.object({
  id: z.number(),
  title: z.string(),
  storage_path: z.string(),
  thumbnail_path: z.string(),
  width: z.number(),
  height: z.number(),
  aspect_ratio: z.number(),
  photo_order: z.number().nullable().optional(),
});

export const PhotoSchema = z.object({
  id: z.number(),
  title: z.string(),
  storagePath: z.string(),
  thumbnailPath: z.string(),
  width: z.number(),
  height: z.number(),
  aspectRatio: z.number(),
  order: z.number().nullable().optional(),
});

export const PhotoTransformer = PhotoDbSchema.transform((photo) => ({
  id: photo.id,
  title: photo.title,
  storagePath: photo.storage_path,
  thumbnailPath: photo.thumbnail_path,
  width: photo.width,
  height: photo.height,
  aspectRatio: photo.aspect_ratio,
  order: photo.photo_order,
}));

export const PhotoFormSchema = z.object({
  title: z.string(),
  file: z.instanceof(File),
});

export const PhotoDbInsertSchema = z.object({
  title: z.string(),
  storagePath: z.string(),
  thumbnailPath: z.string(),
  width: z.number(),
  height: z.number(),
  aspectRatio: z.number(),
});

export type Photo = z.infer<typeof PhotoSchema>;
export type PhotoForm = z.infer<typeof PhotoFormSchema>;
export type PhotoDbInsert = z.infer<typeof PhotoDbInsertSchema>;