import CreateCollectionForm from "./CreateCollectionForm";
import { getAllPhotos } from "@portfolio/api";
import { Photo } from "@portfolio/types";

export default async function CreateCollectionPage() {
  const photoData = await getAllPhotos();
  const photos: Photo[] = await photoData.json();

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Collection</h1>
      <CreateCollectionForm photos={photos} />
    </div>
  );
}
