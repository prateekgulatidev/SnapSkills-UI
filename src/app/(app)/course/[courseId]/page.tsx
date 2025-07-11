import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Link from "next/link";

const course = {
  id: '3',
  title: 'Unit 1',
  description: 'Python for Data Science',
};

export default function CoursePathPage({ params }: { params: { courseId: string } }) {
  
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-primary text-primary-foreground z-10">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{course.title}</h1>
          <p className="text-sm opacity-90">{course.description}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" asChild>
          <Link href="/learn">
            <List className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-8">
        <p className="text-center text-muted-foreground">Select a lesson to begin.</p>
      </main>
    </div>
  )
}
