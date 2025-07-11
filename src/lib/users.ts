
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'User' | 'Admin';
    progress: number;
    lastActivity: string;
    joinDate: string;
}

const usersData: User[] = [
    {
        id: 'user-1',
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'Admin',
        progress: 85,
        lastActivity: '3 hours ago',
        joinDate: '2024-07-10',
    },
    {
        id: 'user-2',
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 45,
        lastActivity: '1 day ago',
        joinDate: '2024-07-09',
    },
    {
        id: 'user-3',
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 100,
        lastActivity: '2 days ago',
        joinDate: '2024-07-09',
    },
    {
        id: 'user-4',
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 12,
        lastActivity: '5 days ago',
        joinDate: '2024-07-08',
    },
    {
        id: 'user-5',
        name: 'Leo Patel',
        email: 'leo.patel@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 72,
        lastActivity: '1 week ago',
        joinDate: '2024-07-07',
    },
     {
        id: 'user-6',
        name: 'Ava Williams',
        email: 'ava.williams@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 92,
        lastActivity: '2 hours ago',
        joinDate: '2024-07-11',
    },
     {
        id: 'user-7',
        name: 'Noah Brown',
        email: 'noah.brown@email.com',
        avatar: 'https://placehold.co/100x100.png',
        role: 'User',
        progress: 30,
        lastActivity: 'yesterday',
        joinDate: '2024-07-10',
    }
];

// Simulate API delay
const fakeApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUsers(): Promise<User[]> {
  await fakeApiDelay(50); // Simulate network latency
  return JSON.parse(JSON.stringify(usersData));
}

export async function getUser(userId: string): Promise<User | undefined> {
  await fakeApiDelay(50);
  const user = usersData.find(u => u.id === userId);
  return user ? JSON.parse(JSON.stringify(user)) : undefined;
}
