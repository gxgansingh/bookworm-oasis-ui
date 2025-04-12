
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookDetailsLayout, { BookDetailsType } from '@/components/books/BookDetailsLayout';

// Mock data moved into a separate file for cleaner main component
import { getBookDetails } from '@/utils/bookUtils';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const book = getBookDetails(id || "1");
  
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
      <BookDetailsLayout book={book} />
    </DashboardLayout>
  );
};

export default BookDetails;
