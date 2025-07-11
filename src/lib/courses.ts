
export type LessonContentType = 'text' | 'code' | 'quiz';

export interface TextContent {
  id: number;
  type: 'text';
  content: string;
}

export interface CodeContent {
  id: number;
  type: 'code';
  text?: string;
  language: string;
  code: string;
}

export interface QuizContent {
  id: number;
  type: 'quiz';
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export type LessonContent = TextContent | CodeContent | QuizContent;

export interface Lesson {
  lessonId: string;
  type: 'start' | 'lesson' | 'quiz' | 'chest' | 'guide' | 'practice';
  icon?: string;
  title: string;
  content?: LessonContent[];
}

export interface Section {
  sectionId: string;
  title:string;
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

const coursesData: Course[] = [
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
            "icon": "BookOpen",
            "type": "lesson",
            "title": "What is Java?",
            "content": [
              {
                "id": 1,
                "type": "text",
                "content": "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible."
              },
              {
                "id": 2,
                "type": "text",
                "content": "It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA)."
              }
            ]
          },
          {
            "lessonId": "lesson2",
            "icon": "Code",
            "type": "lesson",
            "title": "Hello World",
            "content": [
              {
                "id": 3,
                "type": "text",
                "content": "Here's how you write your first Java program:"
              },
              {
                "id": 4,
                "type": "code",
                "language": "java",
                "text": "This code prints 'Hello, SnapSkills!' to the console.",
                "code": "public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, SnapSkills!\");\n  }\n}"
              }
            ]
          },
          {
            "lessonId": "lesson_setup_env",
            "icon": "Terminal",
            "type": "lesson",
            "title": "Setup Environment",
            "content": [
              {
                "id": 14,
                "type": "text",
                "content": "To start coding in Java, you need to set up a development environment. This involves installing the Java Development Kit (JDK)."
              },
              {
                "id": 15,
                "type": "text",
                "content": "You will also need an Integrated Development Environment (IDE) like IntelliJ IDEA, Eclipse, or VS Code. We recommend VS Code with the 'Extension Pack for Java'."
              },
              {
                "id": 16,
                "type": "quiz",
                "question": "What does JDK stand for?",
                "options": [
                  "Java Development Kit",
                  "Java Design Kit",
                  "JavaScript Development Kit",
                  "Java Deployment Kit"
                ],
                "answerIndex": 0,
                "explanation": "JDK stands for Java Development Kit, which contains the tools needed to develop and run Java applications."
              }
            ]
          },
          {
            "lessonId": "lesson_jdk_details",
            "icon": "Binary",
            "type": "lesson",
            "title": "JDK Components",
            "content": [
              {
                "id": 17,
                "type": "text",
                "content": "The JDK has two main components: the Java Compiler (`javac`) and the Java Virtual Machine (JVM)."
              },
              {
                "id": 18,
                "type": "code",
                "language": "bash",
                "text": "The compiler turns your `.java` files into `.class` files (bytecode). You use it like this:",
                "code": "javac HelloWorld.java"
              },
              {
                "id": 19,
                "type": "code",
                "language": "bash",
                "text": "The JVM then runs the bytecode. You use it like this:",
                "code": "java HelloWorld"
              },
              {
                "id": 20,
                "type": "quiz",
                "question": "Which tool compiles a `.java` file into bytecode?",
                "options": [
                  "java",
                  "jvm",
                  "jdk",
                  "javac"
                ],
                "answerIndex": 3,
                "explanation": "`javac` is the Java compiler that transforms your source code into bytecode that the JVM can execute."
              }
            ]
          },
          {
            "lessonId": "lesson3",
            "icon": "Puzzle",
            "type": "quiz",
            "title": "Basic Concepts Quiz",
            "content": [
              {
                "id": 5,
                "type": "quiz",
                "question": "What does `System.out.println()` do?",
                "options": [
                  "Reads user input",
                  "Writes output to the console",
                  "Defines a class",
                  "Ends the program"
                ],
                "answerIndex": 1,
                "explanation": "System.out.println() is used to print a line of text to the console."
              }
            ]
          }
        ]
      },
      {
        "sectionId": "section2",
        "title": "Variables and Data Types",
        "lessons": [
          {
            "lessonId": "lesson4",
            "icon": "Variable",
            "type": "lesson",
            "title": "Understanding Variables",
            "content": [
              {
                "id": 6,
                "type": "text",
                "content": "Variables are named containers for storing data in memory. In Java, each variable must have a declared type."
              }
            ]
          },
          {
            "lessonId": "lesson5",
            "icon": "Braces",
            "type": "lesson",
            "title": "Declaring Variables",
            "content": [
              {
                "id": 7,
                "type": "text",
                "content": "Here's how you declare and initialize variables in Java:"
              },
              {
                "id": 8,
                "type": "code",
                "language": "java",
                "text": "This creates an integer `age` and a string `name`.",
                "code": "int age = 25;\nString name = \"SnapSkills\";"
              }
            ]
          }
        ]
      },
      {
        "sectionId": "section3",
        "title": "Operators and Expressions",
        "lessons": [
          { "lessonId": "lesson6", "icon": "FunctionSquare", "type": "lesson", "title": "Operators", "content": [{"id": 9, "type": "text", "content": "This lesson is under construction."}] },
          { "lessonId": "lesson7", "icon": "Terminal", "type": "lesson", "title": "Using Operators", "content": [{"id": 10, "type": "text", "content": "This lesson is under construction."}] }
        ]
      },
      {
        "sectionId": "section4",
        "title": "Control Flow - Conditionals",
        "lessons": [
          { "lessonId": "lesson8", "icon": "GitBranch", "type": "lesson", "title": "If-Else Statements", "content": [{"id": 11, "type": "text", "content": "This lesson is under construction."}] },
          { "lessonId": "lesson9", "icon": "GitCommit", "type": "lesson", "title": "Conditional Example", "content": [{"id": 12, "type": "text", "content": "This lesson is under construction."}] }
        ]
      },
      {
        "sectionId": "section5",
        "title": "Final Quiz",
        "lessons": [
            { "lessonId": "quiz_final", "icon": "Trophy", "type": "quiz", "title": "Final Quiz", "content": [{"id": 13, "type": "text", "content": "This quiz is under construction."}] }
        ]
      }
    ],
    "author": { "id": "author_prateek", "name": "Prateek Gulati", "profileImage": "https://placehold.co/100x100.png" },
    "rating": 4.8, "reviews": 127, "isFree": true
  },
  {
    "courseId": "course_python_ds",
    "title": "Python for Data Science",
    "description": "An introduction to data science using Python, Pandas, and Matplotlib.",
    "level": "Beginner", "language": "Python", "tags": ["python", "data science", "pandas", "matplotlib"],
    "coverImage": "https://placehold.co/600x400.png", "duration": "6h 15m",
    "sections": [
        {
            "sectionId": "py_sec1",
            "title": "Python Fundamentals",
            "lessons": [
                { "lessonId": "py_lesson1", "type": "lesson", "icon": "Code", "title": "Intro to Python", "content": [{"id": 1, "type": "text", "content": "Python is a versatile language you can use for web development, data science, and more."}] },
                { "lessonId": "py_lesson2", "type": "quiz", "icon": "Puzzle", "title": "Python Syntax", "content": [{ "id": 2, "type": "quiz", "question": "Which of these is a valid variable name in Python?", "options": ["my-var", "1var", "my_var", "$var"], "answerIndex": 2, "explanation": "Variable names in Python can only contain alpha-numeric characters and underscores, and cannot start with a number." }] }
            ]
        }
    ],
    "author": { "id": "author_jane", "name": "Jane Doe", "profileImage": "https://placehold.co/100x100.png" },
    "rating": 4.9, "reviews": 250, "isFree": true
  }
];

// Simulate API delay
const fakeApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCourses(): Promise<Course[]> {
  await fakeApiDelay(50); // Simulate network latency
  return JSON.parse(JSON.stringify(coursesData));
}

export async function getCourse(courseId: string): Promise<Course | undefined> {
  await fakeApiDelay(50);
  const course = coursesData.find(c => c.courseId === courseId);
  return course ? JSON.parse(JSON.stringify(course)) : undefined;
}

export async function getLesson(courseId: string, lessonId: string): Promise<{ course: Course; lesson: Lesson } | undefined> {
  await fakeApiDelay(50);
  const course = coursesData.find(c => c.courseId === courseId);
  if (!course) return undefined;

  for (const section of course.sections) {
    const lesson = section.lessons.find(l => l.lessonId === lessonId);
    if (lesson) {
        // Ensure lesson content exists, even if empty
        if (!lesson.content || lesson.content.length === 0) {
            lesson.content = [{ id: 999, type: 'text', content: 'This lesson is under construction.' }];
        }
        return JSON.parse(JSON.stringify({ course, lesson }));
    }
  }

  return undefined;
}
