
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadialProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

const RadialProgress = React.forwardRef<HTMLDivElement, RadialProgressProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('radial-progress', className)}
        style={{ '--value': value } as React.CSSProperties}
        {...props}
      >
        <span className="radial-progress-value">{value}%</span>
      </div>
    );
  }
);
RadialProgress.displayName = 'RadialProgress';

export { RadialProgress };
