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
      },
      {
        "sectionId": "section3",
        "title": "Operators and Expressions",
        "lessons": [
          {
            "lessonId": "lesson6",
            "type": "text",
            "title": "Arithmetic and Logical Operators",
            "content": "Java provides various operators like +, -, *, /, %, ==, !=, >, <, &&, || for building expressions."
          },
          {
            "lessonId": "lesson7",
            "type": "code",
            "title": "Using Operators in Java",
            "language": "java",
            "code": "int a = 5, b = 10;\nSystem.out.println(a + b); // 15"
          }
        ]
      },
      {
        "sectionId": "section4",
        "title": "Control Flow - Conditionals",
        "lessons": [
          {
            "lessonId": "lesson8",
            "type": "text",
            "title": "If-Else Statements",
            "content": "Control flow in Java lets you conditionally execute code using if, else if, and else blocks."
          },
          {
            "lessonId": "lesson9",
            "type": "code",
            "title": "Conditional Example",
            "language": "java",
            "code": "int score = 85;\nif(score >= 90) {\n  System.out.println(\"Excellent\");\n} else {\n  System.out.println(\"Keep improving\");\n}"
          }
        ]
      },
      {
        "sectionId": "section5",
        "title": "Control Flow - Loops",
        "lessons": [
          {
            "lessonId": "lesson10",
            "type": "text",
            "title": "For, While, and Do-While",
            "content": "Loops allow repetition. Java supports for, while, and do-while loops."
          },
          {
            "lessonId": "lesson11",
            "type": "code",
            "title": "Loop Example",
            "language": "java",
            "code": "for(int i = 1; i <= 5; i++) {\n  System.out.println(\"Hello \" + i);\n}"
          }
        ]
      },
      {
        "sectionId": "section6",
        "title": "Methods and Functions",
        "lessons": [
          {
            "lessonId": "lesson12",
            "type": "text",
            "title": "Defining and Calling Methods",
            "content": "Methods are blocks of reusable code. Java methods can return values or be void."
          },
          {
            "lessonId": "lesson13",
            "type": "code",
            "title": "Simple Method Example",
            "language": "java",
            "code": "public static int add(int a, int b) {\n  return a + b;\n}"
          }
        ]
      },
      {
        "sectionId": "section7",
        "title": "Arrays and Collections",
        "lessons": [
          {
            "lessonId": "lesson14",
            "type": "text",
            "title": "Introduction to Arrays",
            "content": "Arrays are fixed-size containers for storing multiple elements of the same type."
          },
          {
            "lessonId": "lesson15",
            "type": "code",
            "title": "Working with Arrays",
            "language": "java",
            "code": "int[] numbers = {1, 2, 3};\nSystem.out.println(numbers[0]);"
          }
        ]
      },
      {
        "sectionId": "section8",
        "title": "Object-Oriented Programming",
        "lessons": [
          {
            "lessonId": "lesson16",
            "type": "text",
            "title": "What is OOP?",
            "content": "OOP is a paradigm based on classes and objects. Key concepts: encapsulation, inheritance, polymorphism, abstraction."
          },
          {
            "lessonId": "lesson17",
            "type": "quiz",
            "title": "OOP Basics Quiz",
            "question": "Which is not a pillar of OOP?",
            "options": [
              "Inheritance",
              "Encapsulation",
              "Compilation",
              "Polymorphism"
            ],
            "answerIndex": 2
          }
        ]
      },
      {
        "sectionId": "section9",
        "title": "Classes and Objects",
        "lessons": [
          {
            "lessonId": "lesson18",
            "type": "text",
            "title": "Defining Classes",
            "content": "A class is a blueprint for objects. It contains fields and methods."
          },
          {
            "lessonId": "lesson19",
            "type": "code",
            "title": "Creating Objects in Java",
            "language": "java",
            "code": "class Car {\n  String model;\n  Car(String m) {\n    model = m;\n  }\n}"
          }
        ]
      },
      {
        "sectionId": "section10",
        "title": "Constructors and Overloading",
        "lessons": [
          {
            "lessonId": "lesson20",
            "type": "text",
            "title": "What is a Constructor?",
            "content": "A constructor initializes new objects. Java allows constructor overloading with multiple signatures."
          },
          {
            "lessonId": "lesson21",
            "type": "code",
            "title": "Constructor Example",
            "language": "java",
            "code": "public class Student {\n  Student() {\n    System.out.println(\"New student created\");\n  }\n}"
          }
        ]
      },
      {
        "sectionId": "section11",
        "title": "Inheritance in Java",
        "lessons": [
          {
            "lessonId": "lesson22",
            "type": "text",
            "title": "Extending Classes",
            "content": "Inheritance allows a class to inherit fields and methods from another class."
          },
          {
            "lessonId": "lesson23",
            "type": "code",
            "title": "Simple Inheritance Example",
            "language": "java",
            "code": "class Animal {\n  void sound() {\n    System.out.println(\"Animal sound\");\n  }\n}\nclass Dog extends Animal {\n  void sound() {\n    System.out.println(\"Bark\");\n  }\n}"
          }
        ]
      },
      {
        "sectionId": "section12",
        "title": "Final Quiz & Review",
        "lessons": [
          {
            "lessonId": "lesson24",
            "type": "quiz",
            "title": "Final Review Quiz",
            "question": "Which keyword is used to create a subclass?",
            "options": [
              "class",
              "this",
              "extends",
              "implements"
            ],
            "answerIndex": 2
          },
          {
            "lessonId": "lesson25",
            "type": "text",
            "title": "Congratulations!",
            "content": "You've completed the Java Basics course. You're ready to build simple Java applications!"
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
