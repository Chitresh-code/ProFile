import React from 'react';
import { cn } from '../../lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
    overlay: {
      true: 'fixed inset-0 min-h-screen bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-gray-900/90 z-50',
      false: 'relative',
    }
  },
  defaultVariants: {
    show: true,
    overlay: false,
  },
});

const loaderVariants = cva('animate-spin text-emerald-500', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}

export function Spinner({ size, show, overlay, children, className }: SpinnerContentProps) {
  return (
    <div className={spinnerVariants({ show, overlay })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </div>
  );
}