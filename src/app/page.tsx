import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="p-4 flex justify-start items-center">
        <BookOpenCheck className="h-8 w-8 text-primary" />
        <h1 className="ml-2 text-2xl font-bold text-primary">SnapSkills</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
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
      </main>
      <footer className="p-6 space-y-4">
        <Button asChild className="w-full h-12 text-base font-semibold">
          <Link href="/learn">Get Started</Link>
        </Button>
      </footer>
    </div>
  );
}
