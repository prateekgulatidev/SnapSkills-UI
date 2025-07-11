import { redirect } from 'next/navigation';

// This page now redirects to a sample quiz.
// The main quiz hub has been moved to /quizzes to avoid routing conflicts.
export default function QuizRedirectPage() {
  redirect('/quiz/1');
}
