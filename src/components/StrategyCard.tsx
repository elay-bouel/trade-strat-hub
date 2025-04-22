
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from "react-router-dom";

interface StrategyCardProps {
  id: string;
  name: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  performance: {
    month: number;
    year: number;
    allTime: number;
  };
  subscribers: number;
  price: number;
  chartData: { value: number }[];
  risk: 'Low' | 'Medium' | 'High';
  category: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({
  id,
  name,
  description,
  creator,
  performance,
  subscribers,
  price,
  chartData,
  risk,
  category
}) => {
  const isPositive = performance.month >= 0;
  const badgeClass = isPositive ? 'badge-profit' : 'badge-loss';
  const performanceClass = isPositive ? 'profit-text' : 'loss-text';
  const monthlyChange = `${isPositive ? '+' : ''}${performance.month.toFixed(2)}%`;
  
  // Color for chart
  const lineColor = isPositive ? '#4CAF93' : '#FF6B6B';
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <span className={badgeClass}>{monthlyChange} (1M)</span>
              <span className="text-xs text-muted-foreground">{category}</span>
              <span className="text-xs text-muted-foreground">Risk: {risk}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${price}/mo</p>
            <p className="text-xs text-muted-foreground">{subscribers} subscribers</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow">
        <div className="h-16 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  border: 'none', 
                  borderRadius: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)' 
                }} 
                labelStyle={{ display: 'none' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <img src={creator.avatar} alt={creator.name} />
          </Avatar>
          <span className="text-xs font-medium">{creator.name}</span>
        </div>
        <Link 
          to={`/strategy/${id}`} 
          className="text-sm font-medium text-primary hover:underline"
        >
          View Strategy →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StrategyCard;
