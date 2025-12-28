import Link from "next/link";
import { getAllPhotos } from "@portfolio/api";
import { InteractivePhotoGrid } from "@portfolio/ui";
import { Photo } from "@portfolio/types";

export default async function PhotosPage() {

  const photoData = await getAllPhotos();
  const photos: Photo[] = await photoData.json();

  return (
    <>
      <Link href="/photos/upload">Upload Photo</Link>
      {!photos || photos.length === 0 ? (
        <p>No photos found</p>
      ) : (
        <InteractivePhotoGrid photos={photos} />
      )}
    </>
  );
}