import Image from "next/image";
import { Collection } from "@portfolio/types";
import { Button } from "../Button/Button";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface-container-low shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-variant">
        {collection.coverPhoto ? (
          <Image
            src={collection.coverPhoto.storagePath}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-on-surface-variant">
            No Cover Photo
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 pl-2 m-0">
        <h3 className="text-xl text-on-surface">
          {collection.name}
        </h3>
        <p className="text-body-small text-on-surface-variant">
          {/* We could add photo count or description here later */}
        </p>
      </div>

      <div className="flex gap-2 mt-auto p-2 w-[80%] self-end">
        <Button href={`/collections/${collection.slug}`} variant="outline" className="w-full">
          Preview
        </Button>
        <Button href={`/collections/${collection.slug}/edit`} variant="primary" className="w-full">
          Edit
        </Button>
      </div>
    </div>
  );
}
