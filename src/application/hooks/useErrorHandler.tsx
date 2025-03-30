import { useToast } from '@/application/hooks/useToast';
import { useCallback } from 'react';

export function useErrorHandler() {
  const { showToast } = useToast();

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast('Something went wrong', 'error');
      }
    },
    [showToast]
  );

  return handleError;
}
