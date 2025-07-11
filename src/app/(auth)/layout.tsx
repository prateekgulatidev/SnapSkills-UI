import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpenCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-primary">SnapSkills</span>
        </Link>
        <div className="w-10"></div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
