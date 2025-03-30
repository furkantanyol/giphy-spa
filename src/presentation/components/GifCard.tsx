'use client';

import { gifSchema } from '@/domain/models/giphy-api';
import { Card, CardContent } from '@/presentation/components/atoms/card';
import { z } from '@/lib/validation';
import Image from 'next/image';
import { useState } from 'react';

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
    <Card className="overflow-hidden h-full">
      <CardContent className="p-0 h-full relative aspect-square">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="animate-pulse h-full w-full bg-muted/40"></div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
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
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm truncate">
                {gif.title}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
