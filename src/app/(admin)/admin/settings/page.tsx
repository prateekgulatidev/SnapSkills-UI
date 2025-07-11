
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleLeft, Server } from 'lucide-react';

export default function AdminSettingsPage() {
    const [isQuizzesEnabled, setIsQuizzesEnabled] = React.useState(true);
    const [isLeaderboardEnabled, setIsLeaderboardEnabled] = React.useState(false);
    const [useCDN, setUseCDN] = React.useState(false);

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

            </div>
        </main>
    );
}
