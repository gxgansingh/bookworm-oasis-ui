
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface BookProps {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  status: 'available' | 'borrowed' | 'reserved';
  category?: string;
}

const BookCard: React.FC<BookProps> = ({ id, title, author, coverImage, status, category }) => {
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
    <Link to={`/books/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative pt-[120%] overflow-hidden">
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="absolute top-0 left-0 w-full h-full object-cover book-cover-shadow book-hover-effect"
          />
          
          {category && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              {category}
            </Badge>
          )}
          
          <Badge 
            className={`absolute bottom-3 right-3 ${getStatusColor(status)}`}
          >
            {statusLabel}
          </Badge>
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="font-heading font-medium text-base line-clamp-2">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{author}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
