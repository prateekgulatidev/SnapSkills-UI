'use client';

import * as React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, List, Star, Lock, BookOpen, Gift, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";


const courses = [
  {
    id: '3',
    title: 'Unit 1: Python for Data Science',
    description: 'Python for Data Science',
    progress: 25,
    lessons: [
      { id: '1', title: 'Introduction to Python', type: 'lesson', completed: true },
      { id: '2', title: 'Variables and Data Types', type: 'lesson', completed: true },
      { id: '3', title: 'Start', type: 'start', completed: false },
      { id: '4', title: 'Lists and Loops', type: 'lesson', completed: false },
      { id: '5', title: 'Treasure', type: 'chest', completed: false },
      { id: '6', title: 'Introduction to Pandas', type: 'guide', completed: false },
      { id: '7', title: 'Practice', type: 'practice', completed: false },
      { id: '8', title: 'Final Project', type: 'lesson', completed: false },
    ]
  },
  {
    id: '4',
    title: 'Unit 2: Web Development Basics',
    description: 'HTML, CSS & JavaScript',
    progress: 0,
    lessons: [
       { id: '10', title: 'Start', type: 'start', completed: false },
       { id: '11', title: 'HTML Basics', type: 'lesson', completed: false },
       { id: '12', title: 'CSS Fundamentals', type: 'lesson', completed: false },
    ]
  }
]

const getNodeIcon = (type: string, completed: boolean) => {
    const isUnlocked = type === 'start' || completed;
    const commonClasses = "w-10 h-10";

    if (!isUnlocked && type !== 'start') {
        return <Lock className={`${commonClasses} text-muted-foreground/30`} />;
    }

    switch (type) {
        case 'start':
            return <Star className={`${commonClasses} text-white fill-white`} />;
        case 'lesson':
            return <Star className={`${commonClasses} text-white fill-white`} />;
        case 'chest':
            return <Gift className={`${commonClasses} text-white`} />;
        case 'guide':
            return <BookOpen className={`${commonClasses} text-white`} />;
        case 'practice':
            return <Dumbbell className={`${commonClasses} text-white`} />;
        default:
            return <Lock className={`${commonClasses} text-muted-foreground/30`} />;
    }
}

const getNodeClasses = (type: string, completed: boolean, index: number) => {
    const isUnlocked = type === 'start' || completed;
    let positionClass = '';

    if (index > 2) {
      const pattern = (index-3) % 4;
      if (pattern === 0) positionClass = 'justify-start ml-16';
      if (pattern === 1) positionClass = 'justify-end mr-16';
      if (pattern === 2) positionClass = 'justify-end mr-16';
      if (pattern === 3) positionClass = 'justify-start ml-16';
    }

    const baseClasses = `relative flex items-center w-full my-4 ${positionClass || 'justify-center'}`;

    let colorClass = 'bg-muted';
    if (type === 'start') colorClass = 'bg-primary shadow-lg shadow-primary/50';
    if (completed) colorClass = 'bg-primary';

    return {
        wrapper: baseClasses,
        node: `flex items-center justify-center w-24 h-24 rounded-full border-8 border-background ${colorClass} transition-all duration-300`,
        label: `absolute -bottom-10 text-center font-bold text-sm ${isUnlocked ? 'text-foreground' : 'text-muted-foreground/50'}`
    }
}


export default function LearnPage() {
  const [selectedCourse, setSelectedCourse] = React.useState(courses[0]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 space-y-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-accent/30 p-2 rounded-full">
                <Flame className="w-6 h-6 text-accent" />
                </div>
                <div>
                <p className="font-bold text-accent">5</p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>120 XP</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="primary" className="w-full justify-between h-14 bg-primary text-primary-foreground hover:bg-primary/90">
                    <div>
                        <p className="text-sm font-normal text-left opacity-80">Section 1, Unit 1</p>
                        <p className="text-lg font-bold text-left">{selectedCourse.description}</p>
                    </div>
                    <ChevronDown className="h-6 w-6"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] md:w-[calc(512px-2rem)]">
                {courses.map(course => (
                    <DropdownMenuItem key={course.id} onSelect={() => setSelectedCourse(course)}>
                        {course.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-8">
        <div className="relative flex flex-col items-center">
            {/* Dotted line */}
            <div className="absolute top-12 bottom-12 w-2 bg-repeat-y bg-[length:8px_24px] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%2224%22%20viewBox%3D%220%200%208%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%224%22%20cy%3D%224%22%20r%3D%224%22%20fill%3D%22%23E5E5E5%22%2F%3E%3C%2Fsvg%3E%0A')]"></div>
            
            {selectedCourse.lessons.map((lesson, index) => {
                const isStartNode = lesson.type === 'start';
                const isUnlocked = isStartNode || lesson.completed;
                const { wrapper, node, label } = getNodeClasses(lesson.type, lesson.completed, index);

                const content = (
                     <div className={wrapper}>
                        <div className={node}>
                            {getNodeIcon(lesson.type, lesson.completed)}
                        </div>
                        <span className={label}>{lesson.title}</span>
                    </div>
                )

                if (isUnlocked) {
                   return (
                     <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="w-full">
                        {content}
                     </Link>
                   )
                }

                return <div key={lesson.id} className="w-full">{content}</div>
            })}
        </div>
      </main>
    </div>
  );
}
