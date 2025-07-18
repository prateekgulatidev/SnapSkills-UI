export interface LeaderboardUser {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    xp: number;
    isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardUser[] = [
    { id: 'user-7', rank: 1, name: 'Noah Brown', avatar: 'https://placehold.co/100x100.png', xp: 2450 },
    { id: 'user-1', rank: 2, name: 'Olivia Martin', avatar: 'https://placehold.co/100x100.png', xp: 2300 },
    { id: 'user-6', rank: 3, name: 'Ava Williams', avatar: 'https://placehold.co/100x100.png', xp: 2100 },
    { id: 'user-3', rank: 4, name: 'Isabella Nguyen', avatar: 'https://placehold.co/100x100.png', xp: 1980 },
    { id: 'user-5', rank: 5, name: 'Leo Patel', avatar: 'https://placehold.co/100x100.png', xp: 1800 },
    { id: 'user-2', rank: 6, name: 'Jackson Lee', avatar: 'https://placehold.co/100x100.png', xp: 1650 },
    { id: 'user-4', rank: 7, name: 'Sofia Davis', avatar: 'https://placehold.co/100x100.png', xp: 1500 },
    { id: 'user-8', rank: 8, name: 'Liam Garcia', avatar: 'https://placehold.co/100x100.png', xp: 1350 },
    { id: 'user-9', rank: 9, name: 'Emma Martinez', avatar: 'https://placehold.co/100x100.png', xp: 1200 },
    { id: 'user-10', rank: 10, name: 'James Rodriguez', avatar: 'https://placehold.co/100x100.png', xp: 1050 },
];

const currentUserData: LeaderboardUser = {
    id: 'current-user',
    rank: 25,
    name: 'prateekgulati333',
    avatar: 'https://placehold.co/100x100.png',
    xp: 120,
    isCurrentUser: true,
}

// Simulate API delay
const fakeApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getLeaderboardUsers(): Promise<LeaderboardUser[]> {
  await fakeApiDelay(50);
  return JSON.parse(JSON.stringify([...leaderboardData, currentUserData]));
}
