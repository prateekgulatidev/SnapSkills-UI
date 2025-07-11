export interface Lesson {
  lessonId: string;
  type: 'text' | 'code' | 'quiz' | 'start' | 'lesson' | 'chest' | 'guide' | 'practice';
  title: string;
  content?: string;
  language?: string;
  code?: string;
  question?: string;
  options?: string[];
  answerIndex?: number;
}

export interface Section {
  sectionId: string;
  title: string;
  lessons: Lesson[];
}

export interface Author {
  id: string;
  name: string;
  profileImage: string;
}

export interface Course {
  courseId: string;
  title: string;
  description: string;
  level: string;
  language: string;
  tags: string[];
  coverImage: string;
  duration: string;
  sections: Section[];
  author: Author;
  rating: number;
  reviews: number;
  isFree: boolean;
}


export const courses: Course[] = [
  {
    "courseId": "course_java_basics",
    "title": "Java Programming - Basics",
    "description": "Learn Java from scratch. Start with variables, loops, conditionals, and object-oriented programming.",
    "level": "Beginner",
    "language": "Java",
    "tags": ["programming", "java", "basics", "OOP"],
    "coverImage": "https://placehold.co/600x400.png",
    "duration": "4h 30m",
    "sections": [
      {
        "sectionId": "section1",
        "title": "Getting Started with Java",
        "lessons": [
          {
            "lessonId": "lesson1",
            "type": "text",
            "title": "What is Java?",
            "content": "Java is a popular, high-level, object-oriented programming language known for its portability and reliability."
          },
          {
            "lessonId": "lesson2",
            "type": "code",
            "title": "Hello World in Java",
            "language": "java",
            "code": "public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, SnapSkills!\");\n  }\n}"
          },
          {
            "lessonId": "lesson3",
            "type": "quiz",
            "title": "Basic Java Concepts Quiz",
            "question": "What does `System.out.println()` do?",
            "options": [
              "Reads user input",
              "Writes output to the console",
              "Defines a class",
              "Ends the program"
            ],
            "answerIndex": 1
          }
        ]
      },
      {
        "sectionId": "section2",
        "title": "Variables and Data Types",
        "lessons": [
          {
            "lessonId": "lesson4",
            "type": "text",
            "title": "Understanding Variables",
            "content": "In Java, variables are containers for storing data values, defined with a specific type."
          },
          {
            "lessonId": "lesson5",
            "type": "code",
            "title": "Declaring Variables",
            "language": "java",
            "code": "int age = 25;\nString name = \"SnapSkills\";"
          }
        ]
      }
    ],
    "author": {
      "id": "author_prateek",
      "name": "Prateek Gulati",
      "profileImage": "https://placehold.co/100x100.png"
    },
    "rating": 4.8,
    "reviews": 127,
    "isFree": true
  },
   {
    "courseId": "course_python_ds",
    "title": "Python for Data Science",
    "description": "An introduction to data science using Python, Pandas, and Matplotlib.",
    "level": "Beginner",
    "language": "Python",
    "tags": ["python", "data science", "pandas", "matplotlib"],
    "coverImage": "https://placehold.co/600x400.png",
    "duration": "6h 15m",
    "sections": [
        {
            "sectionId": "py_sec1",
            "title": "Python Fundamentals",
            "lessons": [
                {
                    "lessonId": "py_lesson1",
                    "type": "text",
                    "title": "Intro to Python",
                    "content": "Python is a versatile language you can use for web development, data science, and more."
                },
                {
                    "lessonId": "py_lesson2",
                    "type": "quiz",
                    "title": "Python Syntax",
                    "question": "Which of these is a valid variable name in Python?",
                    "options": ["my-var", "1var", "my_var", "$var"],
                    "answerIndex": 2
                }
            ]
        }
    ],
    "author": {
      "id": "author_jane",
      "name": "Jane Doe",
      "profileImage": "https://placehold.co/100x100.png"
    },
    "rating": 4.9,
    "reviews": 250,
    "isFree": true
  }
];
