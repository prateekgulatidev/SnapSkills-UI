'use client';

import * as React from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { courses, Lesson, Course, LessonContent } from '@/lib/courses';

const LessonContentComponent = ({
  content,
  onQuizSubmit,
  isQuizAnswered,
  selectedAnswer,
}: {
  content: LessonContent;
  onQuizSubmit: (correct: boolean) => void;
  isQuizAnswered: boolean;
  selectedAnswer: number | null;
}) => {
  switch (content.type) {
    case 'text':
      return <p className="text-lg text-muted-foreground">{content.content}</p>;
    case 'code':
      return (
        <div className="w-full text-left">
            <p className="text-lg text-muted-foreground mb-4">{content.text}</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{content.code}</code>
            </pre>
        </div>
      );
    case 'quiz':
      return (
        <div className="space-y-3 text-left w-full">
          <p className="font-semibold text-xl mb-4">{content.question}</p>
          {content.options.map((option, optionIndex) => (
            <Button
              key={option}
              variant="outline"
              className={`w-full h-auto py-3 justify-start text-base ${isQuizAnswered && selectedAnswer === optionIndex ? (optionIndex === content.answerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}`}
              onClick={() => onQuizSubmit(optionIndex === content.answerIndex)}
              disabled={isQuizAnswered}
            >
              {option}
              {isQuizAnswered && selectedAnswer === optionIndex && (
                optionIndex === content.answerIndex ? <Check className="ml-auto text-green-500" /> : <X className="ml-auto text-red-500" />
              )}
            </Button>
          ))}
          {isQuizAnswered && (
            <div className={`mt-4 p-3 rounded-md text-sm text-left ${selectedAnswer === content.answerIndex ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
              {selectedAnswer === content.answerIndex ? 'Correct!' : `Not quite. Correct answer: ${content.options[content.answerIndex]}`}
              <p className="mt-1">{content.explanation}</p>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;
  const courseId = searchParams.get('courseId');

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const [quizState, setQuizState] = React.useState<Record<number, { answered: boolean; selected: number | null; correct: boolean | null }>>({});

  const { course, lesson } = React.useMemo(() => {
    const course = courses.find((c) => c.courseId === courseId);
    if (!course) return { course: undefined, lesson: undefined };
    const lesson = course.sections.flatMap((s) => s.lessons).find((l) => l.lessonId === lessonId);
    return { course, lesson };
  }, [courseId, lessonId]);

  React.useEffect(() => {
    if (!api || !lesson) return;
    setTotal(lesson.content.length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api, lesson]);

  if (!course || !lesson) {
    return notFound();
  }

  const handleQuizSubmit = (slideIndex: number, selectedOptionIndex: number, correct: boolean) => {
    setQuizState((prev) => ({
      ...prev,
      [slideIndex]: { answered: true, selected: selectedOptionIndex, correct },
    }));
  };
  
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex flex-col h-screen bg-muted dark:bg-black">
      <header className="p-2 space-y-2 border-b bg-background">
        <div className="flex items-center justify-between px-2">
          <Link href={`/learn`}>
            <Button variant="ghost" size="icon">
              <X className="h-6 w-6" />
            </Button>
          </Link>
          <span className="text-sm font-medium">{course.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <Carousel setApi={setApi} orientation="vertical" className="w-full flex-grow">
        <CarouselContent className="-mt-1 h-full">
          {lesson.content.map((contentItem, index) => {
             const quizInfo = quizState[index] || { answered: false, selected: null };
            
             const handleLocalQuizSubmit = (selectedIdx: number, isCorrect: boolean) => {
                 if (contentItem.type === 'quiz') {
                     setQuizState(prev => ({ ...prev, [index]: { answered: true, selected: selectedIdx, correct: isCorrect } }));
                 }
             };

            return (
              <CarouselItem key={index} className="pt-1">
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
                          {contentItem.options.map((option, optionIndex) => (
                            <Button
                              key={option}
                              variant="outline"
                              className={`w-full h-auto py-3 justify-start text-base ${quizInfo.answered && quizInfo.selected === optionIndex ? (optionIndex === contentItem.answerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}`}
                              onClick={() => handleLocalQuizSubmit(optionIndex, optionIndex === contentItem.answerIndex)}
                              disabled={quizInfo.answered}
                            >
                              {option}
                              {quizInfo.answered && quizInfo.selected === optionIndex && (
                                optionIndex === contentItem.answerIndex ? <Check className="ml-auto text-green-500" /> : <X className="ml-auto text-red-500" />
                              )}
                            </Button>
                          ))}
                        </div>
                      )}

                      {quizInfo.answered && contentItem.type === 'quiz' && (
                        <div className={`w-full max-w-md mt-4 p-3 rounded-md text-sm text-left ${quizInfo.selected === contentItem.answerIndex ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                          <p className='font-bold'>{quizInfo.selected === contentItem.answerIndex ? 'Correct!' : 'Not quite.'}</p>
                          {contentItem.explanation}
                        </div>
                      )}

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-center">
            <CarouselPrevious />
            <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}