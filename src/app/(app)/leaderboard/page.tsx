
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center p-8">
      <Trophy className="w-16 h-16 text-muted-foreground/50 mb-4" />
      <h2 className="text-xl font-semibold">Coming Soon!</h2>
      <p className="text-muted-foreground mt-2">See how you rank against other learners.</p>
    </div>
  );
}
