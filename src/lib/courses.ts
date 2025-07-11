
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
    "courseId": "course_python_basics",
    "title": "Python Programming - From Scratch",
    "description": "A comprehensive introduction to Python programming. Covers fundamental concepts like variables, data types, control flow, functions, and an introduction to data structures. Perfect for absolute beginners.",
    "level": "Beginner",
    "language": "Python",
    "tags": ["programming", "python", "basics", "data structures", "functions"],
    "coverImage": "https://placehold.co/600x400.png",
    "duration": "5h 00m",
    "sections": [
      {
        "sectionId": "section1_py",
        "title": "Introduction to Python",
        "lessons": [
          {
            "lessonId": "lesson1_py_whatis",
            "icon": "BookOpen",
            "type": "lesson",
            "title": "What is Python?",
            "content": [
              {
                "id": 1,
                "type": "text",
                "content": "Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation."
              },
              {
                "id": 2,
                "type": "text",
                "content": "It is widely used in web development, data science, artificial intelligence, and automation."
              },
              {
                "id": 3,
                "type": "quiz",
                "question": "What is a key design philosophy of Python?",
                "options": [
                  "Maximum performance",
                  "Code readability",
                  "Complex syntax",
                  "Hardware control"
                ],
                "answerIndex": 1,
                "explanation": "Python's core philosophy, outlined in the 'Zen of Python' (try `import this`), prioritizes simplicity and readability."
              }
            ]
          },
          {
            "lessonId": "lesson2_py_helloworld",
            "icon": "Code",
            "type": "lesson",
            "title": "Your First Python Program",
            "content": [
              {
                "id": 4,
                "type": "text",
                "content": "Let's write your first 'Hello, World!' program. In Python, you use the built-in `print()` function."
              },
              {
                "id": 5,
                "type": "code",
                "language": "python",
                "text": "This simple line of code will print the message 'Hello, SnapSkills!' to your console.",
                "code": "print(\"Hello, SnapSkills!\")"
              },
              {
                "id": 6,
                "type": "text",
                "content": "Notice how clean and straightforward it is compared to other languages. There's no complex boilerplate code required."
              }
            ]
          },
          {
            "lessonId": "lesson3_py_setup",
            "icon": "Terminal",
            "type": "lesson",
            "title": "Setting Up Your Environment",
            "content": [
              {
                "id": 7,
                "type": "text",
                "content": "To begin, you need to install the Python interpreter from the official website, python.org."
              },
              {
                "id": 8,
                "type": "text",
                "content": "We also strongly recommend using a code editor like VS Code with the official Python extension or an IDE like PyCharm to make coding easier."
              },
              {
                "id": 9,
                "type": "quiz",
                "question": "What is the official source for downloading the Python interpreter?",
                "options": [
                  "python.com",
                  "The Microsoft Store",
                  "python.org",
                  "py.dev"
                ],
                "answerIndex": 2,
                "explanation": "python.org is the official home of the Python programming language and where you can find the official installers."
              }
            ]
          },
          {
            "lessonId": "lesson4_py_running",
            "icon": "Play",
            "type": "lesson",
            "title": "Running Python Code",
            "content": [
              {
                "id": 10,
                "type": "text",
                "content": "You can run Python code by saving it in a file with a `.py` extension and executing it from your terminal."
              },
              {
                "id": 11,
                "type": "code",
                "language": "bash",
                "text": "Assuming you have a file named `my_program.py`, you would run it like this:",
                "code": "python my_program.py"
              },
              {
                "id": 12,
                "type": "text",
                "content": "You can also run Python interactively in a Read-Eval-Print Loop (REPL) by just typing `python` in your terminal. This is great for testing small snippets of code."
              }
            ]
          },
          {
            "lessonId": "lesson5_py_comments",
            "icon": "MessageSquare",
            "type": "lesson",
            "title": "Comments and Basic Syntax",
            "content": [
              {
                "id": 13,
                "type": "text",
                "content": "Comments are crucial for making your code understandable. In Python, comments start with a hash symbol (`#`)."
              },
              {
                "id": 14,
                "type": "code",
                "language": "python",
                "text": "The Python interpreter ignores everything after the `#` on the same line.",
                "code": "# This is a comment. It is not executed.\n\nprint(\"This line will be executed.\") # This is an inline comment."
              },
              {
                "id": 15,
                "type": "quiz",
                "question": "How do you start a single-line comment in Python?",
                "options": [
                  "//",
                  "/*",
                  "#",
                  "---"
                ],
                "answerIndex": 2,
                "explanation": "The hash symbol (`#`) is used for all single-line comments in Python."
              }
            ]
          }
        ]
      },
      {
        "sectionId": "section2_py",
        "title": "Variables and Core Data Types",
        "lessons": [
          {
            "lessonId": "lesson6_py_variables",
            "icon": "Variable",
            "type": "lesson",
            "title": "Understanding Variables",
            "content": [
              {
                "id": 16,
                "type": "text",
                "content": "A variable is a name that refers to a value. It's a way to label and store information in your program."
              },
              {
                "id": 17,
                "type": "text",
                "content": "Python is dynamically typed, which means you don't have to declare the type of a variable. The type is inferred at runtime."
              },
              {
                "id": 18,
                "type": "code",
                "language": "python",
                "text": "Here, we assign a string to `course_name` and an integer to `year`.",
                "code": "course_name = \"Python Programming\"\nyear = 2025"
              }
            ]
          },
          {
            "lessonId": "lesson7_py_strings",
            "icon": "Type",
            "type": "lesson",
            "title": "Working with Strings",
            "content": [
              {
                "id": 19,
                "type": "text",
                "content": "Strings are used to represent text data. You can create them using single ('') or double (\"\") quotes."
              },
              {
                "id": 20,
                "type": "text",
                "content": "A modern and highly recommended way to format strings is using f-strings."
              },
              {
                "id": 21,
                "type": "code",
                "language": "python",
                "text": "F-strings allow you to embed expressions inside string literals.",
                "code": "name = \"SnapSkills\"\ngreeting = f\"Welcome to {name}!\"\nprint(greeting) # Output: Welcome to SnapSkills!"
              }
            ]
          },
          {
            "lessonId": "lesson8_py_numbers",
            "icon": "Binary",
            "type": "lesson",
            "title": "Numbers: Integers and Floats",
            "content": [
              {
                "id": 22,
                "type": "text",
                "content": "Python has two main numeric types: integers (`int`) for whole numbers and floating-point numbers (`float`) for decimal numbers."
              },
              {
                "id": 23,
                "type": "code",
                "language": "python",
                "text": "Basic arithmetic operations are straightforward.",
                "code": "quantity = 5\nprice = 10.50\ntotal_cost = quantity * price # This will be a float"
              },
              {
                "id": 24,
                "type": "quiz",
                "question": "In Python 3, what is the data type of the result of `10 / 2`?",
                "options": [
                  "int",
                  "float",
                  "str",
                  "Error"
                ],
                "answerIndex": 1,
                "explanation": "Standard division (`/`) in Python 3 always results in a float to preserve precision, so the answer is 5.0."
              }
            ]
          },
          {
            "lessonId": "lesson9_py_booleans",
            "icon": "ToggleRight",
            "type": "lesson",
            "title": "Booleans and None",
            "content": [
              {
                "id": 25,
                "type": "text",
                "content": "The Boolean type has two possible values: `True` and `False`. They are essential for conditional logic."
              },
              {
                "id": 26,
                "type": "code",
                "language": "python",
                "text": "Booleans are often the result of comparison operations.",
                "code": "is_beginner = True\nhas_finished = False\nis_greater = 10 > 5 # This evaluates to True"
              },
              {
                "id": 27,
                "type": "text",
                "content": "Python also has a special type called `None`, which is used to represent the absence of a value."
              }
            ]
          },
          {
            "lessonId": "lesson10_py_casting",
            "icon": "Combine",
            "type": "lesson",
            "title": "Type Casting and Checking",
            "content": [
              {
                "id": 28,
                "type": "text",
                "content": "Sometimes you need to convert a value from one type to another. This is called type casting."
              },
              {
                "id": 29,
                "type": "code",
                "language": "python",
                "text": "For example, to convert a user's input (which is always a string) to a number.",
                "code": "input_string = \"30\"\nage = int(input_string) # Convert string to integer\n\n# Check the type of the new variable\nprint(type(age)) # Output: <class 'int'>"
              },
              {
                "id": 30,
                "type": "quiz",
                "question": "Which function converts a value into a string?",
                "options": [
                  "int()",
                  "str()",
                  "string()",
                  "text()"
                ],
                "answerIndex": 1,
                "explanation": "`str()` is the built-in Python function for converting other data types into strings."
              }
            ]
          }
        ]
      },
      {
        "sectionId": "section3_py",
        "title": "Operators and Expressions",
        "lessons": [
          { "lessonId": "lesson11_py", "icon": "FunctionSquare", "type": "lesson", "title": "Arithmetic and Comparison Operators", "content": [{"id": 31, "type": "text", "content": "This lesson is under construction."}] }
        ]
      },
      {
        "sectionId": "section4_py",
        "title": "Control Flow - Conditionals",
        "lessons": [
          { "lessonId": "lesson12_py", "icon": "GitBranch", "type": "lesson", "title": "If, Elif, and Else Statements", "content": [{"id": 32, "type": "text", "content": "This lesson is under construction."}] }
        ]
      },
      {
        "sectionId": "section5_py",
        "title": "Final Quiz",
        "lessons": [
            { "lessonId": "quiz_final_py", "icon": "Trophy", "type": "quiz", "title": "Final Quiz", "content": [{"id": 33, "type": "text", "content": "This quiz is under construction."}] }
        ]
      }
    ],
    "author": { "id": "author_jane_doe", "name": "Jane Doe", "profileImage": "https://placehold.co/100x100.png" },
    "rating": 4.9, "reviews": 254, "isFree": true
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
