
import React from 'react';
import { Filter, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TransactionHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">Manage book checkouts, returns, and reservations</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>
    </div>
  );
};

export default TransactionHeader;
