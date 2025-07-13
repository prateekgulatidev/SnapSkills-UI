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
        <HowItWorks />
      </main>
      <footer className="p-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapSkills. All rights reserved.
      </footer>
    </div>
  );
}
