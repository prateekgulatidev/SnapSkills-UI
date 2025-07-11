
'use client';

import * as React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCourse, Course, Lesson } from '@/lib/courses';
import { getUsers, User } from '@/lib/users';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  Users,
  CheckCircle,
  BarChart2,
  Clock,
  BookOpen,
  Edit,
  Copy,
  Trash2,
  FileJson,
  Eye,
  EyeOff,
  Save,
  PlusCircle,
  GripVertical,
  BookMarked,
  Settings,
} from 'lucide-react';

export default function AdminCourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData || null);

        if (courseData) {
          const allUsers = await getUsers();
          setUsers(allUsers.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch course data:', error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (course === null) {
    return notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/course-management">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {course.title}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Course</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Course Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Enrollments</CardDescription>
                        <CardTitle className="text-4xl">1,250</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">+25% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Completions</CardDescription>
                        <CardTitle className="text-4xl">573</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">+10% from last month</div>
                      </CardContent>
                    </Card>
                     <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Completion Rate</CardDescription>
                        <CardTitle className="text-4xl">45.8%</CardTitle>
                      </CardHeader>
                       <CardContent>
                        <div className="text-xs text-muted-foreground">-2% from last month</div>
                      </CardContent>
                    </Card>
                     <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Avg. Time</CardDescription>
                        <CardTitle className="text-4xl">3h 15m</CardTitle>
                      </CardHeader>
                       <CardContent>
                        <div className="text-xs text-muted-foreground">vs. 3h 30m plan</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
               <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Learner Progress</CardTitle>
                  <CardDescription>Showing top 5 learners in this course.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Learner</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar} alt="Avatar" />
                                    <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                                <Progress value={user.progress} className="w-32 h-2" />
                                <span className="text-sm text-muted-foreground">{user.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                              <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="content">
                 <Card className="mt-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>Organize sections and lessons for this course.</CardDescription>
                        </div>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add Section</Button>
                    </CardHeader>
                    <CardContent>
                       <Accordion type="multiple" defaultValue={['section1']} className="w-full">
                          {course.sections?.map(section => (
                            <AccordionItem value={section.sectionId} key={section.sectionId}>
                              <AccordionTrigger className="font-bold text-lg hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    {section.title}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pl-8">
                                <div className="space-y-2">
                                {section.lessons.map(lesson => (
                                    <Card key={lesson.lessonId}>
                                        <CardContent className="p-3 flex items-center justify-between">
                                            <div className='flex items-center gap-2'>
                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                                <p>{lesson.title}</p>
                                                <Badge variant="outline">{lesson.type}</Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">Edit</Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4"/></Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                 <Button variant="outline" className="w-full mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Add Lesson</Button>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                    </CardContent>
                 </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Course Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Button><Edit className="mr-2 h-4 w-4" />Edit Info</Button>
                <Button variant="outline"><Copy className="mr-2 h-4 w-4" />Clone Course</Button>
                <Button variant="outline"><FileJson className="mr-2 h-4 w-4" />Export JSON</Button>
                <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Delete Course</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <CardTitle>Course Settings</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6">
               <div className="grid gap-3">
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="publish-switch" defaultChecked={true} />
                    <Label htmlFor="publish-switch" className="flex items-center gap-2 text-sm font-normal">
                        <Eye className="h-4 w-4" /> Published
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="beta-switch" />
                    <Label htmlFor="beta-switch" className="text-sm font-normal">Mark as Beta</Label>
                  </div>
               </div>
               <div className="grid gap-3">
                  <Label htmlFor="content-version">Content Version</Label>
                  <Input id="content-version" defaultValue="v1.2.0" />
              </div>
              <div className="grid gap-3">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input id="slug" defaultValue={`/courses/${course.courseId.replace('course_', '')}`} />
              </div>
              <div className="grid gap-3">
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input id="seo-title" defaultValue={course.title} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Course</Button>
      </div>
    </main>
  );
}
