
import React from 'react';
import { User, Calendar } from 'lucide-react';

type BookMetadataProps = {
  publisher?: string;
  publishedDate?: string;
  pages?: number;
  language?: string;
  status: string;
};

const BookMetadata: React.FC<BookMetadataProps> = ({
  publisher,
  publishedDate,
  pages,
  language,
  status,
}) => {
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start gap-2">
        <User className="h-5 w-5 text-library-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Publisher</p>
          <p className="text-sm text-gray-600">{publisher}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <Calendar className="h-5 w-5 text-library-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Publication Date</p>
          <p className="text-sm text-gray-600">{publishedDate}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-library-600 mt-0.5"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
        <div>
          <p className="text-sm font-medium">Pages</p>
          <p className="text-sm text-gray-600">{pages}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-library-600 mt-0.5"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <div>
          <p className="text-sm font-medium">Language</p>
          <p className="text-sm text-gray-600">{language}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-library-600 mt-0.5"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
        <div>
          <p className="text-sm font-medium">Status</p>
          <p className="text-sm text-gray-600">{statusLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default BookMetadata;
