'use client';

import { gifSchema } from '@/domain/models/giphy-api';
import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';

interface GifCardProps {
  gif: z.infer<typeof gifSchema>;
}

export default function GifCard({ gif }: GifCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Use the downsized image if available, otherwise fallback to the original
  const image = gif.images.downsized || gif.images.original;

  if (!image) {
    return null;
  }

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 aspect-square">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse h-full w-full bg-gray-200"></div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Failed to load
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={image.url}
            alt={gif.title || 'GIF'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleLoad}
            onError={handleError}
          />

          {gif.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm truncate">
              {gif.title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
