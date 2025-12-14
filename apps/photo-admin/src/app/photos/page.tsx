import Link from "next/link";
import { getAllPhotos } from "@portfolio/api";
import { PhotoGrid } from "@portfolio/ui";
import { Photo } from "@portfolio/types";

export default async function PhotosPage() {

  const photoData = await getAllPhotos();
  const photos: Photo[] = await photoData.json();
  console.log(photos);

  return (
    <>
      <Link href="/photos/upload">Upload Photo</Link>
      {!photos || photos.length === 0 ? (
        <p>No photos found</p>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </>
  );
}