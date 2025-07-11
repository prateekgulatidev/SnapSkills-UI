import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featuredCourses = [
  { id: '1', title: 'JavaScript Fundamentals', category: 'Programming', progress: 0, image: 'https://placehold.co/300x150.png', hint: 'code javascript' },
  { id: '2', title: 'React for Beginners', category: 'Programming', progress: 0, image: 'https://placehold.co/300x150.png', hint: 'code react' },
  { id: '4', title: 'Personal Finance 101', category: 'Development', progress: 0, image: 'https://placehold.co/300x150.png', hint: 'money chart' },
];

const continueLearning = { id: '3', title: 'Python for Data Science', category: 'Programming', progress: 25, image: 'https://placehold.co/300x150.png', hint: 'code python' };

export default function LearnPage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold">Hello, Alex!</h1>
        <p className="text-muted-foreground">Let's make today a productive day.</p>
        <Card className="mt-4 bg-accent/20 border-accent/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent/30 p-2 rounded-full">
                <Flame className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-bold text-accent">5 Day Streak!</p>
                <p className="text-xs text-muted-foreground">Keep the fire burning.</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>120 XP</span>
            </div>
          </CardContent>
        </Card>
      </header>

      <section>
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <Link href={`/course/${continueLearning.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Image src={continueLearning.image} alt={continueLearning.title} width={300} height={150} className="w-full" data-ai-hint={continueLearning.hint}/>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{continueLearning.category}</Badge>
              <CardTitle className="text-lg">{continueLearning.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Progress value={continueLearning.progress} className="w-full h-2" />
              <span className="text-xs text-muted-foreground ml-2">{continueLearning.progress}%</span>
            </CardFooter>
          </Card>
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Featured Courses</h2>
        <div className="space-y-4">
          {featuredCourses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <Card className="flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors">
                <Image src={course.image} alt={course.title} width={80} height={80} className="rounded-md aspect-square object-cover" data-ai-hint={course.hint}/>
                <div className="flex-1">
                  <Badge variant="secondary" className="w-fit mb-1">{course.category}</Badge>
                  <h3 className="font-semibold">{course.title}</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Zap className="w-5 h-5 text-primary" />
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
