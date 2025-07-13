
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenCheck, Twitter, Github, Linkedin } from "lucide-react";
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

      <footer className="w-full bg-muted/50 dark:bg-muted/10 border-t">
        <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpenCheck className="w-7 h-7 text-primary" />
              <span className="text-xl font-bold">SnapSkills</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Learn tech skills with bite-sized, gamified lessons.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Community</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Tutorials</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 border-t flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground order-2 sm:order-1 mt-4 sm:mt-0">
            © {new Date().getFullYear()} SnapSkills. All rights reserved.
          </p>
          <div className="flex space-x-4 order-1 sm:order-2">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
