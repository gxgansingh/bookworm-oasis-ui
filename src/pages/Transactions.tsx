
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Clock, CornerDownLeft, Filter, Plus, Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

// Temporary mock data - would be fetched from API in a real application
const mockTransactions = [
  {
    id: 1, 
    type: 'checkout',
    bookTitle: 'The Great Gatsby',
    bookId: 'BK001',
    memberName: 'John Doe',
    memberId: 'M001',
    date: '2025-04-10',
    dueDate: '2025-04-24',
    status: 'active'
  },
  {
    id: 2,
    type: 'return',
    bookTitle: 'To Kill a Mockingbird',
    bookId: 'BK002',
    memberName: 'Jane Smith',
    memberId: 'M002',
    date: '2025-04-09',
    returnDate: '2025-04-11',
    status: 'completed'
  },
  {
    id: 3,
    type: 'checkout',
    bookTitle: '1984',
    bookId: 'BK003',
    memberName: 'Michael Johnson',
    memberId: 'M003',
    date: '2025-04-05',
    dueDate: '2025-04-19',
    status: 'overdue'
  },
  {
    id: 4,
    type: 'checkout',
    bookTitle: 'Pride and Prejudice',
    bookId: 'BK004',
    memberName: 'Sarah Williams',
    memberId: 'M004',
    date: '2025-04-08',
    dueDate: '2025-04-22',
    status: 'active'
  },
  {
    id: 5,
    type: 'return',
    bookTitle: 'The Hobbit',
    bookId: 'BK005',
    memberName: 'David Brown',
    memberId: 'M005',
    date: '2025-04-01',
    returnDate: '2025-04-08',
    status: 'completed'
  },
];

const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.bookId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberId.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by tab
    const matchesTab = 
      currentTab === 'all' || 
      (currentTab === 'active' && transaction.status === 'active') ||
      (currentTab === 'completed' && transaction.status === 'completed') ||
      (currentTab === 'overdue' && transaction.status === 'overdue');
      
    return matchesSearch && matchesTab;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkout':
        return <CornerDownLeft className="h-4 w-4 text-amber-600" />;
      case 'return':
        return <Check className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-500 text-sm mt-1">Manage book checkouts, returns, and reservations</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockTransactions.length}</div>
              <p className="text-gray-500 text-sm">All time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Active Checkouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockTransactions.filter(t => t.status === 'active').length}</div>
              <p className="text-gray-500 text-sm">Books currently checked out</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Overdue Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{mockTransactions.filter(t => t.status === 'overdue').length}</div>
              <p className="text-gray-500 text-sm">Require attention</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg font-heading">Recent Transactions</CardTitle>
              <SearchBar 
                placeholder="Search transactions..." 
                onSearch={(query) => setSearchQuery(query)}
              />
            </div>
            <Tabs defaultValue="all" className="mt-4" onValueChange={setCurrentTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">Type</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due/Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-center">
                          {getTypeIcon(transaction.type)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transaction.bookTitle}</div>
                          <div className="text-sm text-gray-500">{transaction.bookId}</div>
                        </TableCell>
                        <TableCell>
                          <div>{transaction.memberName}</div>
                          <div className="text-sm text-gray-500">{transaction.memberId}</div>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          {transaction.type === 'checkout' ? transaction.dueDate : transaction.returnDate}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
