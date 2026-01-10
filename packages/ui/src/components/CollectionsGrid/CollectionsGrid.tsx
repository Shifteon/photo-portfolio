
import { Collection } from "@portfolio/types";
import { CollectionCard } from "./CollectionCard";

interface CollectionsGridProps {
  collections: Collection[];
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </div>
  );
}
