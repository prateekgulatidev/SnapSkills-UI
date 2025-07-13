
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleLeft, Server, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminSettingsPage() {
    const [isQuizzesEnabled, setIsQuizzesEnabled] = React.useState(true);
    const [isLeaderboardEnabled, setIsLeaderboardEnabled] = React.useState(false);
    const [useCDN, setUseCDN] = React.useState(false);
    const [theme, setTheme] = React.useState('theme-default');
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        const storedTheme = localStorage.getItem('theme-color') || 'theme-default';
        setTheme(storedTheme);
        
        const isDark = document.documentElement.classList.contains('dark');
        document.documentElement.className = '';
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
        if (storedTheme !== 'theme-default') {
          document.documentElement.classList.add(storedTheme);
        }
    }, []);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme-color', newTheme);
        
        const isDark = document.documentElement.classList.contains('dark');
        
        const themeClasses = ['theme-default', 'theme-growth', 'theme-focus', 'theme-momentum'];
        document.documentElement.classList.remove(...themeClasses);

        if(isDark) document.documentElement.classList.add('dark');

        if (newTheme !== 'theme-default') {
          document.documentElement.classList.add(newTheme);
        }
    };

    if (!isMounted) {
      return null;
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <ToggleLeft className="h-6 w-6" />
                            <CardTitle>Feature Flags</CardTitle>
                        </div>
                        <CardDescription>Enable or disable major features across the application.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="quizzes-toggle" className="font-medium">Enable Quizzes Globally</Label>
                                <p className="text-xs text-muted-foreground">Turn off all quizzes if there's an issue.</p>
                            </div>
                            <Switch
                                id="quizzes-toggle"
                                checked={isQuizzesEnabled}
                                onCheckedChange={setIsQuizzesEnabled}
                            />
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="leaderboard-toggle" className="font-medium">Enable Leaderboard</Label>
                                <p className="text-xs text-muted-foreground">Show the competitive leaderboard to users.</p>
                            </div>
                            <Switch
                                id="leaderboard-toggle"
                                checked={isLeaderboardEnabled}
                                onCheckedChange={setIsLeaderboardEnabled}
                            />
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                         <div className="flex items-center gap-3">
                            <Server className="h-6 w-6" />
                            <CardTitle>Asset Management</CardTitle>
                        </div>
                        <CardDescription>Configure how assets like images and videos are delivered.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="cdn-toggle" className="font-medium">Use Content Delivery Network (CDN)</Label>
                                <p className="text-xs text-muted-foreground">Serve assets from a global CDN for faster load times.</p>
                            </div>
                            <Switch
                                id="cdn-toggle"
                                checked={useCDN}
                                onCheckedChange={setUseCDN}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cdn-path">CDN Asset Path</Label>
                            <div className="flex items-center gap-4">
                                <Input id="cdn-path" placeholder="https://cdn.example.com/assets" className="max-w-md" disabled={!useCDN}/>
                                <Button disabled={!useCDN}>Update Path</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <div className="flex items-center gap-3">
                            <Palette className="h-6 w-6" />
                            <CardTitle>Theme Settings</CardTitle>
                        </div>
                        <CardDescription>Set the global color theme for the application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme-select" className="font-medium">Application Theme</Label>
                            <Select value={theme} onValueChange={handleThemeChange}>
                                <SelectTrigger className="w-[280px]">
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

            </div>
        </main>
    );
}
