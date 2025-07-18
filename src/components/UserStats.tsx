
'use client';

import { Flame, Zap, Battery } from "lucide-react";

interface UserStatsProps {
    charge: number;
    streak: number;
    xp: number;
}

export function UserStats({ charge, streak, xp }: UserStatsProps) {
    return (
        <div className="flex items-center justify-around p-2 rounded-lg bg-muted/50">
            <div className="flex flex-col items-center gap-1 text-green-500 font-bold">
                <Battery className="w-6 h-6" />
                <span>{charge}%</span>
                <span className="text-xs font-medium text-muted-foreground">Charge</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-orange-500 font-bold">
                <Flame className="w-6 h-6" />
                <span>{streak}</span>
                <span className="text-xs font-medium text-muted-foreground">Streak</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-yellow-500 font-bold">
                <Zap className="w-6 h-6 fill-yellow-400" />
                <span>{xp.toLocaleString()}</span>
                <span className="text-xs font-medium text-muted-foreground">XP</span>
            </div>
        </div>
    );
}
