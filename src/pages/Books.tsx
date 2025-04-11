
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SearchBar from '@/components/SearchBar';
import BookGrid from '@/components/BookGrid';
import { Button } from '@/components/ui/button';
import { BookProps } from '@/components/BookCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Filter } from 'lucide-react';

// Mock data for books page
const allBooks: BookProps[] = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
    status: 'available',
    category: 'Fiction'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Self-Help'
  },
  {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop',
    status: 'available',
    category: 'Memoir'
  },
  {
    id: 4,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop',
    status: 'reserved',
    category: 'Sci-Fi'
  },
  {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1531072901881-d644216d4bf9?q=80&w=387&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Sci-Fi'
  },
  {
    id: 6,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=891&auto=format&fit=crop',
    status: 'available',
    category: 'Classic'
  },
  {
    id: 7,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=774&auto=format&fit=crop',
    status: 'available',
    category: 'Classic'
  },
  {
    id: 8,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=870&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Non-Fiction'
  },
  {
    id: 9,
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=870&auto=format&fit=crop',
    status: 'available',
    category: 'Dystopian'
  },
  {
    id: 10,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=829&auto=format&fit=crop',
    status: 'reserved',
    category: 'Fiction'
  },
  {
    id: 11,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    coverImage: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=388&auto=format&fit=crop',
    status: 'borrowed',
    category: 'Fantasy'
  },
  {
    id: 12,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=435&auto=format&fit=crop',
    status: 'available',
    category: 'Fantasy'
  }
];

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookProps[]>(allBooks);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSearch = (query: string) => {
    if (!query) {
      setBooks(allBooks);
      return;
    }
    
    const filtered = allBooks.filter(
      book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    setBooks(filtered);
  };
  
  const handleFilterChange = () => {
    let filtered = [...allBooks];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }
    
    setBooks(filtered);
  };
  
  React.useEffect(() => {
    handleFilterChange();
  }, [statusFilter, categoryFilter]);
  
  const categories = Array.from(new Set(allBooks.map(book => book.category)));
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Books</h1>
            <p className="text-gray-500 mt-1">Manage your library collection</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new book to your library.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" placeholder="Book title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input id="author" placeholder="Author name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isbn" className="text-right">
                    ISBN
                  </Label>
                  <Input id="isbn" placeholder="ISBN number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category || ''}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea id="description" placeholder="Book description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cover" className="text-right">
                    Cover URL
                  </Label>
                  <Input id="cover" placeholder="Cover image URL" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Book</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex items-center gap-2 ml-auto">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500 mr-2">Filter:</span>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category || ''}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {books.length > 0 ? (
          <BookGrid books={books} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Books;
