
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface BookProps {
  id: number;
  title: string;
  author: string;
  status: string;
  category: string;
  coverImage?: string; // Made optional
}

const BookCard: React.FC<BookProps> = ({ id, title, author, status, category }) => {
  return (
    <Link to={`/books/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold line-clamp-2 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm mb-2">{author}</p>
            <p className="text-gray-500 text-xs mb-4">{category}</p>
            
            <div className="mt-auto">
              {status === 'available' ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Available
                </Badge>
              ) : status === 'borrowed' ? (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  Borrowed
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Reserved
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
