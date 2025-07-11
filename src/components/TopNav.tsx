'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenCheck, Flame, Zap, Menu, BookOpen, Compass, Trophy, FileQuestion, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';

const navItems = [
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/leaderboard', icon: Trophy, label: 'Rank' },
  { href: '/quiz', icon: FileQuestion, label: 'Quiz' },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 border-b bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center gap-2">
            <BookOpenCheck className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-primary">SnapSkills</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors text-muted-foreground hover:text-primary',
                  isActive && 'text-primary'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm font-semibold text-orange-500">
                    <Flame className="w-5 h-5" />
                    <span>5</span>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                <Zap className="w-5 h-5 fill-yellow-400" />
                <span>120 XP</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

        </div>
      </div>
    </nav>
  );
}
