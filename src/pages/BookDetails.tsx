
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookProps } from '@/components/BookCard';
import { ArrowLeft } from 'lucide-react';
import BookDetailsHeader from '@/components/books/BookDetailsHeader';
import BookActions from '@/components/books/BookActions';
import BookDetailsTab from '@/components/books/BookDetailsTab';
import BorrowingHistoryTab from '@/components/books/BorrowingHistoryTab';

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
        
        <div className="grid grid-cols-1 gap-8">
          <BookDetailsHeader 
            title={book.title}
            author={book.author}
            status={book.status}
            category={book.category}
          />
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <BookActions status={book.status} />
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="details">Book Details</TabsTrigger>
                  <TabsTrigger value="history">Borrowing History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <BookDetailsTab
                    description={book.description}
                    publisher={book.publisher}
                    publishedDate={book.publishedDate}
                    pages={book.pages}
                    language={book.language}
                    status={book.status}
                  />
                </TabsContent>
                
                <TabsContent value="history" className="pt-6">
                  <BorrowingHistoryTab 
                    borrowingHistory={book.borrowingHistory}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookDetails;
