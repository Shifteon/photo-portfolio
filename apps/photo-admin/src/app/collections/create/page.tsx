'use client';

import CreateCollectionForm from "./CreateCollectionForm";

export default function CreateCollectionPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-2xl font-bold">Create Collection</h1>
      <CreateCollectionForm />
    </div>
  );
}
