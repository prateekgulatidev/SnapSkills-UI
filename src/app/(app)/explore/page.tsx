import { Compass } from 'lucide-react';

export default function ExplorePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Explore</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <Compass className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold">Coming Soon!</h2>
        <p className="text-muted-foreground mt-2">New courses and topics are on the way.</p>
      </main>
    </div>
  );
}
