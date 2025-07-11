import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'SnapSkills',
  description: 'Learn on the Go',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <div className="bg-gray-100 dark:bg-black">
          <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col border-x border-gray-200 bg-background shadow-2xl dark:border-gray-800">
              {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
