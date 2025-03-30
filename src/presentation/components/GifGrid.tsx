'use client';

import { type IGiphyApiSearchResponse } from '@/domain/models/giphy-api';
import EmptyState from './EmptyState';
import GifCard from './GifCard';

interface GifGridProps {
  data?: IGiphyApiSearchResponse['data'];
  isLoading: boolean;
}

export default function GifGrid({ data, isLoading }: GifGridProps) {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
}
