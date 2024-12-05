import React from 'react';
import { Users, UserCheck, Calendar, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="Total Patients"
        value="1,234"
        icon={<Users className="w-6 h-6 text-blue-600" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Patients"
        value="892"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Appointments Today"
        value="28"
        icon={<Calendar className="w-6 h-6 text-purple-600" />}
      />
      <StatsCard
        title="Pending Appointments"
        value="15"
        icon={<Clock className="w-6 h-6 text-orange-600" />}
      />
    </div>
  );
}