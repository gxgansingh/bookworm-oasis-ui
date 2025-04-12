
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookProps } from '@/components/BookCard';

type BookDetailsHeaderProps = {
  title: string;
  author: string;
  status: string;
  category?: string;
};

const BookDetailsHeader: React.FC<BookDetailsHeaderProps> = ({
  title,
  author,
  status,
  category,
}) => {
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
  
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Badge className={getStatusColor(status)}>
          {statusLabel}
        </Badge>
        {category && (
          <Badge variant="outline">
            {category}
          </Badge>
        )}
      </div>
      
      <h1 className="text-3xl font-bold font-heading">{title}</h1>
      <p className="text-lg text-gray-600 mt-1">by {author}</p>
    </div>
  );
};

export default BookDetailsHeader;
