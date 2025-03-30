import { useEffect, useState } from 'react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

export default function Toast({
  message,
  variant = 'info',
  duration = 5000,
  onClose,
  isVisible,
}: ToastProps) {
  const [isShowing, setIsShowing] = useState(isVisible);

  useEffect(() => {
    setIsShowing(isVisible);

    if (isVisible && duration !== Infinity) {
      const timer = setTimeout(() => {
        setIsShowing(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isShowing) return null;

  const variantStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50 transform transition-all duration-300 ease-in-out"
    >
      <div
        className={`rounded-md border-l-4 p-4 shadow-lg ${variantStyles[variant]}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            type="button"
            className="ml-4 inline-flex text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setIsShowing(false);
              onClose?.();
            }}
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
