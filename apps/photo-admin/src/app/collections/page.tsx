import { getCollections } from "@portfolio/api";
import { CollectionsGrid, Button } from "@portfolio/ui";
import { Collection } from "@portfolio/types";
import Link from "next/link";

export default async function CollectionsPage() {
  const collectionsData = await getCollections();
  const collections: Collection[] = await collectionsData.json();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collections</h1>
        <Link href="/collections/create">
          <Button>
            Create Collection
          </Button>
        </Link>
      </div>
      <CollectionsGrid collections={collections} />
    </div>
  );
}