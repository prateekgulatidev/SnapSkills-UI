
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const threeDButtonVariants = cva(
  `inline-flex items-center justify-center font-bold text-white
   transition-all duration-150 ease-in-out
   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-gray-900
   drop-shadow-lg`,
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-b from-primary to-green-400 border-primary/70
          hover:from-primary/90 hover:to-green-400/90 hover:border-primary/60
          dark:focus:ring-primary`,
        accent: `
          bg-gradient-to-b from-accent to-purple-500 border-accent/70
          hover:from-accent/90 hover:to-purple-500/90 hover:border-accent/60
          dark:focus:ring-accent`,
        muted: `
          bg-gradient-to-b from-slate-400 to-slate-500 border-slate-600/50 text-white
          cursor-not-allowed`,
      },
      state: {
        active: 'active:translate-y-1 active:border-b-[2px] active:drop-shadow-md',
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
