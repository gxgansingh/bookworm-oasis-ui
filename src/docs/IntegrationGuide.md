
# Frontend-Backend Integration Guide

## Overview
This document explains how to connect the React frontend to the C backend for your DBMS project. 

## Configuration

### Development Mode
During development, the application uses mock data from `src/utils/bookUtils.ts`. This allows you to develop and test the UI without requiring the C backend to be running.

### Production Mode
For the actual project presentation, follow these steps to connect to the real MySQL database through the C backend:

1. Compile and run the C backend server (see `CBackendImplementation.md`)
2. Update the API base URL in `src/utils/api.ts` if your server is running on a different port/host
3. Modify `src/pages/BookDetails.tsx` to use the API instead of mock data

## Implementation Steps

### 1. Update BookDetails.tsx

To switch from mock data to the real API:

```typescript
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookDetailsLayout from '@/components/books/BookDetailsLayout';
import { getBookDetailsFromAPI } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookDetailsFromAPI(id || "1"),
  });
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p>Loading book details...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !book) {
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
```

### 2. Update Other Components

Similar modifications would be needed for other data-fetching components like Books.tsx, Members.tsx, etc.

## Data Flow

1. User navigates to a page in the React application
2. React component makes API call using functions from `src/utils/api.ts`
3. C backend receives the request and processes it
4. C backend executes SQL queries on the MySQL database
5. Database returns data to C backend
6. C backend formats the response as JSON and sends it back to the React frontend
7. React component updates its state with the received data
8. UI renders the updated data

## Error Handling

The integration includes error handling at multiple levels:
- Frontend API functions catch and log errors
- React Query provides loading and error states
- Components conditionally render based on data availability
- C backend returns appropriate error messages and HTTP status codes
