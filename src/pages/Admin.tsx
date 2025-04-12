import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { BookPlus, BookOpen, UserPlus, UserMinus, Trash2, Edit, MoreVertical, Check, X, Search } from 'lucide-react';

// Mock data for books
const allBooks = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    status: 'available',
    category: 'Fiction',
    publishedDate: '2020-08-13',
    description: 'Between life and death there is a library...'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'borrowed',
    category: 'Self-Help',
    publishedDate: '2018-10-16',
    description: 'No matter your goals, Atomic Habits offers a proven framework...'
  },
  {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    status: 'available',
    category: 'Memoir',
    publishedDate: '2018-02-20',
    description: 'Born to survivalists in the mountains of Idaho...'
  },
  {
    id: 4,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    status: 'reserved',
    category: 'Sci-Fi',
    publishedDate: '2021-05-04',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission...'
  },
  {
    id: 5,
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'borrowed',
    category: 'Sci-Fi',
    publishedDate: '1965-08-01',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides...'
  },
];

// Mock data for members
const allMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    joinDate: '2024-01-15',
    status: 'active',
    borrowedBooks: 3
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    joinDate: '2024-02-20',
    status: 'active',
    borrowedBooks: 1
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '(555) 234-5678',
    joinDate: '2024-03-05',
    status: 'inactive',
    borrowedBooks: 0
  },
];

// Mock data for transactions
const allTransactions = [
  {
    id: 1,
    type: 'checkout',
    date: '2024-03-15',
    memberId: 1,
    memberName: 'John Doe',
    bookId: 2,
    bookTitle: 'Atomic Habits',
    dueDate: '2024-04-15',
    status: 'active'
  },
  {
    id: 2,
    type: 'return',
    date: '2024-03-12',
    memberId: 2,
    memberName: 'Jane Smith',
    bookId: 5,
    bookTitle: 'Dune',
    dueDate: '2024-04-12',
    status: 'completed'
  },
];

