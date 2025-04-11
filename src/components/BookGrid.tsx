
import React from 'react';
import BookCard, { BookProps } from './BookCard';

interface BookGridProps {
  books: BookProps[];
  columns?: 2 | 3 | 4 | 5;
}

const BookGrid: React.FC<BookGridProps> = ({ books, columns = 4 }) => {
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6`}>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
};

export default BookGrid;
