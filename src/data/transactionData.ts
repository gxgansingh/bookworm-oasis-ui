
export interface Transaction {
  id: number;
  type: string;
  bookTitle: string;
  bookId: string;
  memberName: string;
  memberId: string;
  date: string;
  dueDate?: string;
  returnDate?: string;
  status: string;
}

// Mock data - would be fetched from API in a real application
export const mockTransactions: Transaction[] = [
  {
    id: 1, 
    type: 'checkout',
    bookTitle: 'The Great Gatsby',
    bookId: 'BK001',
    memberName: 'John Doe',
    memberId: 'M001',
    date: '2025-04-10',
    dueDate: '2025-04-24',
    status: 'active'
  },
  {
    id: 2,
    type: 'return',
    bookTitle: 'To Kill a Mockingbird',
    bookId: 'BK002',
    memberName: 'Jane Smith',
    memberId: 'M002',
    date: '2025-04-09',
    returnDate: '2025-04-11',
    status: 'completed'
  },
  {
    id: 3,
    type: 'checkout',
    bookTitle: '1984',
    bookId: 'BK003',
    memberName: 'Michael Johnson',
    memberId: 'M003',
    date: '2025-04-05',
    dueDate: '2025-04-19',
    status: 'overdue'
  },
  {
    id: 4,
    type: 'checkout',
    bookTitle: 'Pride and Prejudice',
    bookId: 'BK004',
    memberName: 'Sarah Williams',
    memberId: 'M004',
    date: '2025-04-08',
    dueDate: '2025-04-22',
    status: 'active'
  },
  {
    id: 5,
    type: 'return',
    bookTitle: 'The Hobbit',
    bookId: 'BK005',
    memberName: 'David Brown',
    memberId: 'M005',
    date: '2025-04-01',
    returnDate: '2025-04-08',
    status: 'completed'
  },
];