const Admin: React.FC = () => {
  const [books, setBooks] = useState(allBooks);
  const [members, setMembers] = useState(allMembers);
  const [transactions, setTransactions] = useState(allTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  
  // New book form state
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    publishedDate: '',
    description: ''
  });
  
  // New member form state
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Issue book form state
  const [issueBook, setIssueBook] = useState({
    bookId: '',
    memberId: '',
    dueDate: ''
  });
  
  // Return book form state
  const [returnBook, setReturnBook] = useState({
    transactionId: ''
  });
  
  // Handle book search
  const handleBookSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setBooks(allBooks);
      return;
    }
    
    const filtered = allBooks.filter(
      book => 
        book.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
        book.author.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    
    setBooks(filtered);
  };
  
  // Handle member search
  const handleMemberSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setMembers(allMembers);
      return;
    }
    
    const filtered = allMembers.filter(
      member => 
        member.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
        member.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.phone.includes(e.target.value)
    );
    
    setMembers(filtered);
  };
  
  // Handle transaction search
  const handleTransactionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setTransactions(allTransactions);
      return;
    }
    
    const filtered = allTransactions.filter(
      transaction => 
        transaction.memberName.toLowerCase().includes(e.target.value.toLowerCase()) || 
        transaction.bookTitle.toLowerCase().includes(e.target.value.toLowerCase())
    );
    
    setTransactions(filtered);
  };
  
  // Handle book form change
  const handleBookFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle book category change
  const handleBookCategoryChange = (value: string) => {
    setNewBook({
      ...newBook,
      category: value
    });
  };
  
  // Add a new book
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const book = {
      id: allBooks.length + 1,
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
      publishedDate: newBook.publishedDate,
      description: newBook.description,
      status: 'available'
    };
    
    setBooks([...books, book]);
    setBookDialogOpen(false);
    setNewBook({
      title: '',
      author: '',
      category: '',
      publishedDate: '',
      description: ''
    });
    
    toast.success("Book added successfully");
  };
  
  // Handle member form change
  const handleMemberFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value
    });
  };
  
  // Add a new member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const member = {
      id: allMembers.length + 1,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      borrowedBooks: 0
    };
    
    setMembers([...members, member]);
    setMemberDialogOpen(false);
    setNewMember({
      name: '',
      email: '',
      phone: ''
    });
    
    toast.success("Member added successfully");
  };
  
  // Handle issue book form change
  const handleIssueFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueBook({
      ...issueBook,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle issue book select change
  const handleIssueSelectChange = (field: string, value: string) => {
    setIssueBook({
      ...issueBook,
      [field]: value
    });
  };
  
  // Issue a book to member
  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedBook = allBooks.find(book => book.id.toString() === issueBook.bookId);
    const selectedMember = allMembers.find(member => member.id.toString() === issueBook.memberId);
    
    if (!selectedBook || !selectedMember) {
      toast.error("Please select valid book and member");
      return;
    }
    
    const transaction = {
      id: allTransactions.length + 1,
      type: 'checkout',
      date: new Date().toISOString().split('T')[0],
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      dueDate: issueBook.dueDate,
      status: 'active'
    };
    
    setTransactions([...transactions, transaction]);
    setIssueDialogOpen(false);
    setIssueBook({
      bookId: '',
      memberId: '',
      dueDate: ''
    });
    
    toast.success("Book issued successfully");
  };
  
  // Handle return book form change
  const handleReturnFormChange = (value: string) => {
    setReturnBook({
      transactionId: value
    });
  };
  
  // Return a book
  const handleReturnBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionIndex = transactions.findIndex(
      transaction => transaction.id.toString() === returnBook.transactionId
    );
    
    if (transactionIndex === -1) {
      toast.error("Please select a valid transaction");
      return;
    }
    
    const updatedTransactions = [...transactions];
    updatedTransactions[transactionIndex] = {
      ...updatedTransactions[transactionIndex],
      type: 'return',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions(updatedTransactions);
    setReturnDialogOpen(false);
    setReturnBook({
      transactionId: ''
    });
    
    toast.success("Book returned successfully");
  };
  
  // Delete a book
  const handleDeleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
    toast.success("Book deleted successfully");
  };
  
  // Delete a member
  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Member deleted successfully");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage books, members, and transactions</p>
        </div>
        
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          {/* Books Tab */}
          <TabsContent value="books" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={handleBookSearch}
                />
              </div>
              
              <div className="flex gap-2">
                <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <BookPlus className="mr-2 h-4 w-4" />
                      Add Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Book</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new book.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddBook}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Book title"
                            value={newBook.title}
                            onChange={handleBookFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="author">Author</Label>
                          <Input
                            id="author"
                            name="author"
                            placeholder="Author name"
                            value={newBook.author}
                            onChange={handleBookFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={newBook.category} 
                            onValueChange={handleBookCategoryChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fiction">Fiction</SelectItem>
                              <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                              <SelectItem value="Fantasy">Fantasy</SelectItem>
                              <SelectItem value="Self-Help">Self-Help</SelectItem>
                              <SelectItem value="Memoir">Memoir</SelectItem>
                              <SelectItem value="Classic">Classic</SelectItem>
                              <SelectItem value="Dystopian">Dystopian</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="publishedDate">Published Date</Label>
                          <Input
                            id="publishedDate"
                            name="publishedDate"
                            type="date"
                            value={newBook.publishedDate}
                            onChange={handleBookFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Book description"
                            value={newBook.description}
                            onChange={handleBookFormChange}
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Book</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Issue Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Issue Book</DialogTitle>
                      <DialogDescription>
                        Select book and member to issue.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleIssueBook}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="bookId">Book</Label>
                          <Select 
                            value={issueBook.bookId} 
                            onValueChange={(value) => handleIssueSelectChange('bookId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a book" />
                            </SelectTrigger>
                            <SelectContent>
                              {allBooks
                                .filter(book => book.status === 'available')
                                .map(book => (
                                  <SelectItem key={book.id} value={book.id.toString()}>
                                    {book.title} by {book.author}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="memberId">Member</Label>
                          <Select 
                            value={issueBook.memberId} 
                            onValueChange={(value) => handleIssueSelectChange('memberId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a member" />
                            </SelectTrigger>
                            <SelectContent>
                              {allMembers
                                .filter(member => member.status === 'active')
                                .map(member => (
                                  <SelectItem key={member.id} value={member.id.toString()}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={issueBook.dueDate}
                            onChange={handleIssueFormChange}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Issue Book</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Check className="mr-2 h-4 w-4" />
                      Return Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Return Book</DialogTitle>
                      <DialogDescription>
                        Select an active transaction to return a book.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleReturnBook}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="transactionId">Transaction</Label>
                          <Select 
                            value={returnBook.transactionId} 
                            onValueChange={handleReturnFormChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a transaction" />
                            </SelectTrigger>
                            <SelectContent>
                              {allTransactions
                                .filter(transaction => transaction.status === 'active')
                                .map(transaction => (
                                  <SelectItem key={transaction.id} value={transaction.id.toString()}>
                                    {transaction.bookTitle} - {transaction.memberName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Return Book</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{book.description}</TableCell>
                      <TableCell>
                        {book.status === 'available' ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Available
                          </Badge>
                        ) : book.status === 'borrowed' ? (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            Borrowed
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Reserved
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteBook(book.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={handleMemberSearch}
                />
              </div>
              
              <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new member.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMember}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Member name"
                          value={newMember.name}
                          onChange={handleMemberFormChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email address"
                          value={newMember.email}
                          onChange={handleMemberFormChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Phone number"
                          value={newMember.phone}
                          onChange={handleMemberFormChange}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Member</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {member.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteMember(member.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <BookOpen className="mr-2 h-4 w-4" />
                              View Borrowed Books
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={handleTransactionSearch}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        {transaction.type === 'checkout' ? (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Checkout
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Return
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.memberName}</TableCell>
                      <TableCell>{transaction.bookTitle}</TableCell>
                      <TableCell>{new Date(transaction.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {transaction.status === 'active' ? (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
