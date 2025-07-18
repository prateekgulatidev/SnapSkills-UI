
export interface PathCourse {
    id: string;
    title: string;
    isNew?: boolean;
}

export interface LearningPath {
    id: string;
    title: string;
    description: string;
    courses: PathCourse[];
}

export const learningPaths: LearningPath[] = [
    {
        id: 'foundational-math',
        title: 'Foundational Math',
        description: 'Master problem solving essentials in math',
        courses: [
            { id: 'mathematical-thinking', title: 'Mathematical Thinking' },
            { id: 'solving-equations', title: 'Solving Equations' },
            { id: 'visual-algebra', title: 'Visual Algebra' },
            { id: 'probability-and-chance', title: 'Probability and Chance', isNew: true },
            { id: 'geometry', title: 'Geometry' },
            { id: 'functions', title: 'Functions' },
        ]
    }
];
