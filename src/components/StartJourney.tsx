
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const StartJourney = () => {
  return (
    <section className="bg-muted/50 dark:bg-muted/10 py-20 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Start your journey
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join over 10 million people learning interactively.
        </p>
        <Button asChild size="lg" className="font-semibold shadow-lg">
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};
