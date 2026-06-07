"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PackageCardImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function PackageCardImageGallery({
  images,
  alt,
  className = "",
}: PackageCardImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const activeImage = images[activeIndex] ?? images[0];

  function showPrev() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        key={activeImage}
        src={activeImage}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={showPrev}
            className="absolute start-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute end-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>

          <div className="absolute inset-x-0 bottom-14 z-10 flex justify-center gap-1.5">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/55"
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
