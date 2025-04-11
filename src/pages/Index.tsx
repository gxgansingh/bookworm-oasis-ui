
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Stats from '@/components/Stats';
import SearchBar from '@/components/SearchBar';
import BookGrid from '@/components/BookGrid';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookProps } from '@/components/BookCard';

// Mock data for the dashboard
const recentlyAddedBooks: BookProps[] = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
    status: 'available',
    category: 'Fiction'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Self-Help'
  },
  {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop',
    status: 'available',
    category: 'Memoir'
  },
  {
    id: 4,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop',
    status: 'reserved',
    category: 'Sci-Fi'
  }
];

const popularBooks: BookProps[] = [
  {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?q=80&w=387&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Sci-Fi'
  },
  {
    id: 6,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=891&auto=format&fit=crop',
    status: 'available',
    category: 'Classic'
  },
  {
    id: 7,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=774&auto=format&fit=crop',
    status: 'available',
    category: 'Classic'
  },
  {
    id: 8,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=870&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Non-Fiction'
  }
];

const Index: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Librarian</p>
          </div>
          <SearchBar />
        </div>
        
        <Stats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Books Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recent">Recently Added</TabsTrigger>
                  <TabsTrigger value="popular">Popular Books</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="pt-6">
                  <BookGrid books={recentlyAddedBooks} columns={2} />
                </TabsContent>
                <TabsContent value="popular" className="pt-6">
                  <BookGrid books={popularBooks} columns={2} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-sm">Book Title {i}</h4>
                      <p className="text-xs text-gray-500">Borrowed by: User {i}</p>
                      <p className="text-xs text-amber-600 mt-1">Due in {i} day{i !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
