
import React from 'react';
import { Check, CornerDownLeft, Clock } from 'lucide-react';

interface TransactionTypeIconProps {
  type: string;
}

const TransactionTypeIcon: React.FC<TransactionTypeIconProps> = ({ type }) => {
  switch (type) {
    case 'checkout':
      return <CornerDownLeft className="h-4 w-4 text-amber-600" />;
    case 'return':
      return <Check className="h-4 w-4 text-green-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export default TransactionTypeIcon;
