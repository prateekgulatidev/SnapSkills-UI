
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";
import { WhatYoullLearn } from "@/components/WhatYoullLearn";
import { StartJourney } from "@/components/StartJourney";

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b">
        <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold">SnapSkills</span>
        </Link>
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <WhatYoullLearn />
        <StartJourney />
      </main>

      <footer className="w-full flex items-center justify-center p-6 text-center text-sm text-muted-foreground bg-muted/50 dark:bg-muted/10">
        © {new Date().getFullYear()} SnapSkills. All rights reserved.
      </footer>
    </div>
  );
}
