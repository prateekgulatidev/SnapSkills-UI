
'use client';

import * as React from 'react';
import { getCourses, Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export default function AdminCoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [allCourses, setAllCourses] = React.useState<Course[]>([]);
  const [levelFilter, setLevelFilter] = React.useState<string>("All");

  React.useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setAllCourses(fetchedCourses);
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  React.useEffect(() => {
    if (levelFilter === "All") {
      setCourses(allCourses);
    } else {
      setCourses(allCourses.filter(course => course.level === levelFilter));
    }
  }, [levelFilter, allCourses]);

  const getTotalLessons = (course: Course) => {
    return course.sections.reduce((total, section) => total + section.lessons.length, 0);
  }

  const uniqueLevels = ["All", ...Array.from(new Set(allCourses.map(course => course.level)))];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Filter by Level
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by level</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {uniqueLevels.map(level => (
                            <DropdownMenuCheckboxItem
                                key={level}
                                checked={levelFilter === level}
                                onCheckedChange={() => setLevelFilter(level)}
                            >
                                {level}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button>Add Course</Button>
            </div>
        </div>
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Level</TableHead>
                    <TableHead className="hidden md:table-cell">Lessons</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {courses.map((course) => (
                    <TableRow key={course.courseId}>
                        <TableCell className="font-medium">
                            <Link href={`/admin/courses/${course.courseId}`} className="hover:underline">
                                {course.title}
                            </Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{course.level}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{getTotalLessons(course)}</TableCell>
                        <TableCell className="hidden md:table-cell">{course.duration}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/courses/${course.courseId}`}>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </main>
  );
}
