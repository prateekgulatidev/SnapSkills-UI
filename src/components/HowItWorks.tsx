
'use client';

import { BookText, BrainCircuit, Star, Rocket } from "lucide-react";
import * as React from "react";

const steps = [
  {
    title: "Learn",
    icon: BookText,
    description: "Bite-sized interactive lessons that take just 5 minutes to complete",
    color: "from-green-400 to-primary",
  },
  {
    title: "Quiz",
    icon: BrainCircuit,
    description: "Test your knowledge with quick quizzes and coding challenges",
    color: "from-purple-400 to-accent",
  },
  {
    title: "Earn XP",
    icon: Star,
    description: "Gain experience points and level up your profile as you progress",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    title: "Unlock Projects",
    icon: Rocket,
    description: "Access real-world projects to apply your skills and build a portfolio",
    color: "from-sky-400 to-blue-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 md:py-20 px-6 sm:px-12 bg-muted/50 dark:bg-muted/10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          How SnapSkills Works
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Our simple 4-step approach makes learning technical skills fun and effective
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`rounded-2xl p-6 shadow-lg bg-gradient-to-br ${step.color} text-white hover:scale-105 transition-transform duration-300 flex flex-col items-center`}
            >
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-white/90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
