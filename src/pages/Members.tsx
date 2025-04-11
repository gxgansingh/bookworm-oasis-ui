
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreVertical, UserCheck, UserX } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for members
const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    joinDate: '2024-01-15',
    status: 'active',
    borrowedBooks: 3
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    joinDate: '2024-02-20',
    status: 'active',
    borrowedBooks: 1
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '(555) 234-5678',
    joinDate: '2024-03-05',
    status: 'inactive',
    borrowedBooks: 0
  },
  {
    id: 4,
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    phone: '(555) 345-6789',
    joinDate: '2024-02-10',
    status: 'active',
    borrowedBooks: 2
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 456-7890',
    joinDate: '2024-01-25',
    status: 'active',
    borrowedBooks: 0
  }
];

const Members: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-500 mt-1">Manage library members</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar placeholder="Search for members..." />
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Books Borrowed</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {member.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          <UserX className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{member.borrowedBooks}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Member</DropdownMenuItem>
                          <DropdownMenuItem>View Borrowed Books</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Member</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Members;
