
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from '@/components/SearchBar';

interface TransactionFiltersProps {
  onSearch: (query: string) => void;
  onTabChange: (value: string) => void;
  currentTab: string;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ 
  onSearch, 
  onTabChange,
  currentTab 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <SearchBar 
        placeholder="Search transactions..." 
        onSearch={onSearch}
      />
      <Tabs value={currentTab} className="mt-4" onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TransactionFilters;
