import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Quizzes</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <FileQuestion className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-semibold">Test Your Knowledge</h2>
        <p className="text-muted-foreground mt-2 mb-6">Quizzes are a great way to solidify what you've learned.</p>
        <Button asChild size="lg">
          <Link href="/quiz/1">Start a Sample Quiz</Link>
        </Button>
      </main>
    </div>
  );
}
