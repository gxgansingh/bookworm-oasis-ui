
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import BookDetailsHeader from '@/components/books/BookDetailsHeader';
import BookActions from '@/components/books/BookActions';
import BookDetailsTab from '@/components/books/BookDetailsTab';
import BorrowingHistoryTab from '@/components/books/BorrowingHistoryTab';

export type BookDetailsType = {
  id: number;
  title: string;
  author: string;
  status: string;
  category?: string;
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
};

type BookDetailsLayoutProps = {
  book: BookDetailsType;
};

const BookDetailsLayout: React.FC<BookDetailsLayoutProps> = ({ book }) => {
  return (
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
  );
};

export default BookDetailsLayout;
