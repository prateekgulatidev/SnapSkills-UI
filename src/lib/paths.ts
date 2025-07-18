
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
    },
    {
        id: 'web-dev-fundamentals',
        title: 'Web Development Fundamentals',
        description: 'Build a solid foundation for creating websites and web applications.',
        courses: [
            { id: 'html-basics', title: 'HTML Basics' },
            { id: 'css-fundamentals', title: 'CSS Fundamentals' },
            { id: 'javascript-basics', title: 'JavaScript Basics' },
            { id: 'dom-manipulation', title: 'DOM Manipulation' },
            { id: 'responsive-design', title: 'Responsive Design' },
        ]
    },
    {
        id: 'advanced-javascript',
        title: 'Advanced JavaScript',
        description: 'Deepen your JavaScript knowledge and master modern concepts.',
        courses: [
            { id: 'es6-features', title: 'ES6+ Features' },
            { id: 'asynchronous-js', title: 'Async JS & Promises' },
            { id: 'js-data-structures', title: 'Data Structures' },
            { id: 'functional-programming', title: 'Functional Programming' },
            { id: 'js-design-patterns', title: 'Design Patterns' },
        ]
    },
    {
        id: 'python-data-science',
        title: 'Python for Data Science',
        description: 'Learn to analyze and visualize data using Python.',
        courses: [
            { id: 'python-basics', title: 'Python Fundamentals' },
            { id: 'numpy', title: 'NumPy for Science' },
            { id: 'pandas', title: 'Pandas DataFrames' },
            { id: 'matplotlib', title: 'Data Visualization' },
            { id: 'scikit-learn', title: 'Intro to Machine Learning', isNew: true },
        ]
    },
    {
        id: 'java-backend',
        title: 'Java Backend Development',
        description: 'Build robust and scalable server-side applications with Java.',
        courses: [
            { id: 'java-advanced', title: 'Advanced Java' },
            { id: 'spring-framework', title: 'Spring Framework' },
            { id: 'restful-apis', title: 'Building RESTful APIs' },
            { id: 'database-hibernate', title: 'Databases & Hibernate' },
            { id: 'microservices', title: 'Intro to Microservices' },
        ]
    },
    {
        id: 'devops-essentials',
        title: 'DevOps Essentials',
        description: 'Understand the culture and tools for modern software delivery.',
        courses: [
            { id: 'linux-cli', title: 'Linux Command Line' },
            { id: 'git-mastery', title: 'Git Mastery' },
            { id: 'docker-containers', title: 'Docker & Containers' },
            { id: 'ci-cd-pipelines', title: 'CI/CD Pipelines' },
            { id: 'cloud-basics', title: 'Intro to Cloud (AWS)' },
        ]
    },
    {
        id: 'cybersecurity-basics',
        title: 'Cybersecurity Basics',
        description: 'Learn the fundamental principles of protecting digital systems.',
        courses: [
            { id: 'networking-security', title: 'Network Security' },
            { id: 'cryptography', title: 'Cryptography 101' },
            { id: 'web-vulnerabilities', title: 'Web Vulnerabilities' },
            { id: 'ethical-hacking', title: 'Ethical Hacking Intro' },
            { id: 'security-policies', title: 'Security Policies', isNew: true },
        ]
    },
    {
        id: 'ui-ux-design',
        title: 'UI/UX Design Principles',
        description: 'Create intuitive and beautiful user interfaces and experiences.',
        courses: [
            { id: 'design-thinking', title: 'Design Thinking' },
            { id: 'user-research', title: 'User Research' },
            { id: 'wireframing', title: 'Wireframing & Prototyping' },
            { id: 'visual-design', title: 'Visual Design Fundamentals' },
            { id: 'usability-testing', title: 'Usability Testing' },
        ]
    }
];
