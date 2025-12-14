'use server';

import { PhotoDbInsertSchema, PhotoFormSchema } from "@portfolio/types";
import { uploadFile, insertPhoto } from "@portfolio/api";
import sharp from "sharp";
import { revalidatePath } from "next/cache";

const MAX_WIDTH = 2560; // 4k
const THUMBNAIL_WIDTH = 800;

const calculateAspectRatio = (width: number, height: number) => {
  return Number(Number(width / height).toFixed(2));
}

const getPhotoDimensions = async (file: Buffer): Promise<{ width: number, height: number }> => {
  const sharpImage = sharp(file);
  const metadata = await sharpImage.metadata();
  return { width: metadata.width, height: metadata.height };
}

const resizeImage = async (image: ArrayBuffer, width: number) => {
  const sharpImage = sharp(image);
  return await sharpImage.resize({
    width: width,
    withoutEnlargement: true,
    fit: "inside",
  }).toBuffer();
}

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: any;
  data?: any;
};

export const createPhoto = async (prevState: ActionState | null, formData: FormData): Promise<ActionState> => {
  try {
    const photo = PhotoFormSchema.safeParse({
      title: formData.get("title"),
      file: formData.get("file"),
    });

    if (!photo.success) {
      return {
        success: false,
        message: 'Invalid form data',
        errors: photo.error.flatten().fieldErrors,
      };
    }

    const { data: validPhoto } = photo;

    const arrayBuffer = await validPhoto.file.arrayBuffer();
    const contentType = validPhoto.file.type;

    const resizedImage = await resizeImage(arrayBuffer, MAX_WIDTH);
    const thumbnailImage = await resizeImage(arrayBuffer, THUMBNAIL_WIDTH);

    const fileName = validPhoto.title.replace(/\s/g, "_") + "." + validPhoto.file.name.split(".").pop();
    const thumbnailFileName = validPhoto.title.replace(/\s/g, "_") + "_thumbnail." + validPhoto.file.name.split(".").pop();

    const uploadMainImageResponse = await uploadFile(resizedImage, fileName, contentType);
    const uploadThumbnailImageResponse = await uploadFile(thumbnailImage, thumbnailFileName, contentType);

    const dimensions = await getPhotoDimensions(resizedImage);

    const photoToInsert = PhotoDbInsertSchema.parse({
      title: validPhoto.title,
      storagePath: uploadMainImageResponse,
      thumbnailPath: uploadThumbnailImageResponse,
      width: dimensions.width,
      height: dimensions.height,
      aspectRatio: calculateAspectRatio(dimensions.width, dimensions.height),
    });

    const { photoData, error } = await insertPhoto(photoToInsert);

    if (error) {
      console.log(error);
      return {
        success: false,
        message: 'Database insertion failed',
        errors: error,
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: 'Photo uploaded successfully',
      data: photoData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: error,
    };
  }
}