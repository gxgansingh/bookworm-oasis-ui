
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-library-800"
            >
              <path
                d="M6.5 18V3C6.5 3 8 2 12 2C16 2 17.5 3 17.5 3V18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 11C17.5 11 16 10 12 10C8 10 6.5 11 6.5 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 21C6.5 19.8954 7.39543 19 8.5 19H15.5C16.6046 19 17.5 19.8954 17.5 21C17.5 22.1046 16.6046 23 15.5 23H8.5C7.39543 23 6.5 22.1046 6.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="font-heading font-bold text-xl text-library-900">Bookworm</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium text-sm ${isActive('/') ? 'text-library-800 border-b-2 border-library-700 pb-1' : 'text-gray-500 hover:text-library-600'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/books" 
              className={`font-medium text-sm ${isActive('/books') ? 'text-library-800 border-b-2 border-library-700 pb-1' : 'text-gray-500 hover:text-library-600'}`}
            >
              Books
            </Link>
            <Link 
              to="/members" 
              className={`font-medium text-sm ${isActive('/members') ? 'text-library-800 border-b-2 border-library-700 pb-1' : 'text-gray-500 hover:text-library-600'}`}
            >
              Members
            </Link>
            <Link 
              to="/transactions" 
              className={`font-medium text-sm ${isActive('/transactions') ? 'text-library-800 border-b-2 border-library-700 pb-1' : 'text-gray-500 hover:text-library-600'}`}
            >
              Transactions
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 pt-4 border-t">
          <Link 
            to="/" 
            className={`block font-medium text-sm ${isActive('/') ? 'text-library-800' : 'text-gray-500'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/books" 
            className={`block font-medium text-sm ${isActive('/books') ? 'text-library-800' : 'text-gray-500'}`}
          >
            Books
          </Link>
          <Link 
            to="/members" 
            className={`block font-medium text-sm ${isActive('/members') ? 'text-library-800' : 'text-gray-500'}`}
          >
            Members
          </Link>
          <Link 
            to="/transactions" 
            className={`block font-medium text-sm ${isActive('/transactions') ? 'text-library-800' : 'text-gray-500'}`}
          >
            Transactions
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
