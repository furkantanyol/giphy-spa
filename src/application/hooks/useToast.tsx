'use client';

import Toast from '@/presentation/components/Toast';
import { createContext, ReactNode, useContext, useState } from 'react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastContextType {
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number
  ) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
    duration: number;
    isVisible: boolean;
  }>({
    message: '',
    variant: 'info',
    duration: 5000,
    isVisible: false,
  });

  const showToast = (
    message: string,
    variant: ToastVariant = 'info',
    duration: number = 5000
  ) => {
    setToast({
      message,
      variant,
      duration,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
