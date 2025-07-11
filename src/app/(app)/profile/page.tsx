import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, CheckCircle, Edit, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const completedCourses = [
  { id: 1, title: 'HTML & CSS Basics' },
  { id: 2, title: 'Intro to UX Design' },
]

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person portrait" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Alex Doe</h1>
          <p className="text-muted-foreground">alex.doe@example.com</p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <CardContent className="p-4 flex justify-around text-center">
          <div>
            <Flame className="w-6 h-6 mx-auto text-orange-500" />
            <p className="font-bold text-lg">5</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div>
            <CheckCircle className="w-6 h-6 mx-auto text-primary" />
            <p className="font-bold text-lg">{completedCourses.length}</p>
            <p className="text-xs text-muted-foreground">Courses Done</p>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-bold mb-4">Completed Courses</h2>
        <div className="space-y-2">
          {completedCourses.map(course => (
            <Card key={course.id}>
              <CardContent className="p-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="font-medium">{course.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
        <Button variant="destructive" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
