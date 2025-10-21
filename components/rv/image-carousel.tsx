"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  name: string;
}

export function ImageCarousel({ images, name }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[currentImageIndex] || "/images/placeholder.svg"}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={currentImageIndex === 0}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  prevImage();
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Previous image (${currentImageIndex + 1} of ${images.length})`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextImage}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  nextImage();
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Next image (${currentImageIndex + 1} of ${images.length})`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                currentImageIndex === index && "ring-2 ring-primary"
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={currentImageIndex === index}
            >
              <Image
                src={image || "/images/placeholder.svg"}
                alt={`${name} - Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 12.5vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
