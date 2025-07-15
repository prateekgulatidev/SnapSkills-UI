
'use client';

import * as React from 'react';
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Star, Lock, BookOpen, Gift, Dumbbell, Code, Braces, Terminal, Binary, FunctionSquare, Variable, Repeat, GitCommit, GitBranch, Puzzle, Trophy, ChevronDown, Crown } from "lucide-react";
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
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
  Dumbbell,
  Play
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
  
  const completedCount = allLessonsInCourse.filter(l => completedLessons.includes(l.lessonId)).length;
  const totalLessons = allLessonsInCourse.length;
  const courseProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;


  const isLessonUnlocked = (lessonId: string) => {
    const overallLessonIndex = getLessonIndex(lessonId);
    if (overallLessonIndex === 0) return true;
    
    const isCompleted = completedLessons.includes(lessonId);
    const previousLesson = allLessonsInCourse[overallLessonIndex - 1];
    if (!previousLesson) return false;
    
    const isPreviousCompleted = completedLessons.includes(previousLesson.lessonId);
    return isCompleted || isPreviousCompleted;
  };

  const MobileView = () => (
    <div className="md:hidden flex flex-col h-full">
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
            <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                {courses.map(course => (
                    <DropdownMenuItem key={course.courseId} onSelect={() => handleCourseSelect(course)}>
                        {course.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </header>

      <main className="flex-grow overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="relative flex flex-col items-center">
            {selectedCourse.sections.map((section) => (
                <React.Fragment key={section.sectionId}>
                    <div className="flex items-center w-full my-12" key={section.title}>
                        <div className="flex-grow border-t-2 border-dashed border-border"></div>
                        <h2 className="mx-4 text-lg font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h2>
                        <div className="flex-grow border-t-2 border-dashed border-border"></div>
                    </div>
                    {section.lessons.map((lesson) => {
                      const unlocked = isLessonUnlocked(lesson.lessonId);
                      let variant: 'primary' | 'accent' | 'muted' = 'primary';
                      if (!unlocked) {
                        variant = 'muted';
                      } else if (lesson.type === 'quiz' || lesson.type === 'chest' || lesson.type === 'trophy') {
                        variant = 'accent';
                      }

                      const wrapperClasses = getNodeClasses(getLessonIndex(lesson.lessonId));
                      const labelClasses = `absolute -bottom-10 text-center font-bold text-sm ${unlocked ? 'text-foreground' : 'text-muted-foreground/50'}`;
                      const buttonContent = (
                        <div className={wrapperClasses}>
                          <motion.div
                            initial={{ scale: unlocked ? 1 : 0.8, opacity: unlocked ? 1 : 0.7 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: unlocked ? 0.1 : 0 }}
                          >
                            <ThreeDButton 
                              variant={variant}
                              state={unlocked ? 'active' : 'inactive'}
                              className="w-24 h-24 rounded-full"
                              disabled={!unlocked}
                            >
                              {getNodeIcon(lesson, unlocked)}
                            </ThreeDButton>
                          </motion.div>
                          <span className={labelClasses}>{lesson.title}</span>
                        </div>
                      );

                      if (unlocked) {
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
                    })}
                </React.Fragment>
            ))}
        </div>
      </main>
    </div>
  );

  const DesktopView = () => (
    <div className="hidden md:flex h-full w-full">
        <main className="flex-grow p-4 max-w-2xl mx-auto w-full">
            <header className="py-4">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between h-14 border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                            <div className="text-left">
                                <p className="text-lg font-bold">{selectedCourse.title}</p>
                            </div>
                            <ChevronDown className="h-6 w-6"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        {courses.map(course => (
                            <DropdownMenuItem key={course.courseId} onSelect={() => handleCourseSelect(course)}>
                                {course.title}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <div className="relative flex flex-col items-center">
                {selectedCourse.sections.map((section) => (
                    <React.Fragment key={section.sectionId}>
                        <div className="flex items-center w-full my-12" key={section.title}>
                            <div className="flex-grow border-t-2 border-dashed border-border"></div>
                            <h2 className="mx-4 text-lg font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h2>
                            <div className="flex-grow border-t-2 border-dashed border-border"></div>
                        </div>
                        {section.lessons.map((lesson) => {
                        const unlocked = isLessonUnlocked(lesson.lessonId);
                        let variant: 'primary' | 'accent' | 'muted' = 'primary';
                        if (!unlocked) {
                            variant = 'muted';
                        } else if (lesson.type === 'quiz' || lesson.type === 'chest' || lesson.type === 'trophy') {
                            variant = 'accent';
                        }

                        const wrapperClasses = getNodeClasses(getLessonIndex(lesson.lessonId));
                        const labelClasses = `absolute -bottom-10 text-center font-bold text-sm ${unlocked ? 'text-foreground' : 'text-muted-foreground/50'}`;
                        const buttonContent = (
                            <div className={wrapperClasses}>
                            <motion.div
                                initial={{ scale: unlocked ? 1 : 0.8, opacity: unlocked ? 1 : 0.7 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: unlocked ? 0.1 : 0 }}
                            >
                                <ThreeDButton 
                                variant={variant}
                                state={unlocked ? 'active' : 'inactive'}
                                className="w-24 h-24 rounded-full"
                                disabled={!unlocked}
                                >
                                {getNodeIcon(lesson, unlocked)}
                                </ThreeDButton>
                            </motion.div>
                            <span className={labelClasses}>{lesson.title}</span>
                            </div>
                        );

                        if (unlocked) {
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
                        })}
                    </React.Fragment>
                ))}
            </div>
        </main>
        <aside className="hidden md:block w-[350px] p-6 space-y-6 border-l shrink-0">
            <div className="flex items-center justify-around">
                <div className="flex items-center gap-2 text-orange-500 font-bold">
                    <Flame className="w-6 h-6" />
                    <span>5</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-500 font-bold">
                    <Zap className="w-6 h-6 fill-yellow-400" />
                    <span>120 XP</span>
                </div>
            </div>
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-2">
                         <Crown className="w-6 h-6 text-yellow-300" />
                        <CardTitle className="text-2xl">Go Premium!</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Unlock exclusive content, remove ads, and master skills faster.</p>
                    <Button variant="secondary" className="w-full text-blue-600 font-bold">Try for Free</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">You're in the top 20% this week!</p>
                    <Button variant="outline" className="w-full mt-4" asChild>
                        <Link href="/leaderboard">View Leaderboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Daily Quests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="font-medium text-sm">Complete 3 lessons</p>
                        <Progress value={66} className="h-2 mt-1"/>
                    </div>
                    <div>
                        <p className="font-medium text-sm">Earn 50 XP</p>
                        <Progress value={24} className="h-2 mt-1"/>
                    </div>
                </CardContent>
            </Card>
        </aside>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
