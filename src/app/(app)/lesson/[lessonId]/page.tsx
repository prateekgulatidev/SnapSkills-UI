'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const lessonContent = [
  {
    type: 'concept',
    title: 'Welcome to Python!',
    text: "Python is a versatile and beginner-friendly programming language. Let's start with the basics.",
    image: { src: 'https://placehold.co/400x300.png', hint: 'python logo' },
  },
  {
    type: 'concept',
    title: 'Variables',
    text: "In Python, you can store data in variables. Think of them as containers for information.",
    code: "message = \"Hello, SnapSkills!\"\nprint(message)",
  },
  {
    type: 'concept',
    title: 'Data Types',
    text: 'Python has several built-in data types, such as integers (numbers), strings (text), and booleans (True/False).',
  },
  {
    type: 'quiz',
    question: "What keyword is used to print output to the console in Python?",
    options: ["log", "echo", "print", "display"],
    answer: "print",
  },
  {
    type: 'summary',
    title: 'Great Job!',
    text: "You've completed the first lesson on Python basics. Keep up the amazing work!",
    image: { src: 'https://placehold.co/400x300.png', hint: 'celebration confetti' },
  }
];

export default function LessonPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [isQuizAnswered, setIsQuizAnswered] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!api) return;
    setTotal(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const progress = total > 0 ? (current / total) * 100 : 0;

  const handleQuizSubmit = (option: string, answer: string) => {
    setSelectedAnswer(option);
    setIsQuizAnswered(true);
  };


  return (
    <div className="flex flex-col h-screen bg-muted dark:bg-black">
      <header className="p-2 space-y-2 border-b bg-background">
        <div className="flex items-center justify-between px-2">
            <Link href="/course/3">
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
            <CarouselItem key={index} className="pt-1">
              <div className="p-4 h-full">
                <Card className="h-full flex flex-col justify-center items-center text-center p-6 shadow-none border-0 bg-background">
                  <CardContent className="w-full">
                    {item.image && <Image src={item.image.src} alt={item.title} width={400} height={300} className="rounded-lg mb-6 mx-auto max-w-xs" data-ai-hint={item.image.hint} />}
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    <p className="text-muted-foreground mb-4">{item.text}</p>
                    {item.type === 'concept' && item.code && (
                      <pre className="bg-muted text-left p-4 rounded-md overflow-x-auto text-sm">
                        <code>{item.code}</code>
                      </pre>
                    )}
                    {item.type === 'quiz' && (
                       <div className="space-y-3 text-left">
                        {item.options.map((option) => (
                          <Button 
                            key={option} 
                            variant="outline" 
                            className={`w-full h-auto py-3 justify-start text-base ${isQuizAnswered && option === selectedAnswer ? (option === item.answer ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : ''}`}
                            onClick={() => handleQuizSubmit(option, item.answer)}
                            disabled={isQuizAnswered}
                          >
                           {option}
                           {isQuizAnswered && option === selectedAnswer && (
                            option === item.answer ? <Check className="ml-auto text-green-500" /> : <X className="ml-auto text-red-500"/>
                           )}
                          </Button>
                        ))}
                       </div>
                    )}
                    {isQuizAnswered && item.type === 'quiz' && (
                        <div className={`mt-4 p-3 rounded-md text-sm text-left ${selectedAnswer === item.answer ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                           {selectedAnswer === item.answer ? 'Correct! `print` is used for output.' : `Not quite. The correct answer is \`${item.answer}\`.`}
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
