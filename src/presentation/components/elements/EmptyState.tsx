'use client';

import { SearchIcon, SearchXIcon } from '@/lib/icons';

interface EmptyStateProps {
  isInitialState?: boolean;
}

export default function EmptyState({
  isInitialState = false,
}: EmptyStateProps) {
  if (isInitialState) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-center">
        <div className="mb-4 text-primary/70">
          <SearchIcon className="h-16 w-16" />
        </div>
        <h3 className="text-xl font-medium mb-2" aria-live="polite">
          Search for GIFs
        </h3>
        <p className="text-muted-foreground max-w-md">
          Enter a search term above to discover amazing GIFs!
        </p>
      </div>
    );
  }

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
