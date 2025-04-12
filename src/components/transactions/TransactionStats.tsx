
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TransactionStatsProps {
  totalTransactions: number;
  activeCheckouts: number;
  overdueItems: number;
}

const TransactionStats: React.FC<TransactionStatsProps> = ({ 
  totalTransactions, 
  activeCheckouts, 
  overdueItems 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Total Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalTransactions}</div>
          <p className="text-gray-500 text-sm">All time</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Active Checkouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{activeCheckouts}</div>
          <p className="text-gray-500 text-sm">Books currently checked out</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-heading">Overdue Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">{overdueItems}</div>
          <p className="text-gray-500 text-sm">Require attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStats;
