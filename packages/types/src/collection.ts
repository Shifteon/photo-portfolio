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
  order: z.number().int(),
});

export type Collection = z.infer<typeof CollectionSchema>;

