import CollectionForm from "../_components/CollectionForm";
import { getAllPhotos } from "@portfolio/api";
import { createCollection } from "../../actions/createCollection";
import { Photo } from "@portfolio/types";

export default async function CreateCollectionPage() {
  const photoData = await getAllPhotos();
  const photos: Photo[] = await photoData.json();

  return (
    <div className="h-full w-full mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Collection</h1>
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <CollectionForm photos={photos} action={createCollection} />
      </div>
    </div>
  );
}
