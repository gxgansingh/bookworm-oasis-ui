
import React from 'react';
import { Book, Users, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendLabel }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {trend !== undefined && (
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend >= 0 ? '+' : ''}{trend}%
                </span>
                <span className="text-xs text-gray-500 ml-1">{trendLabel}</span>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-library-50 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Books"
        value="2,845"
        icon={<Book className="h-6 w-6 text-library-700" />}
        trend={8}
        trendLabel="vs last month"
      />
      <StatCard
        title="Active Members"
        value="1,257"
        icon={<Users className="h-6 w-6 text-library-700" />}
        trend={12}
        trendLabel="vs last month"
      />
      <StatCard
        title="Books Borrowed"
        value="328"
        icon={<BookOpen className="h-6 w-6 text-library-700" />}
        trend={-3}
        trendLabel="vs last month"
      />
      <StatCard
        title="Overdue Books"
        value="24"
        icon={<Clock className="h-6 w-6 text-library-700" />}
        trend={5}
        trendLabel="vs last month"
      />
    </div>
  );
};

export default Stats;
