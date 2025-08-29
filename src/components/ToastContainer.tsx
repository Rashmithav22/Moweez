'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-xs">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`rounded px-4 py-2 shadow text-white cursor-pointer select-none
            ${
              type === 'success' ? 'bg-green-600' :
              type === 'error' ? 'bg-red-600' :
              'bg-blue-600'
            }
          `}
          onClick={() => removeToast(id)}
          role="alert"
        >
          {message}
        </div>
      ))}
    </div>
  );
}
