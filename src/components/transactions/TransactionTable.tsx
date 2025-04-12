
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TransactionTypeIcon from './TransactionTypeIcon';
import TransactionStatusBadge from './TransactionStatusBadge';

interface Transaction {
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

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">Type</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due/Return Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-center">
                  <TransactionTypeIcon type={transaction.type} />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{transaction.bookTitle}</div>
                  <div className="text-sm text-gray-500">{transaction.bookId}</div>
                </TableCell>
                <TableCell>
                  <div>{transaction.memberName}</div>
                  <div className="text-sm text-gray-500">{transaction.memberId}</div>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  {transaction.type === 'checkout' ? transaction.dueDate : transaction.returnDate}
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge status={transaction.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
