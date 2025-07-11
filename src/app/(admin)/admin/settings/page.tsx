
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Manage your application settings here. This section is under construction.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">More settings will be available soon.</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
