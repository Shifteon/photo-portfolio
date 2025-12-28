import { PhotoSchema } from './photo';
import { z } from 'zod';

// export interface Collection {
//   name: string;
//   slug: string;
//   coverPhoto?: Photo;
//   order: number;
//   photos?: Photo[];
// }

export const CollectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  coverPhoto: PhotoSchema.nullable(),
  order: z.number(),
  photos: PhotoSchema.array().nullable(),
});

export const CollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  coverPhotoId: z.number().optional(),
  order: z.number().int(),
  photoIds: z.number().array().optional(),
});

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionForm = z.infer<typeof CollectionFormSchema>;


