
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockTransactions } from '@/data/transactionData';
import TransactionHeader from '@/components/transactions/TransactionHeader';
import TransactionStats from '@/components/transactions/TransactionStats';
import TransactionTable from '@/components/transactions/TransactionTable';
import TransactionFilters from '@/components/transactions/TransactionFilters';

const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.bookId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberId.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by tab
    const matchesTab = 
      currentTab === 'all' || 
      (currentTab === 'active' && transaction.status === 'active') ||
      (currentTab === 'completed' && transaction.status === 'completed') ||
      (currentTab === 'overdue' && transaction.status === 'overdue');
      
    return matchesSearch && matchesTab;
  });

  // Count stats
  const totalTransactions = mockTransactions.length;
  const activeCheckouts = mockTransactions.filter(t => t.status === 'active').length;
  const overdueItems = mockTransactions.filter(t => t.status === 'overdue').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TransactionHeader />
        
        <TransactionStats 
          totalTransactions={totalTransactions}
          activeCheckouts={activeCheckouts}
          overdueItems={overdueItems}
        />
        
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <TransactionFilters 
              onSearch={setSearchQuery}
              onTabChange={setCurrentTab}
              currentTab={currentTab}
            />
          </CardHeader>
          <CardContent>
            <TransactionTable transactions={filteredTransactions} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
