
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

type BookActionsProps = {
  status: string;
};

const BookActions: React.FC<BookActionsProps> = ({ status }) => {
  return (
    <div className="mt-6 space-y-4">
      <Button className="w-full">
        {status === 'available' ? 'Issue Book' : 'Return Book'}
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" className="flex-1" disabled={status !== 'available'}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BookActions;
