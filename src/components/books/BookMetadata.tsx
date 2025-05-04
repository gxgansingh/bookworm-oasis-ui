
import React from 'react';
import { Book, Calendar, BookOpen, Globe, AlertCircle, BookText } from 'lucide-react';

type BookMetadataProps = {
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  status: string;
  isbn?: string;
};

const BookMetadataItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | number }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
    <div className="text-library-600 mt-0.5">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-gray-600">{value || 'Not available'}</p>
    </div>
  </div>
);

const BookMetadata: React.FC<BookMetadataProps> = ({
  publisher,
  publishedDate,
  pages,
  language,
  status,
  isbn,
}) => {
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BookMetadataItem 
        icon={<Book className="h-5 w-5" />}
        label="Publisher"
        value={publisher}
      />
      
      <BookMetadataItem
        icon={<Calendar className="h-5 w-5" />}
        label="Publication Date"
        value={publishedDate}
      />
      
      <BookMetadataItem
        icon={<BookOpen className="h-5 w-5" />}
        label="Pages"
        value={pages}
      />
      
      <BookMetadataItem
        icon={<Globe className="h-5 w-5" />}
        label="Language"
        value={language}
      />
      
      <BookMetadataItem
        icon={<AlertCircle className="h-5 w-5" />}
        label="Status"
        value={statusLabel}
      />

      <BookMetadataItem
        icon={<BookText className="h-5 w-5" />}
        label="ISBN"
        value={isbn}
      />
    </div>
  );
};

export default BookMetadata;
