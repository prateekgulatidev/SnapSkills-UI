
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  BookOpen,
  Home,
  Package2,
  Settings,
  Users,
  BarChart,
  Shield,
  Menu,
  LogOut,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const adminNavItems = [
    { href: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/analytics', icon: BarChart, label: 'Analytics' },
    { href: '/admin/content-tools', icon: Upload, label: 'Content Tools' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

function AdminNavLink({ href, icon: Icon, label, onClick }: { href: string, icon: React.ElementType, label: string, onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(href);
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary"
            )}
            >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}

function AdminNav({ onLinkClick }: { onLinkClick?: () => void }) {
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {adminNavItems.map(item => (
                <AdminNavLink key={item.href} {...item} onClick={onLinkClick} />
            ))}
        </nav>
    );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const pageTitle = adminNavItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard';

    if (pathname === '/admin') {
        return <>{children}</>;
    }

    const handleLinkClick = () => {
        setIsSheetOpen(false);
    }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span className="">SnapSkills Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <AdminNav />
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Check out the documentation for help with the admin panel.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span>SnapSkills Admin</span>
              </Link>
              <AdminNav onLinkClick={handleLinkClick} />
               <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>
                      Check out our docs for more info.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 text-center md:text-left">
            <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
}
