
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const threeDButtonVariants = cva(
  `inline-flex items-center justify-center font-bold text-white
   transition-all duration-150 ease-in-out
   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-gray-900`,
  {
    variants: {
      variant: {
        primary: `
          bg-primary border-primary/70
          hover:bg-primary/90 hover:border-primary/60
          dark:focus:ring-primary`,
        accent: `
          bg-accent border-accent/70
          hover:bg-accent/90 hover:border-accent/60
          dark:focus:ring-accent`,
        muted: `
          bg-muted border-muted-foreground/20 text-muted-foreground
          cursor-not-allowed`,
      },
      state: {
        active: 'active:translate-y-1 active:border-b-[2px]',
        inactive: '',
      }
    },
    defaultVariants: {
      variant: 'primary',
      state: 'active'
    },
  }
);

export interface ThreeDButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof threeDButtonVariants> {
  asChild?: boolean;
}

const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  ({ className, variant, state, ...props }, ref) => {
    const borderClass = state === 'active' ? 'border-b-[6px]' : 'border-b-[2px]';
    return (
      <button
        className={cn(threeDButtonVariants({ variant, state, className }), borderClass)}
        ref={ref}
        {...props}
      />
    );
  }
);
ThreeDButton.displayName = 'ThreeDButton';

export { ThreeDButton, threeDButtonVariants };
