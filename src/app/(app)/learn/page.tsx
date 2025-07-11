
'use client';

import * as React from 'react';
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Star, Lock, BookOpen, Gift, Dumbbell, Code, Braces, Terminal, Binary, FunctionSquare, Variable, Repeat, GitCommit, GitBranch, Puzzle, Trophy, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCourses, Course, Lesson } from '@/lib/courses';
import { ThreeDButton } from '@/components/ui/ThreeDButton';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Code,
  Braces,
  Terminal,
  Binary,
  FunctionSquare,
  Variable,
  Repeat,
  GitCommit,
  GitBranch,
  Puzzle,
  Trophy,
  Star,
  Gift,
  Dumbbell
};


const getNodeIcon = (lesson: Lesson, unlocked: boolean) => {
    const commonClasses = "w-10 h-10 text-white";

    if (!unlocked) {
        return <Lock className="w-10 h-10 text-muted-foreground/60" />;
    }

    if (lesson.icon) {
        const IconComponent = iconMap[lesson.icon];
        if (IconComponent) {
            return <IconComponent className={commonClasses} />;
        }
    }
    
    // Fallback icon
    return <BookOpen className={commonClasses} />;
}

const getNodeClasses = (index: number) => {
    let positionClass = '';

    if (index === 0) { // First item should be centered
        positionClass = 'justify-center';
    } else {
        positionClass = (index) % 2 === 1 ? 'justify-start pl-8' : 'justify-end pr-8';
    }
    
    return `relative flex items-center w-full my-4 ${positionClass}`;
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

  const allLessonsInCourse = selectedCourse.sections.flatMap(s => s.lessons);
  const getLessonIndex = (lessonId: string) => allLessonsInCourse.findIndex(l => l.lessonId === lessonId);

  const renderNode = (lesson: Lesson, sectionIndex: number, lessonIndexInSection: number) => {
    const overallLessonIndex = getLessonIndex(lesson.lessonId);
    
    const isCompleted = completedLessons.includes(lesson.lessonId);
    const isFirstLessonOfCourse = overallLessonIndex === 0;
    
    let isPreviousCompleted = false;
    if (isFirstLessonOfCourse) {
        isPreviousCompleted = true; // The very first lesson is always unlocked
    } else {
        const previousLesson = allLessonsInCourse[overallLessonIndex - 1];
        if (previousLesson) {
            isPreviousCompleted = completedLessons.includes(previousLesson.lessonId);
        }
    }
    
    const isUnlocked = isCompleted || isPreviousCompleted;

    let variant: 'primary' | 'accent' | 'muted' = 'primary';
    if (!isUnlocked) {
      variant = 'muted';
    } else if (lesson.type === 'quiz' || lesson.type === 'chest' || lesson.type === 'start') {
      variant = 'accent';
    }

    const wrapperClasses = getNodeClasses(overallLessonIndex);
    const labelClasses = `absolute -bottom-10 text-center font-bold text-sm ${isUnlocked ? 'text-foreground' : 'text-muted-foreground/50'}`;

    const buttonContent = (
      <div className={wrapperClasses}>
        <motion.div
          initial={{ scale: isUnlocked ? 1 : 0.8, opacity: isUnlocked ? 1 : 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: isUnlocked ? 0.1 : 0 }}
        >
          <ThreeDButton 
            variant={variant}
            state={isUnlocked ? 'active' : 'inactive'}
            className="w-24 h-24 rounded-full"
            disabled={!isUnlocked}
          >
            {getNodeIcon(lesson, isUnlocked)}
          </ThreeDButton>
        </motion.div>
        <span className={labelClasses}>{lesson.title}</span>
      </div>
    );

    if (isUnlocked) {
      return (
        <Link key={lesson.lessonId} href={`/lesson/${lesson.lessonId}?courseId=${selectedCourse.courseId}`} className="w-full">
           {buttonContent}
        </Link>
      )
    }

    return (
      <div key={lesson.lessonId} className="w-full opacity-50 cursor-not-allowed">
        {buttonContent}
      </div>
    )
  }

  const renderSectionHeader = (title: string) => (
    <div className="flex items-center w-full my-12" key={title}>
      <div className="flex-grow border-t-2 border-dashed border-border"></div>
      <h2 className="mx-4 text-lg font-bold text-muted-foreground uppercase tracking-wider">{title}</h2>
      <div className="flex-grow border-t-2 border-dashed border-border"></div>
    </div>
  );

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
            
            {selectedCourse.sections.map((section, sectionIndex) => (
                <React.Fragment key={section.sectionId}>
                    {renderSectionHeader(section.title)}
                    {section.lessons.map((lesson, lessonIndex) => (
                        renderNode(lesson, sectionIndex, lessonIndex)
                    ))}
                </React.Fragment>
            ))}
        </div>
      </main>
    </div>
  );
}
