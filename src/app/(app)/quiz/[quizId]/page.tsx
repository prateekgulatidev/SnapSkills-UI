'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X, Check, Award } from 'lucide-react';
import Link from 'next/link';

const quizData = {
  title: 'JavaScript Fundamentals Quiz',
  questions: [
    {
      question: 'Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      answer: 'All of the above',
    },
    {
      question: 'What does "DOM" stand for?',
      options: ['Document Object Model', 'Data Object Model', 'Document Oriented Middleware', 'Digital Ordinance Map'],
      answer: 'Document Object Model',
    },
    {
      question: 'Which method is used to add an element to the end of an array?',
      options: ['shift()', 'unshift()', 'push()', 'pop()'],
      answer: 'push()',
    },
  ],
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizData.questions.length) * 100;

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="p-4 flex flex-col items-center justify-center text-center h-full">
        <Award className="w-20 h-20 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold">Quiz Complete!</h1>
        <p className="text-muted-foreground mt-2">You scored</p>
        <p className="text-4xl font-bold my-4">{score} / {quizData.questions.length}</p>
        <Button asChild>
          <Link href="/learn">Back to Learn</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-lg font-bold text-center truncate">{quizData.title}</h1>
        <Progress value={progress} className="mt-2 h-2" />
      </header>
      <main className="flex-grow p-4">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardDescription>Question {currentQuestionIndex + 1} of {quizData.questions.length}</CardDescription>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption || ''}
              onValueChange={setSelectedOption}
              disabled={isAnswered}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = option === selectedOption;
                return (
                  <Label
                    key={option}
                    htmlFor={option}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                      isAnswered
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : isSelected
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-border'
                        : 'cursor-pointer hover:border-primary'
                    }`}
                  >
                    <RadioGroupItem value={option} id={option} className="mr-4" />
                    <span>{option}</span>
                    {isAnswered &&
                      (isCorrect ? (
                        <Check className="ml-auto h-5 w-5 text-green-500" />
                      ) : isSelected ? (
                        <X className="ml-auto h-5 w-5 text-red-500" />
                      ) : null)}
                  </Label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      </main>
      <footer className="p-4 border-t">
        {isAnswered ? (
          <Button onClick={handleNextQuestion} className="w-full h-12 text-base">
            {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        ) : (
          <Button onClick={handleCheckAnswer} disabled={!selectedOption} className="w-full h-12 text-base">
            Check Answer
          </Button>
        )}
      </footer>
    </div>
  );
}
