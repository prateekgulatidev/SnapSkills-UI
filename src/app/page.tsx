import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="p-4 flex items-center justify-between">
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
      <Hero />
      <main>
        <HowItWorks />
      </main>
      <footer className="p-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapSkills. All rights reserved.
      </footer>
    </div>
  );
}
