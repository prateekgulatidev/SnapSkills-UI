import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Hero />
      <main>
        <div className="flex flex-col items-center justify-center p-6 text-center">
            <Image
            src="https://placehold.co/400x300.png"
            alt="Illustration of a person learning on a device"
            width={400}
            height={300}
            className="w-full max-w-xs rounded-lg mb-8 shadow-md"
            data-ai-hint="education learning"
            />
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Learn on the Go</h2>
            <p className="mt-2 text-muted-foreground">
            Master new skills in minutes, not months. Interactive, bite-sized lessons at your fingertips.
            </p>
            <Button asChild className="w-full max-w-xs mt-8 h-12 text-base font-semibold">
                <Link href="/learn">Get Started</Link>
            </Button>
        </div>
        <HowItWorks />
      </main>
      <footer className="p-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapSkills. All rights reserved.
      </footer>
    </div>
  );
}
