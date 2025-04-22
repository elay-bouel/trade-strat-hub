
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  status: 'WIN' | 'LOSS';
}

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h3 className="font-medium">Recent Trades</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead className="text-right">Profit/Loss</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <Badge variant={trade.type === 'BUY' ? "default" : "outline"}>
                    {trade.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">${trade.entryPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">{trade.entryDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">${trade.exitPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">{trade.exitDate}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className={trade.profit >= 0 ? 'profit-text' : 'loss-text'}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={trade.status === 'WIN' ? 'badge-profit' : 'badge-loss'}>
                    {trade.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TradeHistory;
