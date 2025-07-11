import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Link from "next/link";
import { Star, Lock, BookOpen, Gift, Dumbbell } from "lucide-react";

const course = {
  id: '3',
  title: 'Unit 1',
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
}

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


export default function CoursePathPage({ params }: { params: { courseId: string } }) {
  const activeLessonIndex = course.lessons.findIndex(l => !l.completed);
  
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-primary text-primary-foreground z-10">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{course.title}</h1>
          <p className="text-sm opacity-90">{course.description}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
          <Link href="/learn">
            <List className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-8">
        <div className="relative flex flex-col items-center">
            {/* Dotted line */}
            <div className="absolute top-12 bottom-12 w-2 bg-repeat-y bg-[length:8px_24px] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%2224%22%20viewBox%3D%220%200%208%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%224%22%20cy%3D%224%22%20r%3D%224%22%20fill%3D%22%23E5E5E5%22%2F%3E%3C%2Fsvg%3E%0A')]"></div>
            
            {course.lessons.map((lesson, index) => {
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
  )
}
