import Image from "next/image";
import { Photo } from "@portfolio/types";

interface PhotoGridItemProps {
  photo: Photo;
  selected?: boolean;
  onClick?: (photo: Photo) => void;
  className?: string;
  sizes?: string;
}

export function PhotoGridItem({
  photo,
  selected,
  onClick,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: PhotoGridItemProps) {
  return (
    <div
      className={`break-inside-avoid relative mb-4 ${onClick ? "cursor-pointer" : ""
        } ${className}`}
      {...(onClick ? { onClick: () => onClick(photo) } : {})}
    >
      <div
        className={`relative overflow-hidden ${selected ? "ring-4 ring-primary" : ""
          }`}
      >
        <Image
          src={photo.thumbnailPath}
          alt={photo.title}
          width={photo.width || 800} // fallback width if null
          height={photo.height || 600} // fallback height if null
          className="w-full h-auto object-contain bg-gray-100 block"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
