'use client';

import { useToast } from '@/application/hooks/useToast';
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
    <div className="w-full p-6 bg-red-50 border border-red-100 rounded-lg">
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="text-5xl">😕</div>
        <h3 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h3>
        <p className="text-gray-700 max-w-md mb-2">
          {error.message || 'An unexpected error occurred while fetching GIFs.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
