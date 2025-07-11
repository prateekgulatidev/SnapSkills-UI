
'use client';

import * as React from 'react';
import { getUsers, User } from "@/lib/users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [roleFilter, setRoleFilter] = React.useState<string>("All");

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setAllUsers(fetchedUsers);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  React.useEffect(() => {
    if (roleFilter === "All") {
      setUsers(allUsers);
    } else {
      setUsers(allUsers.filter(user => user.role === roleFilter));
    }
  }, [roleFilter, allUsers]);

  const roles = ["All", "Admin", "User"];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by Role
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {roles.map(role => (
                      <DropdownMenuCheckboxItem
                        key={role}
                        checked={roleFilter === role}
                        onSelect={() => setRoleFilter(role)}
                      >
                        {role}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>Add User</Button>
            </div>
        </div>
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden lg:table-cell">Progress</TableHead>
                    <TableHead className="hidden md:table-cell">Last Seen</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar} alt="Avatar" data-ai-hint="person portrait" />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                                {user.role}
                            </Badge>
                        </TableCell>
                         <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                                <Progress value={user.progress} className="h-2 w-24" />
                                <span className="text-sm text-muted-foreground">{user.progress}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.lastActivity}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset Progress</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </main>
  );
}
