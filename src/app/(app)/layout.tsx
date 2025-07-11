import { BottomNav } from '@/components/BottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">{children}</div>
      <BottomNav />
    </div>
  );
}
