
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import {
  BookOpen,
  Compass,
  Trophy,
  FileQuestion,
  User,
  BookOpenCheck,
  MoreHorizontal,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
          {open && <span>{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { open } = useSidebar();
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-muted/40 w-full">
            <div className="hidden md:block">
                <Sidebar>
                    <SidebarHeader>
                        <Link href="/" className="flex items-center gap-2">
                            <BookOpenCheck className="w-7 h-7 text-primary" />
                            {open && <span className="text-xl font-bold">SnapSkills</span>}
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarItem key={item.href} {...item} />
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                         <SidebarMenu>
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={{children: 'Profile'}}>
                                    <Link href="/profile">
                                        <User />
                                        {open && <span>Profile</span>}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={{children: 'More'}}>
                                    <Link href="#">
                                        <MoreHorizontal />
                                        {open && <span>More</span>}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 min-w-0">{children}</main>
            </div>
            <div className="md:hidden">
              <BottomNav />
            </div>
        </div>
    );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
