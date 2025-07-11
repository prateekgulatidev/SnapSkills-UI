'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Compass, Trophy, FileQuestion, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/leaderboard', icon: Trophy, label: 'Rank' },
  { href: '/quizzes', icon: FileQuestion, label: 'Quiz' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
