'use client';

import { useToast } from '@/application/hooks/useToast';
import { AlertCircleIcon } from '@/lib/icons';
import { Button } from '@/presentation/components/atoms/button';
import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const { showToast } = useToast();

  useEffect(() => {
    showToast(error.message || 'An unexpected error occurred', 'error');
  }, [error, showToast]);

  return (
    <div
      className="w-full p-6 bg-destructive/10 border border-destructive/20 rounded-lg"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="text-destructive">
          <AlertCircleIcon className="h-14 w-14" />
        </div>
        <h3 className="text-xl font-semibold text-destructive">
          Something went wrong
        </h3>
        <p className="text-foreground max-w-md mb-2">
          {error.message || 'An unexpected error occurred while fetching GIFs.'}
        </p>
        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
      </div>
    </div>
  );
}
