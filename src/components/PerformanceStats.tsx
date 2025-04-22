
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface PerformanceStatsProps {
  month: number;
  year: number;
  allTime: number;
  winRate: number;
  averageTrade: number;
  maxDrawdown: number;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  month,
  year,
  allTime,
  winRate,
  averageTrade,
  maxDrawdown
}) => {
  const renderStat = (title: string, value: number, isPercentage: boolean = true, isDollar: boolean = false) => {
    const isPositive = value >= 0;
    const formattedValue = isPercentage 
      ? `${isPositive ? '+' : ''}${value.toFixed(2)}%` 
      : isDollar 
        ? `${isPositive ? '+$' : '-$'}${Math.abs(value).toFixed(2)}` 
        : value.toFixed(2);
    
    return (
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="flex items-center">
          {isPositive ? (
            <ArrowUpIcon className="h-3 w-3 text-profit mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-loss mr-1" />
          )}
          <span className={isPositive ? 'profit-text text-base' : 'loss-text text-base'}>
            {formattedValue}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {renderStat('1 Month', month)}
          {renderStat('1 Year', year)}
          {renderStat('All Time', allTime)}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {renderStat('Win Rate', winRate)}
          {renderStat('Avg. Trade', averageTrade, false, true)}
          {renderStat('Max Drawdown', maxDrawdown)}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
