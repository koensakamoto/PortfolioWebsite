"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

type ProjectImagesProps = {
  images: string[];
  title: string;
};

export function ProjectImages({ images, title }: ProjectImagesProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="flex justify-around items-end gap-4 sm:gap-6 md:gap-10 px-6 sm:px-10 md:px-16 py-6 md:py-8 bg-muted border-b-2 border-border">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative border-2 border-border rounded-lg md:rounded-xl shadow-[4px_4px_0px_0px] shadow-shadow overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <Image
              src={img}
              alt={`${title} screenshot ${i + 1}`}
              width={1242}
              height={2688}
              sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
              className="h-64 sm:h-80 md:h-96 lg:h-[26rem] w-auto object-contain"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
