'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { courses, Lesson, Course } from '@/lib/courses';
import { notFound } from 'next/navigation';


export default function LessonPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [isQuizAnswered, setIsQuizAnswered] = React.useState<Record<string, boolean>>({});
  const [selectedAnswer, setSelectedAnswer] = React.useState<Record<string, number | null>>({});

  const course: Course | undefined = React.useMemo(() => courses.find(c => c.courseId === courseId), [courseId]);
  const lessonContent = React.useMemo(() => course?.sections.flatMap(s => s.lessons) || [], [course]);

  React.useEffect(() => {
    if (!api) return;
    setTotal(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!course) {
    // We can't use `notFound()` in a client component directly like this after hooks.
    // A better approach would be to have a loading/error state.
    if (typeof window !== 'undefined') {
        return (
            <div className="flex flex-col h-screen bg-muted dark:bg-black justify-center items-center">
                <p>Course not found.</p>
                <Link href="/learn">
                    <Button variant="link">Go back to learning</Button>
                </Link>
            </div>
        )
    }
    return null;
  }
  
  const progress = total > 0 ? (current / total) * 100 : 0;

  const handleQuizSubmit = (lessonId: string, selectedOptionIndex: number, correctOptionIndex: number) => {
    setSelectedAnswer(prev => ({...prev, [lessonId]: selectedOptionIndex}));
    setIsQuizAnswered(prev => ({...prev, [lessonId]: true}));
  };

  const getCorrectAnswer = (lesson: Lesson) => {
    if(lesson.type === 'quiz') {
        return lesson.options[lesson.answerIndex];
    }
    return '';
  }

  return (
    <div className="flex flex-col h-screen bg-muted dark:bg-black">
      <header className="p-2 space-y-2 border-b bg-background">
        <div className="flex items-center justify-between px-2">
            <Link href={`/learn`}>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                </Button>
            </Link>
            <span className="text-sm font-medium">{current}/{total}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <Carousel setApi={setApi} orientation="vertical" className="w-full flex-grow">
        <CarouselContent className="-mt-1 h-full">
          {lessonContent.map((item, index) => (
            <CarouselItem key={item.lessonId} className="pt-1">
              <div className="p-4 h-full">
                <Card className="h-full flex flex-col justify-center items-center text-center p-6 shadow-none border-0 bg-background">
                  <CardContent className="w-full">
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    {item.type === 'text' && <p className="text-muted-foreground mb-4">{item.content}</p>}
                    
                    {item.type === 'code' && item.code && (
                      <pre className="bg-muted text-left p-4 rounded-md overflow-x-auto text-sm">
                        <code>{item.code}</code>
                      </pre>
                    )}
                    
                    {item.type === 'quiz' && (
                       <div className="space-y-3 text-left">
                        <p className="font-semibold mb-4">{item.question}</p>
                        {item.options.map((option, optionIndex) => (
                          <Button 
                            key={option} 
                            variant="outline" 
                            className={`w-full h-auto py-3 justify-start text-base ${isQuizAnswered[item.lessonId] && selectedAnswer[item.lessonId] === optionIndex ? (optionIndex === item.answerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}`}
                            onClick={() => handleQuizSubmit(item.lessonId, optionIndex, item.answerIndex)}
                            disabled={isQuizAnswered[item.lessonId]}
                          >
                           {option}
                           {isQuizAnswered[item.lessonId] && selectedAnswer[item.lessonId] === optionIndex && (
                            optionIndex === item.answerIndex ? <Check className="ml-auto text-green-500" /> : <X className="ml-auto text-red-500"/>
                           )}
                          </Button>
                        ))}
                       </div>
                    )}
                    {isQuizAnswered[item.lessonId] && item.type === 'quiz' && (
                        <div className={`mt-4 p-3 rounded-md text-sm text-left ${selectedAnswer[item.lessonId] === item.answerIndex ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                           {selectedAnswer[item.lessonId] === item.answerIndex ? 'Correct!' : `Not quite. The correct answer is \`${getCorrectAnswer(item)}\`.`}
                        </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-center">
            <CarouselPrevious />
            <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
