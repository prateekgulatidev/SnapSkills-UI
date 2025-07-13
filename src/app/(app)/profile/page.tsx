'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, CheckCircle, Edit, LogOut, Moon, Sun, Palette } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const completedCourses = [
  { id: 1, title: 'HTML & CSS Basics' },
  { id: 2, title: 'Intro to UX Design' },
]

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('theme-default');

  useEffect(() => {
    // Handle dark mode
    const storedThemeMode = localStorage.getItem('theme-mode');
    if (storedThemeMode === 'dark' || (!storedThemeMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    // Handle color theme
    const storedTheme = localStorage.getItem('theme-color') || 'theme-default';
    setTheme(storedTheme);
    document.documentElement.className = '';
    document.documentElement.classList.add(storedTheme);
    if (storedThemeMode === 'dark') {
      document.documentElement.classList.add('dark');
    }

  }, []);

  const toggleThemeMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme-color', newTheme);
    
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.className = ''; // Clear all classes
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    if (newTheme !== 'theme-default') {
      document.documentElement.classList.add(newTheme);
    }
  };
  
  return (
    <div className="p-4 space-y-6 pb-20">
      <header className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person portrait" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Alex Doe</h1>
          <p className="text-muted-foreground">alex.doe@example.com</p>
        </div>
      </header>

      <Card>
        <CardContent className="p-4 flex justify-around text-center">
          <div>
            <Flame className="w-6 h-6 mx-auto text-orange-500" />
            <p className="font-bold text-lg">5</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div>
            <CheckCircle className="w-6 h-6 mx-auto text-primary" />
            <p className="font-bold text-lg">{completedCourses.length}</p>
            <p className="text-xs text-muted-foreground">Courses Done</p>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-bold mb-4">Completed Courses</h2>
        <div className="space-y-2">
          {completedCourses.map(course => (
            <Card key={course.id}>
              <CardContent className="p-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <span className="font-medium">{course.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
        <Card className="mt-4">
          <CardContent className="p-4 flex items-center justify-between">
            <Label htmlFor="dark-mode-toggle" className="flex items-center gap-2 cursor-pointer">
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Dark Mode</span>
            </Label>
            <Switch id="dark-mode-toggle" checked={isDarkMode} onCheckedChange={toggleThemeMode} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
             <div className="flex items-center justify-between">
                <Label htmlFor="theme-select" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Color Theme</span>
                </Label>
                 <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="theme-default">Default</SelectItem>
                        <SelectItem value="theme-growth">Growth</SelectItem>
                        <SelectItem value="theme-focus">Focus</SelectItem>
                        <SelectItem value="theme-momentum">Momentum</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>
        <Button variant="destructive" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
