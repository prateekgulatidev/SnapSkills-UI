import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="hidden md:block">
        <TopNav />
      </div>
      <div className="flex-grow overflow-y-auto">{children}</div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
