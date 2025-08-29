// src/components/ui/Toaster.tsx
'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-[1000]">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`px-4 py-2 rounded shadow text-white font-semibold max-w-xs
            ${
              type === 'success'
                ? 'bg-green-600'
                : type === 'error'
                ? 'bg-red-600'
                : 'bg-blue-600'
            }
          `}
        >
          {message}
        </div>
      ))}
    </div>
  );
}
