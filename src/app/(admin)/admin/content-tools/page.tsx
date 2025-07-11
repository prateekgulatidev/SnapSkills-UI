
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, Copy } from 'lucide-react';
import { getCourses, Course } from '@/lib/courses';

export default function AdminContentToolsPage() {
    const [courses, setCourses] = React.useState<Course[]>([]);
    
    React.useEffect(() => {
        async function loadCourses() {
          const allCourses = await getCourses();
          setCourses(allCourses);
        }
        loadCourses();
    }, []);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Import Content</CardTitle>
                        <CardDescription>Upload a JSON file to import courses or lessons.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Input type="file" accept=".json" className="max-w-xs" />
                            <Button><Upload className="mr-2 h-4 w-4" /> Import JSON</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Ensure the JSON file is correctly formatted. Any existing content with the same ID will be overwritten.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Export Content</CardTitle>
                        <CardDescription>Download course data as a JSON file for backup or migration.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Select>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a course to export" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Courses</SelectItem>
                                    {courses.map(course => (
                                        <SelectItem key={course.courseId} value={course.courseId}>{course.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export JSON</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Clone a Course</CardTitle>
                        <CardDescription>Create a duplicate of an existing course to create a new version or language.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Select>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select a course to clone" />
                                </SelectTrigger>
                                <SelectContent>
                                     {courses.map(course => (
                                        <SelectItem key={course.courseId} value={course.courseId}>{course.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button><Copy className="mr-2 h-4 w-4" /> Clone Course</Button>
                        </div>
                         <p className="text-xs text-muted-foreground">
                            The cloned course will have a new ID and can be edited independently.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
