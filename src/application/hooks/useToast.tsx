'use client';

import { toast } from '@/lib/toast';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export function useToast() {
  const showToast = (
    message: string,
    variant: ToastVariant = 'info',
    duration: number = 5000
  ) => {
    switch (variant) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'warning':
        toast.warning(message, { duration });
        break;
      case 'info':
      default:
        toast.info(message, { duration });
        break;
    }
  };

  const hideToast = () => {
    toast.dismiss();
  };

  return { showToast, hideToast };
}
