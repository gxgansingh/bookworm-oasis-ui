
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type BorrowingRecord = {
  id: number;
  memberName: string;
  borrowDate: string;
  returnDate: string | null;
};

type BorrowingHistoryTabProps = {
  borrowingHistory?: BorrowingRecord[];
};

const BorrowingHistoryTab: React.FC<BorrowingHistoryTabProps> = ({
  borrowingHistory = [],
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        {borrowingHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Member</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Borrow Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Return Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowingHistory.map((record) => (
                  <tr key={record.id} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm">{record.memberName}</td>
                    <td className="py-3 px-4 text-sm">{record.borrowDate}</td>
                    <td className="py-3 px-4 text-sm">{record.returnDate || '-'}</td>
                    <td className="py-3 px-4 text-sm">
                      {record.returnDate ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Returned
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Borrowed
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No borrowing history available for this book.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BorrowingHistoryTab;
