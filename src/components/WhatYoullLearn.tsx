
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Code, Component, GitBranch, Network } from "lucide-react";

const learningPaths = [
  {
    title: "Java Programming",
    icon: Coffee,
    description: "Learn core Java concepts, OOP principles, and advanced topics like multithreading and collections.",
    tags: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    title: "Python",
    icon: Code,
    description: "Master Python fundamentals, data structures, and libraries like NumPy, Pandas, and Django.",
    tags: ["Data Science", "Web Dev", "Automation"],
  },
  {
    title: "C++",
    icon: Component,
    description: "Learn modern C++, memory management, STL, and performance optimization techniques.",
    tags: ["Game Dev", "System Programming", "Competitive"],
  },
  {
    title: "System Design",
    icon: Network,
    description: "Design scalable systems, microservices architectures, and distributed applications.",
    tags: ["Architecture", "Scalability", "Database Design"],
  },
  {
    title: "Data Structures & Algorithms",
    icon: GitBranch,
    description: "Master essential DSA concepts, complexity analysis, and problem-solving techniques.",
    tags: ["Arrays", "Graphs", "Dynamic Programming"],
  },
];

export function WhatYoullLearn() {
  return (
    <section className="bg-background py-12 md:py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          What You'll Learn
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Master in-demand tech skills with our comprehensive learning paths
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {learningPaths.map((path) => (
            <Card key={path.title} className="flex flex-col hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <path.icon className="w-8 h-8 text-primary" />
                </div>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 mt-auto">
                {path.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
