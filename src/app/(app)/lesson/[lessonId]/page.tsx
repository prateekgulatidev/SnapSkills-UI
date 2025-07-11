
'use client';

import * as React from 'react';
import { notFound, useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { getLesson, Lesson, LessonContent } from '@/lib/courses';
import { Skeleton } from '@/components/ui/skeleton';

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const courseId = searchParams.get('courseId');

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [lesson, setLesson] = React.useState<Lesson | null | undefined>(undefined);
  const [courseTitle, setCourseTitle] = React.useState<string>('');

  const [quizState, setQuizState] = React.useState<Record<number, { answered: boolean; selected: number | null; correct: boolean | null }>>({});
  
  React.useEffect(() => {
    async function loadLesson() {
      if (courseId && lessonId) {
        const result = await getLesson(courseId, lessonId);
        if (result) {
          setLesson(result.lesson);
          setCourseTitle(result.course.title);
        } else {
          setLesson(null);
        }
      }
    }
    loadLesson();
  }, [courseId, lessonId]);

  React.useEffect(() => {
    if (!api || !lesson?.content) return;
    setTotal(lesson.content.length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api, lesson]);
  
  const completeLesson = () => {
    const storedProgress = localStorage.getItem('completedLessons');
    const completedLessons = storedProgress ? JSON.parse(storedProgress) : [];
    if (!completedLessons.includes(lessonId)) {
        const newProgress = [...completedLessons, lessonId];
        localStorage.setItem('completedLessons', JSON.stringify(newProgress));
    }
    router.push('/learn');
  }

  const handleNext = () => {
    if (current === total) {
      completeLesson();
    } else {
      api?.scrollNext();
    }
  };

  if (lesson === undefined) {
    return (
       <div className="flex flex-col h-screen bg-muted dark:bg-black">
         <header className="p-2 space-y-2 border-b bg-background sticky top-0 z-10">
            <div className="flex items-center justify-between px-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Progress value={0} className="h-2" />
          </header>
          <main className="flex-grow p-4">
            <Card className="h-full flex flex-col justify-center items-center text-center p-6 shadow-none border-0 bg-background">
              <Skeleton className="h-8 w-48 mb-8" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          </main>
          <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
            <Skeleton className="w-full h-12" />
          </footer>
       </div>
    )
  }

  if (lesson === null) {
    return notFound();
  }
  
  const progress = total > 0 ? (current / total) * 100 : 0;
  const isLastSlide = current === total;

  return (
    <div className="flex flex-col h-screen bg-muted dark:bg-black">
      <header className="p-2 space-y-2 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between px-2">
          <Link href={`/learn`}>
            <Button variant="ghost" size="icon">
              <X className="h-6 w-6" />
            </Button>
          </Link>
          <span className="text-sm font-medium">{courseTitle}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <Carousel setApi={setApi} orientation="vertical" className="w-full flex-grow">
        <CarouselContent className="-mt-1 h-full">
          {lesson.content && lesson.content.map((contentItem, index) => {
             const quizInfo = quizState[index] || { answered: false, selected: null };
            
             const handleLocalQuizSubmit = (selectedIdx: number) => {
                 if (contentItem.type === 'quiz') {
                     const isCorrect = selectedIdx === contentItem.answerIndex;
                     setQuizState(prev => ({ ...prev, [index]: { answered: true, selected: selectedIdx, correct: isCorrect } }));
                 }
             };

            return (
              <CarouselItem key={index} className="pt-1 basis-full">
                <div className="p-4 h-full">
                  <Card className="h-full flex flex-col justify-center items-center text-center p-6 shadow-none border-0 bg-background">
                    <CardContent className="w-full flex flex-col items-center">
                      <h2 className="text-3xl font-bold mb-8">{lesson.title}</h2>
                      
                      {contentItem.type === 'text' && <p className="text-lg text-muted-foreground">{contentItem.content}</p>}
                      
                      {contentItem.type === 'code' && contentItem.code && (
                        <div className='text-left w-full'>
                           {contentItem.text && <p className="text-muted-foreground mb-4">{contentItem.text}</p>}
                           <pre className="bg-muted text-left p-4 rounded-md overflow-x-auto text-sm">
                             <code>{contentItem.code}</code>
                           </pre>
                        </div>
                      )}

                      {contentItem.type === 'quiz' && (
                        <div className="space-y-3 text-left w-full max-w-md">
                          <p className="font-semibold mb-4 text-xl">{contentItem.question}</p>
                          {contentItem.options.map((option, optionIndex) => {
                            const isCorrect = optionIndex === contentItem.answerIndex;
                            const isSelected = quizInfo.selected === optionIndex;

                            return (
                                <Button
                                  key={option}
                                  variant="outline"
                                  className={`w-full h-auto py-3 justify-start text-base ${quizInfo.answered && isSelected ? (isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}`}
                                  onClick={() => handleLocalQuizSubmit(optionIndex)}
                                  disabled={quizInfo.answered}
                                >
                                  {option}
                                  {quizInfo.answered && isSelected && (
                                    isCorrect ? <Check className="ml-auto text-green-500" /> : <X className="ml-auto text-red-500" />
                                  )}
                                </Button>
                            )
                           })}
                        </div>
                      )}

                      {quizInfo.answered && contentItem.type === 'quiz' && contentItem.explanation && (
                        <div className={`w-full max-w-md mt-4 p-3 rounded-md text-sm text-left ${quizInfo.correct ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                          <p className='font-bold'>{quizInfo.correct ? 'Correct!' : 'Not quite.'}</p>
                          <p>{contentItem.explanation}</p>
                        </div>
                      )}

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      
      <footer className="p-4 border-t bg-background sticky bottom-0 z-10">
        <Button onClick={handleNext} className="w-full h-12 text-base">
          {isLastSlide ? 'Complete Lesson' : 'Continue'}
        </Button>
      </footer>
    </div>
  );
}
