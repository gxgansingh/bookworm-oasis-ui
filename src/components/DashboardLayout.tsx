
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Bookworm Library Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
