
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface TransactionStatusBadgeProps {
  status: string;
}

const TransactionStatusBadge: React.FC<TransactionStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case 'overdue':
      return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
  }
};

export default TransactionStatusBadge;
