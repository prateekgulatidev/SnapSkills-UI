import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const continueLearning = { id: '3', title: 'Python for Data Science', category: 'Programming', progress: 25, image: 'https://placehold.co/600x300.png', hint: 'code python' };

export default function LearnPage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <Card className="bg-accent/20 border-accent/50">
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

      <section className="text-center">
        <h2 className="text-xl font-bold mb-2">Your Learning Path</h2>
        <p className="text-muted-foreground mb-6">You're making great progress. Keep it up!</p>
        
        <Link href={`/course/${continueLearning.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-card">
            <Image src={continueLearning.image} alt={continueLearning.title} width={600} height={300} className="w-full" data-ai-hint={continueLearning.hint}/>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2 mx-auto">{continueLearning.category}</Badge>
              <CardTitle className="text-2xl">{continueLearning.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground w-3/4 mx-auto">
                    <span>Progress</span>
                    <span>{continueLearning.progress}%</span>
                </div>
              <Progress value={continueLearning.progress} className="w-3/4 h-3 mx-auto" />
            </CardContent>
            <CardFooter className="p-4">
               <Button size="lg" className="w-full max-w-xs mx-auto h-12 text-lg">
                 Continue
               </Button>
            </CardFooter>
          </Card>
        </Link>
      </section>
    </div>
  );
}
