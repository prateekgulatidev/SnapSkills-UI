
'use client';

import * as React from 'react';
import { Progress } from "@/components/ui/progress";
import { Flame, Zap, Star, Lock, BookOpen, Gift, Dumbbell, Code, Braces, Terminal, Binary, FunctionSquare, Variable, Repeat, GitCommit, GitBranch, Puzzle, Trophy, ChevronDown, CheckCircle, Notebook } from "lucide-react";
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
import { RadialProgress } from '@/components/ui/radial-progress';

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

  const getSectionProgress = (sectionId: string) => {
    const section = selectedCourse.sections.find(s => s.sectionId === sectionId);
    if (!section) return 0;
    const completedInSection = section.lessons.filter(l => completedLessons.includes(l.lessonId)).length;
    return Math.round((completedInSection / section.lessons.length) * 100);
  }

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

      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto w-full">
            <div className="relative flex flex-col items-center">
                {selectedCourse.sections.map((section, sectionIndex) => (
                    <React.Fragment key={section.sectionId}>
                        <div className="flex items-center w-full my-12" key={section.title}>
                            <div className="flex-grow border-t-2 border-dashed border-border"></div>
                            <h2 className="mx-4 text-lg font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h2>
                            <div className="flex-grow border-t-2 border-dashed border-border"></div>
                        </div>
                        {section.lessons.map((lesson, lessonIndex) => {
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
        </div>
      </main>
    </div>
  );

  const DesktopView = () => {
    const totalLessons = allLessonsInCourse.length;
    const completedCount = completedLessons.length;
    const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
    
    return (
      <div className="hidden md:flex flex-col h-full bg-background dark:bg-card">
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <h1 className="text-xl font-bold">{selectedCourse.title}</h1>
          <div className="flex items-center gap-4">
             <div className="w-48">
              <Progress value={overallProgress} className="h-2" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{completedCount} / {totalLessons}</span>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {selectedCourse.sections.map((section, index) => (
              <div key={section.sectionId} className="mb-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider">Section {index + 1}</p>
                    <h2 className="text-3xl font-bold mt-1">{section.title}</h2>
                  </div>
                  <div className="text-center">
                      <RadialProgress value={getSectionProgress(section.sectionId)} />
                      <p className="text-xs text-muted-foreground mt-2">Completed</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Lessons</h3>
                    <div className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => {
                            const unlocked = isLessonUnlocked(lesson.lessonId);
                            const isCompleted = completedLessons.includes(lesson.lessonId);

                            const LessonRow = (
                                <div
                                    className={cn(
                                        'flex items-center p-3 rounded-lg transition-colors',
                                        unlocked ? 'hover:bg-muted' : 'opacity-60 cursor-not-allowed',
                                        isCompleted && 'bg-primary/10 hover:bg-primary/20'
                                    )}
                                >
                                    <span className={cn("text-2xl font-bold w-12", isCompleted ? 'text-primary' : 'text-muted-foreground' )}>
                                        {String(lessonIndex + 1).padStart(2, '0')}
                                    </span>
                                    <p className="font-medium flex-grow">{lesson.title}</p>
                                    {isCompleted ? (
                                      <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="h-5 w-5" />
                                        <span className="text-sm font-semibold">Completed</span>
                                      </div>
                                    ) : (
                                      <Button variant="outline" size="sm" disabled={!unlocked}>
                                        {unlocked ? <Notebook className="mr-2 h-4 w-4"/> : <Lock className="mr-2 h-4 w-4"/>}
                                        Learn
                                      </Button>
                                    )}
                                </div>
                            );
                            
                            if (unlocked) {
                                return (
                                    <Link key={lesson.lessonId} href={`/lesson/${lesson.lessonId}?courseId=${selectedCourse.courseId}`}>
                                        {LessonRow}
                                    </Link>
                                )
                            }
                            return <div key={lesson.lessonId}>{LessonRow}</div>
                        })}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  };

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
