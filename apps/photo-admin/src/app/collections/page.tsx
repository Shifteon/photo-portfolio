'use client';

import { Button } from "@portfolio/ui";

export default function CollectionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collections</h1>
        <Button href="/collections/create">
          Create Collection
        </Button>
      </div>
    </div>
  );
}