
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Compass,
  Trophy,
  FileQuestion,
  User,
  BookOpenCheck,
  Flame,
  Zap,
  LayoutGrid,
  Store,
  BarChart,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/leaderboard', icon: Trophy, label: 'Rank' },
  { href: '/quizzes', icon: FileQuestion, label: 'Quizzes' },
];

const SidebarItem = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => {
  const pathname = usePathname();
  const { open } = useSidebar();
  const isActive = pathname.startsWith(href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={{ children: label }}
      >
        <Link href={href}>
          <Icon />
          {open ? <span>{label}</span> : <span className="sr-only">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
              <Link href="/" className="flex items-center gap-2">
                <BookOpenCheck className="w-7 h-7 text-primary" />
                <span className="text-xl font-bold">SnapSkills</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarItem key={item.href} {...item} />
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{children: 'Profile'}}>
                    <Link href="/profile">
                        <User />
                        <span>Profile</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{children: 'Settings'}}>
                        <Link href="#">
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-grow overflow-y-auto">
            {children}
          </div>
          <div className="md:hidden">
            <BottomNav />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
