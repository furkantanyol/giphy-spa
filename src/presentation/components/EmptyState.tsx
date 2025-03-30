'use client';

import { SearchXIcon } from '@/lib/icons';

export default function EmptyState() {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-muted-foreground">
        <SearchXIcon className="h-16 w-16" />
      </div>
      <h3 className="text-xl font-medium mb-2" aria-live="polite">
        No GIFs found
      </h3>
      <p className="text-muted-foreground max-w-md">
        Try searching for something else or check your internet connection.
      </p>
    </div>
  );
}
