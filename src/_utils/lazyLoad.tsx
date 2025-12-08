import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

type LoadingComponent = () => ReactNode;

/**
 * Creates a lazy-loaded component with optional loading fallback
 * @param importFunc - Dynamic import function
 * @param options - Loading options
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    loading?: LoadingComponent;
    ssr?: boolean;
  }
) {
  return dynamic(importFunc, {
    loading: options?.loading,
    ssr: options?.ssr ?? false,
  });
}

/**
 * Simple loading spinner component
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  );
}

/**
 * Loading skeleton for tables
 */
export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}
