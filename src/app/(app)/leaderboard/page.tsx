import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <Trophy className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold">Coming Soon!</h2>
        <p className="text-muted-foreground mt-2">See how you rank against other learners.</p>
      </main>
    </div>
  );
}
