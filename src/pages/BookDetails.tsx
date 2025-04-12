import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookProps } from '@/components/BookCard';
import { ArrowLeft, Edit, Trash, BookOpen, User, Calendar } from 'lucide-react';

const mockBooks: Record<string, BookProps & { 
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  description?: string;
  borrowingHistory?: Array<{
    id: number;
    memberName: string;
    borrowDate: string;
    returnDate: string | null;
  }>;
}> = {
  "1": {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    status: 'available',
    category: 'Fiction',
    publisher: 'Viking',
    publishedDate: '2020-08-13',
    pages: 304,
    language: 'English',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Jane Smith',
        borrowDate: '2025-01-15',
        returnDate: '2025-02-15'
      },
      {
        id: 2,
        memberName: 'John Doe',
        borrowDate: '2024-11-10',
        returnDate: '2024-12-10'
      },
      {
        id: 3,
        memberName: 'Alice Johnson',
        borrowDate: '2024-09-05',
        returnDate: '2024-10-02'
      }
    ]
  },
  "2": {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'borrowed',
    category: 'Self-Help',
    publisher: 'Avery',
    publishedDate: '2018-10-16',
    pages: 320,
    language: 'English',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Robert Johnson',
        borrowDate: '2025-03-01',
        returnDate: null
      }
    ]
  },
  "3": {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    status: 'available',
    category: 'Memoir',
    publisher: 'Random House',
    publishedDate: '2018-02-20',
    pages: 352,
    language: 'English',
    description: 'Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara\'s older brothers became violent.',
    borrowingHistory: []
  },
  "4": {
    id: 4,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    status: 'reserved',
    category: 'Sci-Fi',
    publisher: 'Ballantine Books',
    publishedDate: '2021-05-04',
    pages: 496,
    language: 'English',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Michael Lee',
        borrowDate: '2024-12-15',
        returnDate: '2025-01-15'
      }
    ]
  },
  "5": {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?q=80&w=387&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Sci-Fi',
    publisher: 'Ace',
    publishedDate: '1965-08-01',
    pages: 896,
    language: 'English',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...',
    borrowingHistory: [
      {
        id: 1,
        memberName: 'Emily Chen',
        borrowDate: '2025-03-20',
        returnDate: null
      },
      {
        id: 2,
        memberName: 'Michael Johnson',
        borrowDate: '2025-01-15',
        returnDate: '2025-02-15'
      },
      {
        id: 3,
        memberName: 'Sarah Miller',
        borrowDate: '2024-10-10',
        returnDate: '2024-11-09'
      }
    ]
  }
};

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const book = mockBooks[id || "1"];
  
  if (!book) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Book not found</h1>
          <p className="mt-2 text-gray-500">The book you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link to="/books">Go back to books</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'borrowed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'reserved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const statusLabel = book.status.charAt(0).toUpperCase() + book.status.slice(1);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/books">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Book Details</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="mt-6 space-y-4">
              <Button className="w-full">
                {book.status === 'available' ? 'Issue Book' : 'Return Book'}
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="flex-1" disabled={book.status !== 'available'}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getStatusColor(book.status)}>
                  {statusLabel}
                </Badge>
                {book.category && (
                  <Badge variant="outline">
                    {book.category}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold font-heading">{book.title}</h1>
              <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Book Details</TabsTrigger>
                <TabsTrigger value="history">Borrowing History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <p className="text-gray-700">{book.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <User className="h-5 w-5 text-library-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Publisher</p>
                            <p className="text-sm text-gray-600">{book.publisher}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-library-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Publication Date</p>
                            <p className="text-sm text-gray-600">{book.publishedDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-library-600 mt-0.5"
                          >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium">Pages</p>
                            <p className="text-sm text-gray-600">{book.pages}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-library-600 mt-0.5"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium">Language</p>
                            <p className="text-sm text-gray-600">{book.language}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-library-600 mt-0.5"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 7h10" />
                            <path d="M7 12h10" />
                            <path d="M7 17h10" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm text-gray-600">{statusLabel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="pt-6">
                <Card>
                  <CardContent className="p-6">
                    {book.borrowingHistory && book.borrowingHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Member</th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Borrow Date</th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Return Date</th>
                              <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {book.borrowingHistory.map((record) => (
                              <tr key={record.id} className="border-b last:border-0">
                                <td className="py-3 px-4 text-sm">{record.memberName}</td>
                                <td className="py-3 px-4 text-sm">{record.borrowDate}</td>
                                <td className="py-3 px-4 text-sm">{record.returnDate || '-'}</td>
                                <td className="py-3 px-4 text-sm">
                                  {record.returnDate ? (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      Returned
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                      Borrowed
                                    </Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No borrowing history available for this book.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookDetails;
