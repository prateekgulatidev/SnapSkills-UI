
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl">Admin Panel</CardTitle>
                <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full h-11 text-base" asChild>
                    <Link href="/admin/dashboard">Login</Link>
                </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
