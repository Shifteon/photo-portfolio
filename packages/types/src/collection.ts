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

export type Collection = z.infer<typeof CollectionSchema>;

