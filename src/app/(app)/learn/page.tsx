'use client';

import * as React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Star, Lock, BookOpen, Gift, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { getCourses, Course, Lesson } from '@/lib/courses';

const getNodeIcon = (lesson: Lesson, completed: boolean) => {
    const isUnlocked = lesson.type === 'start' || completed;
    const commonClasses = "w-10 h-10";

    if (!isUnlocked) {
        return <Lock className={`${commonClasses} text-muted-foreground/30`} />;
    }

    if (lesson.icon) {
        return <span className="text-4xl">{lesson.icon}</span>;
    }

    switch (lesson.type) {
        case 'start':
            return <Star className={`${commonClasses} text-white fill-white`} />;
        case 'lesson':
        case 'text':
        case 'code':
        case 'quiz':
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

    if (index === 0) {
        positionClass = 'justify-center';
    } else {
        positionClass = (index) % 2 === 1 ? 'justify-start ml-16' : 'justify-end mr-16';
    }
    
    const baseClasses = `relative flex items-center w-full my-4 ${positionClass}`;
    
    let colorClass = 'bg-muted';
    if (type === 'start') colorClass = 'bg-primary shadow-lg shadow-primary/50';
    if (completed) colorClass = 'bg-primary';

    const animationClass = isUnlocked ? 'animate-in zoom-in-75' : '';

    return {
        wrapper: baseClasses,
        node: `flex items-center justify-center w-24 h-24 rounded-full border-8 border-background ${colorClass} transition-all duration-300 ${animationClass}`,
        label: `absolute -bottom-10 text-center font-bold text-sm ${isUnlocked ? 'text-foreground' : 'text-muted-foreground/50'}`
    }
}


export default function LearnPage() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    async function loadCourses() {
      const allCourses = await getCourses();
      setCourses(allCourses);
      if (allCourses.length > 0) {
        const lastCourseId = localStorage.getItem('selectedCourseId') || allCourses[0].courseId;
        const currentCourse = allCourses.find(c => c.courseId === lastCourseId) || allCourses[0];
        setSelectedCourse(currentCourse);
      }
    }
    loadCourses();

    const storedProgress = localStorage.getItem('completedLessons');
    if (storedProgress) {
        setCompletedLessons(JSON.parse(storedProgress));
    }
  }, []);

  React.useEffect(() => {
    if (selectedCourse) {
        localStorage.setItem('selectedCourseId', selectedCourse.courseId);
    }
  }, [selectedCourse]);

  const allLessons = selectedCourse?.sections.flatMap(s => s.lessons) ?? [];

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  }

  if (!selectedCourse) {
    return (
        <div className="flex items-center justify-center h-full">
            <p>Loading courses...</p>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 space-y-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-accent/30 p-2 rounded-full">
                <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                <p className="font-bold text-orange-500">5</p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span>120 XP</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-14 border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                    <div className="text-left">
                        <p className="text-lg font-bold">{selectedCourse.title}</p>
                    </div>
                    <ChevronDown className="h-6 w-6"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] md:w-[calc(512px-2rem)]">
                {courses.map(course => (
                    <DropdownMenuItem key={course.courseId} onSelect={() => handleCourseSelect(course)}>
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
            
            <div className="mb-8">
                <div className={getNodeClasses('start', true, 0).wrapper}>
                    <div className={getNodeClasses('start', true, 0).node}>
                        {getNodeIcon({ type: 'start', title: selectedCourse.sections[0].title, lessonId: 'start' }, true)}
                    </div>
                    <span className={getNodeClasses('start', true, 0).label}>{selectedCourse.sections[0].title}</span>
                </div>
            </div>

            {allLessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.lessonId);
                const isPreviousCompleted = index === 0 || completedLessons.includes(allLessons[index-1]?.lessonId);
                const isUnlocked = isCompleted || isPreviousCompleted;

                const { wrapper, node, label } = getNodeClasses(lesson.type, isCompleted, index + 1);

                const content = (
                     <div className={wrapper}>
                        <div className={node}>
                            {getNodeIcon(lesson, isUnlocked)}
                        </div>
                        <span className={label}>{lesson.title}</span>
                    </div>
                )

                if (isUnlocked) {
                   return (
                     <Link key={lesson.lessonId} href={`/lesson/${lesson.lessonId}?courseId=${selectedCourse.courseId}`} className="w-full">
                        {content}
                     </Link>
                   )
                }

                return <div key={lesson.lessonId} className="w-full opacity-50 cursor-not-allowed">{content}</div>
            })}
        </div>
      </main>
    </div>
  );
}
