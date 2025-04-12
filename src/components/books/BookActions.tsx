
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, BookOpen, Share } from 'lucide-react';

type BookActionsProps = {
  status: string;
};

const BookActions: React.FC<BookActionsProps> = ({ status }) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-5">
      <h3 className="font-medium text-lg border-b pb-2">Actions</h3>
      
      <Button className="w-full flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        {status === 'available' ? 'Issue Book' : 'Return Book'}
      </Button>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-1" 
          disabled={status !== 'available'}
        >
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </div>
      
      <Button variant="secondary" className="w-full flex items-center gap-2">
        <Share className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default BookActions;
