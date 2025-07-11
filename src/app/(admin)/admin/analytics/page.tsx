
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, Users, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

const userActivityData = [
  { date: '2024-06-12', users: 150 },
  { date: '2024-06-13', users: 165 },
  { date: '2024-06-14', users: 180 },
  { date: '2024-06-15', users: 175 },
  { date: '2024-06-16', users: 200 },
  { date: '2024-06-17', users: 210 },
  { date: '2024-06-18', users: 220 },
  { date: '2024-06-19', users: 205 },
  { date: '2024-06-20', users: 230 },
  { date: '2024-06-21', users: 245 },
  { date: '2024-06-22', users: 240 },
  { date: '2024-06-23', users: 260 },
  { date: '2024-06-24', users: 275 },
  { date: '2024-06-25', users: 280 },
  { date: '2024-06-26', users: 270 },
  { date: '2024-06-27', users: 290 },
  { date: '2024-06-28', users: 300 },
  { date: '2024-06-29', users: 295 },
  { date: '2024-06-30', users: 310 },
  { date: '2024-07-01', users: 320 },
  { date: '2024-07-02', users: 315 },
  { date: '2024-07-03', users: 330 },
  { date: '2024-07-04', users: 340 },
  { date: '2024-07-05', users: 335 },
  { date: '2024-07-06', users: 350 },
  { date: '2024-07-07', users: 360 },
  { date: '2024-07-08', users: 355 },
  { date: '2024-07-09', users: 370 },
  { date: '2024-07-10', users: 380 },
  { date: '2024-07-11', users: 375 },
];

const topCoursesData = [
  { name: 'Python Basics', completions: 254 },
  { name: 'Java Basics', completions: 127 },
  { name: 'Intro to UX', completions: 98 },
  { name: 'Web Dev 101', completions: 76 },
  { name: 'Data Science Intro', completions: 55 },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,832</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62.5%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">893</div>
            <p className="text-xs text-muted-foreground">-2.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Course</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Python Basics</div>
            <p className="text-xs text-muted-foreground">Highest enrollments this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Daily active users over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(str) => {
                    const date = new Date(str);
                    if (date.getDate() % 7 === 0) {
                        return (date.getMonth() + 1) + '/' + date.getDate();
                    }
                    return '';
                }}/>
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>Most completed courses of all time.</CardDescription>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCoursesData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={80} fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip cursor={{fill: 'hsl(var(--muted))'}}/>
                <Bar dataKey="completions" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
