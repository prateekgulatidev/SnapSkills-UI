import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, PlayCircle, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const course = {
  id: '3',
  title: 'Python for Data Science',
  description: 'Learn the fundamentals of Python and how to use it for data analysis and visualization. No prior programming experience required.',
  difficulty: 'Beginner',
  tags: ['Python', 'Data Science', 'Pandas'],
  progress: 25,
  lessons: [
    { id: '1', title: 'Introduction to Python', completed: true },
    { id: '2', title: 'Variables and Data Types', completed: true },
    { id: '3', title: 'Lists and Loops', completed: false },
    { id: '4', title: 'Introduction to Pandas', completed: false },
    { id: '5', title: 'Final Project', completed: false },
  ]
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/learn">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-lg font-bold truncate">{course.title}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow overflow-y-auto">
        <Image src="https://placehold.co/600x300.png" alt={course.title} width={600} height={300} className="w-full" data-ai-hint="abstract data"/>
        
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <Badge>{course.difficulty}</Badge>
            {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
             <span className="text-sm font-medium">Progress</span>
             <span className="text-sm font-bold">{course.progress}% Complete</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold">Lessons</h3>
          {course.lessons.map((lesson, index) => (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-8 text-center text-muted-foreground font-bold">{index + 1}</div>
                  <div className="flex-grow">
                    <p className="font-semibold">{lesson.title}</p>
                  </div>
                  {lesson.completed ? (
                    <PlayCircle className="w-6 h-6 text-primary" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground/50" />
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="p-4 border-t sticky bottom-0 bg-background">
        <Button size="lg" className="w-full h-12 text-lg">
          <Link href={`/lesson/${course.lessons.find(l => !l.completed)?.id || course.lessons[0].id}`}>
            {course.progress > 0 ? 'Resume Learning' : 'Start Learning'}
          </Link>
        </Button>
      </footer>
    </div>
  )
}
