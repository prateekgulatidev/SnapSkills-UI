import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LaptopIcon, GraphIcon, CodeSnippetIcon, XpBadgeIcon, ServerStackIcon } from "@/components/icons/HeroIcons";

export const Hero = () => {
  return (
    <section className="relative bg-background py-24 px-6 sm:px-12 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto z-10 relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-foreground">
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-accent">
            Master
          </span>{" "}
          <span className="font-serif">Coding</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          One Snap at a Time.
        </p>
        <p className="mt-6 text-muted-foreground/80 text-base">
          Interactive, gamified lessons in programming, system design & more.
        </p>
        <Button asChild size="lg" className="mt-8 font-semibold shadow-lg">
          <Link href="/learn">Get Started</Link>
        </Button>
      </div>

      <div className="absolute left-6 top-10 w-16 opacity-80" aria-hidden="true">
        <LaptopIcon />
      </div>
      <div className="absolute right-8 top-20 w-12 opacity-80" aria-hidden="true">
        <GraphIcon />
      </div>
      <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 w-20 opacity-90" aria-hidden="true">
        <CodeSnippetIcon />
      </div>
      <div className="absolute right-4 bottom-8 w-14 opacity-70 animate-pulse" aria-hidden="true">
        <XpBadgeIcon />
      </div>
      <div className="absolute top-6 right-1/2 w-16 transform translate-x-20 opacity-75" aria-hidden="true">
        <ServerStackIcon />
      </div>
    </section>
  );
};
