
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  indicator?: 'up' | 'down' | 'neutral';
  change?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  indicator, 
  change 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {indicator && change && (
          <p className={`text-xs mt-1 ${
            indicator === 'up' 
              ? 'text-green-500' 
              : indicator === 'down' 
                ? 'text-red-500' 
                : 'text-muted-foreground'
          }`}>
            {indicator === 'up' ? '↑' : indicator === 'down' ? '↓' : '→'} {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardKPIProps {
  kpis: KPICardProps[];
}

const DashboardKPI: React.FC<DashboardKPIProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default DashboardKPI;
