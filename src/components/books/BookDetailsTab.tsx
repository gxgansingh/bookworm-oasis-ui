
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BookMetadata from './BookMetadata';

type BookDetailsTabProps = {
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  status: string;
};

const BookDetailsTab: React.FC<BookDetailsTabProps> = ({
  description,
  publisher,
  publishedDate,
  pages,
  language,
  status,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-gray-700">{description}</p>
          
          <BookMetadata
            publisher={publisher}
            publishedDate={publishedDate}
            pages={pages}
            language={language}
            status={status}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookDetailsTab;
