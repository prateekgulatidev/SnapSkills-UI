
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserStats } from '@/components/UserStats';
import { FileQuestion, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function QuizHubPage() {
  return (
    <div className="flex h-full">
      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b">
          <h1 className="text-2xl font-bold">Quizzes</h1>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <FileQuestion className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold">Test Your Knowledge</h2>
          <p className="text-muted-foreground mt-2 mb-6">Quizzes are a great way to solidify what you've learned.</p>
          <Button asChild size="lg">
            <Link href="/quiz/1">Start a Sample Quiz</Link>
          </Button>
        </div>
      </main>
      <aside className="hidden md:block w-[350px] p-6 space-y-6 border-l shrink-0">
        <UserStats charge={100} streak={5} xp={120} />
        <Card>
            <CardHeader>
                <Trophy className="w-8 h-8 text-yellow-500 mb-2"/>
                <CardTitle>Challenge Yourself</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm">
                    Regularly taking quizzes helps reinforce your learning and prepare you for real-world challenges.
                </p>
            </CardContent>
        </Card>
      </aside>
    </div>
  );
}
