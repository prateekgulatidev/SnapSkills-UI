
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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  const getTotalLessons = (course: Course) => {
    return course.sections.reduce((total, section) => total + section.lessons.length, 0);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
            <div className="ml-auto">
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
                        <TableCell className="font-medium">{course.title}</TableCell>
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
                                <DropdownMenuItem>Edit</DropdownMenuItem>
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
