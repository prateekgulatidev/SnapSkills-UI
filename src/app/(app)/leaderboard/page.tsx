
'use client';

import * as React from 'react';
import { getLeaderboardUsers, LeaderboardUser } from '@/lib/leaderboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy, Zap, Diamond, Shield, Lock, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function LeaderboardRow({ user }: { user: LeaderboardUser }) {
  let rankIcon;
  if (user.rank === 1) {
    rankIcon = <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-400" />;
  } else if (user.rank === 2) {
    rankIcon = <Medal className="w-5 h-5 text-gray-400 fill-gray-300" />;
  } else if (user.rank === 3) {
    rankIcon = <Medal className="w-5 h-5 text-yellow-700 fill-yellow-800" />;
  } else {
    rankIcon = <span className="text-sm font-bold w-5 text-center">{user.rank}</span>;
  }

  return (
    <div
      className={`flex items-center p-3 rounded-lg ${
        user.isCurrentUser ? 'bg-primary/10 border border-primary/50' : ''
      }`}
    >
      <div className="w-10 flex justify-center">{rankIcon}</div>
      <div className="flex items-center gap-3 flex-1 ml-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt="Avatar" data-ai-hint="person portrait" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-sm">{user.name}</p>
      </div>
      <div className="flex items-center gap-1 font-bold text-sm text-primary">
        <Zap className="w-4 h-4" />
        {user.xp.toLocaleString()}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
    const [users, setUsers] = React.useState<LeaderboardUser[]>([]);
    const [currentUser, setCurrentUser] = React.useState<LeaderboardUser | null>(null);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getLeaderboardUsers();
            const sortedUsers = allUsers.sort((a,b) => a.rank - b.rank);
            setUsers(sortedUsers.filter(u => !u.isCurrentUser));
            setCurrentUser(sortedUsers.find(u => u.isCurrentUser) || null);
        };
        fetchUsers();
    }, []);

    const userXP = currentUser?.xp || 0;
    const isLeaderboardLocked = userXP < 100;

    if (isLeaderboardLocked) {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-12 h-12 text-muted-foreground/30" />
                    <Shield className="w-16 h-16 text-muted-foreground/50" />
                    <Lock className="w-20 h-20 text-muted-foreground p-4 bg-muted rounded-full" />
                    <Shield className="w-16 h-16 text-muted-foreground/50" />
                    <Shield className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <h2 className="text-xl font-bold">Reach 100 XP to unlock leaderboards!</h2>
                <p className="text-muted-foreground mt-2">Complete more lessons to start competing.</p>
                 <Button asChild className="mt-6">
                    <Link href="/learn">Start Learning</Link>
                </Button>
            </div>
        )
    }

  return (
    <div className="flex h-full">
        <main className="flex-1 p-6 overflow-y-auto">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Leaderboard</h1>
                <p className="text-muted-foreground">See how you rank against other learners this week.</p>
            </header>
            <div className="space-y-2">
                {users.map((user) => (
                    <LeaderboardRow key={user.id} user={user} />
                ))}
                {currentUser && (
                    <>
                        <div className="flex justify-center items-center py-4">
                            <div className="w-1/4 border-t"></div>
                        </div>
                        <LeaderboardRow user={currentUser} />
                    </>
                )}
            </div>
        </main>
        <aside className="hidden md:block w-[350px] p-6 space-y-6 border-l shrink-0">
             <div className="flex items-center justify-around p-2 rounded-lg bg-muted/50">
                 <div className="flex flex-col items-center gap-1 text-orange-500 font-bold">
                    <Flame className="w-6 h-6" />
                    <span>5</span>
                    <span className="text-xs font-medium text-muted-foreground">Streak</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-yellow-500 font-bold">
                    <Zap className="w-6 h-6 fill-yellow-400" />
                    <span>{userXP.toLocaleString()}</span>
                    <span className="text-xs font-medium text-muted-foreground">XP</span>
                </div>
                 <div className="flex flex-col items-center gap-1 text-blue-500 font-bold">
                    <Diamond className="w-6 h-6 fill-blue-400" />
                    <span>12</span>
                    <span className="text-xs font-medium text-muted-foreground">Gems</span>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2"/>
                    <CardTitle>Do lessons. Earn XP. Compete.</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">
                        Earn XP through coding challenges and quizzes, then compete with other learners in a weekly leaderboard.
                    </p>
                </CardContent>
            </Card>
             <div className="text-center text-xs text-muted-foreground space-y-2">
                <div className="flex justify-center gap-4">
                    <Link href="#" className="hover:text-primary">About</Link>
                    <Link href="#" className="hover:text-primary">Certifications</Link>
                    <Link href="#" className="hover:text-primary">Businesses</Link>
                    <Link href="#" className="hover:text-primary">Blog</Link>
                    <Link href="#" className="hover:text-primary">Contact</Link>
                </div>
                <div className="flex justify-center gap-4">
                    <Link href="#" className="hover:text-primary">Privacy</Link>
                    <Link href="#" className="hover:text-primary">Terms</Link>
                </div>
            </div>
        </aside>
    </div>
  );
}
