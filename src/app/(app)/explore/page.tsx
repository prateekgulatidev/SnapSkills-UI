
'use client';

import * as React from 'react';
import { learningPaths, PathCourse } from '@/lib/paths';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PathIcon, CompassIcon, WeighingScaleIcon, CubesIcon, DiceIcon, GeometryIcon, FunctionsIcon } from '@/components/icons/ExploreIcons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const courseIcons: Record<string, React.ElementType> = {
    'mathematical-thinking': CompassIcon,
    'solving-equations': WeighingScaleIcon,
    'visual-algebra': CubesIcon,
    'probability-and-chance': DiceIcon,
    'geometry': GeometryIcon,
    'functions': FunctionsIcon
};

const CourseCard = ({ course, isLast }: { course: PathCourse; isLast: boolean }) => {
    const IconComponent = courseIcons[course.id] || CubesIcon;

    return (
        <div className="relative flex-shrink-0 w-48 text-center">
            <Card className="p-4 w-48 h-40 rounded-xl shadow-md hover:shadow-lg hover:border-primary/30 transition-all flex items-center justify-center relative group">
                {course.isNew && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white border-green-600">NEW</Badge>
                )}
                <IconComponent className="w-24 h-24" />
            </Card>
            <h3 className="mt-3 font-semibold text-sm text-foreground">{course.title}</h3>
            {!isLast && (
                <div className="absolute top-1/2 left-full w-8 h-px bg-border -translate-y-1/2 ml-1"></div>
            )}
        </div>
    );
};

export default function ExplorePage() {
    return (
        <div className="flex flex-col h-full">
            <header className="p-6 border-b">
                <h1 className="text-2xl font-bold">Learning Paths</h1>
                <p className="text-muted-foreground">Step-by-step paths to mastery</p>
            </header>
            <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-12">
                {learningPaths.map((path) => (
                    <section key={path.id}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 text-primary">
                                <PathIcon />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{path.title}</h2>
                                <p className="text-muted-foreground">{path.description}</p>
                            </div>
                        </div>
                        <div className="p-6 bg-muted/40 rounded-2xl">
                            <div className="flex items-center gap-10 overflow-x-auto pb-4 -mb-4">
                                {path.courses.map((course, index) => (
                                    <CourseCard key={course.id} course={course} isLast={index === path.courses.length - 1} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}
