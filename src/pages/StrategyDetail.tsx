
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CircleUser, Eye, Star, Users, DollarSign } from "lucide-react";
import PerformanceStats from "@/components/PerformanceStats";
import TradeHistory from "@/components/TradeHistory";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const strategyData = {
  id: "1",
  name: "Momentum Master",
  description: "A momentum-based strategy that follows strong market trends with strict risk management rules. This algorithm identifies strong directional momentum across multiple timeframes and enters trades in the direction of the dominant trend. Dynamic stop-loss and take-profit levels are adjusted based on market volatility.",
  longDescription: `This strategy is based on the principle that assets in motion tend to stay in motion, capitalizing on the momentum effect observed in financial markets. The algorithm uses a multi-timeframe analysis approach to identify and confirm strong directional trends.

Key features:
• Multi-timeframe momentum confirmation using Moving Averages and RSI
• Volume-weighted entry timing to maximize favorable price action
• Dynamic position sizing based on volatility measurements
• Trailing stop-loss mechanism that adapts to changing market conditions
• Automated take-profit targets based on recent market structure

The strategy primarily trades during the most active market hours to ensure adequate liquidity and follows a set of strict risk management rules, never risking more than 2% of the account balance on any single trade.`,
  creator: {
    id: "creator1",
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?img=1",
    verified: true,
    activeSince: "Jan 2021",
    strategies: 4,
    subscribers: 712
  },
  performance: {
    month: 4.2,
    year: 27.8,
    allTime: 68.5,
    winRate: 67.5,
    averageTrade: 1.25,
    maxDrawdown: -8.4,
    sharpeRatio: 1.8,
    monthlySince2023: [
      { month: "Jan", value: 2.4 },
      { month: "Feb", value: -1.2 },
      { month: "Mar", value: 3.7 },
      { month: "Apr", value: 2.1 },
      { month: "May", value: 4.5 },
      { month: "Jun", value: 1.8 },
      { month: "Jul", value: -0.9 },
      { month: "Aug", value: 5.3 },
      { month: "Sep", value: 3.2 },
      { month: "Oct", value: -1.4 },
      { month: "Nov", value: 4.2 },
      { month: "Dec", value: 2.8 },
      { month: "Jan", value: 3.1 },
      { month: "Feb", value: 4.8 },
      { month: "Mar", value: 2.6 },
      { month: "Apr", value: 4.2 }
    ]
  },
  equityCurve: Array.from({ length: 365 }, (_, i) => {
    const randomChange = Math.random() * 0.5 - 0.1;
    const trendComponent = i * 0.07;
    const cyclicalComponent = Math.sin(i / 30) * 3;
    return { 
      day: i + 1, 
      value: 10000 * (1 + (trendComponent + randomChange + cyclicalComponent) / 100) 
    };
  }),
  trades: [
    {
      id: "t1",
      symbol: "EURUSD",
      type: "BUY" as const,
      entryDate: "2023-04-15",
      exitDate: "2023-04-17",
      entryPrice: 1.0925,
      exitPrice: 1.0978,
      profit: 0.48,
      status: "WIN" as const
    },
    {
      id: "t2",
      symbol: "GBPJPY",
      type: "SELL" as const,
      entryDate: "2023-04-12",
      exitDate: "2023-04-13",
      entryPrice: 167.35,
      exitPrice: 166.89,
      profit: 0.27,
      status: "WIN" as const
    },
    {
      id: "t3",
      symbol: "AUDUSD",
      type: "BUY" as const,
      entryDate: "2023-04-10",
      exitDate: "2023-04-11",
      entryPrice: 0.6618,
      exitPrice: 0.6592,
      profit: -0.39,
      status: "LOSS" as const
    },
    {
      id: "t4",
      symbol: "USDJPY",
      type: "SELL" as const,
      entryDate: "2023-04-07",
      exitDate: "2023-04-10",
      entryPrice: 131.85,
      exitPrice: 130.58,
      profit: 0.96,
      status: "WIN" as const
    },
    {
      id: "t5",
      symbol: "USDCAD",
      type: "BUY" as const,
      entryDate: "2023-04-05",
      exitDate: "2023-04-06",
      entryPrice: 1.3452,
      exitPrice: 1.3519,
      profit: 0.50,
      status: "WIN" as const
    }
  ],
  price: 29.99,
  subscribers: 347,
  risk: "Medium" as const,
  category: "Forex",
  tags: ["momentum", "trend-following", "multi-timeframe", "forex"],
  markets: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "GBPJPY"],
  timeframes: ["1H", "4H", "Daily"],
  reviewScore: 4.7,
  reviewCount: 58,
  requirements: {
    minBalance: "$1,000",
    brokers: ["Oanda", "FXCM", "IG", "Pepperstone"],
    execution: "Automated via API"
  }
};

// CustomTooltip component for the charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">{`${payload[0].payload.month || 'Day ' + label}`}</p>
        <p className={`text-sm ${payload[0].value >= 0 ? 'profit-text' : 'loss-text'}`}>
          {payload[0].name}: {payload[0].value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

const EquityTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">Day {label}</p>
        <p className="text-sm font-medium">
          ${Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const StrategyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  // This would normally fetch data based on the ID
  const strategy = strategyData;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Strategy Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {strategy.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Risk: {strategy.risk}
              </Badge>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                <span className="text-xs font-medium">{strategy.reviewScore}</span>
                <span className="text-xs text-muted-foreground ml-1">({strategy.reviewCount})</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{strategy.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <img src={strategy.creator.avatar} alt={strategy.creator.name} />
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{strategy.creator.name}</span>
                    {strategy.creator.verified && (
                      <Badge className="ml-2 bg-blue-500 hover:bg-blue-600 text-[10px] h-4">Verified</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Creator since {strategy.creator.activeSince}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <CircleUser className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm">{strategy.creator.strategies} strategies</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm">{strategy.creator.subscribers} subscribers</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-sm">{strategy.subscribers} active subscribers</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-sm">2.3k views</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-4 w-full md:w-auto">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subscription Price</span>
                <span className="text-2xl font-bold">${strategy.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
              </div>
              
              <Button className="w-full mb-3">
                Subscribe Now <DollarSign className="h-4 w-4 ml-1" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                30-day performance guarantee or your money back
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trades">Trade History</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">Strategy Description</h3>
                    <p className="whitespace-pre-line text-gray-700">
                      {strategy.longDescription}
                    </p>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Markets</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.markets.map((market, i) => (
                          <Badge key={i} variant="outline">{market}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Timeframes</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.timeframes.map((timeframe, i) => (
                          <Badge key={i} variant="outline">{timeframe}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">#{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-4">Monthly Performance</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={strategy.performance.monthlySince2023}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`} 
                            domain={['dataMin - 1', 'dataMax + 1']}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            name="Return" 
                            stroke="#4CAF93" 
                            strokeWidth={2} 
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-8">
                <PerformanceStats 
                  month={strategy.performance.month}
                  year={strategy.performance.year}
                  allTime={strategy.performance.allTime}
                  winRate={strategy.performance.winRate}
                  averageTrade={strategy.performance.averageTrade}
                  maxDrawdown={strategy.performance.maxDrawdown}
                />
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-4">Technical Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                        <span className="font-medium">{strategy.performance.sharpeRatio.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Profit Factor</span>
                        <span className="font-medium">1.87</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Recovery Factor</span>
                        <span className="font-medium">3.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg. Holding Time</span>
                        <span className="font-medium">2.3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trades per Month</span>
                        <span className="font-medium">12.5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Equity Curve</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Starting with $10,000 investment (simulated performance)
                    </p>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={strategy.equityCurve}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4CAF93" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#4CAF93" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" />
                        <YAxis 
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                          domain={[10000, 'dataMax + 1000']} 
                        />
                        <Tooltip content={<EquityTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#4CAF93" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          strokeWidth={2} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-4">Monthly Returns</h3>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={strategy.performance.monthlySince2023}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`} 
                            domain={['dataMin - 1', 'dataMax + 1']}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            name="Return" 
                            stroke="#4CAF93" 
                            strokeWidth={2} 
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-8">
                  <PerformanceStats 
                    month={strategy.performance.month}
                    year={strategy.performance.year}
                    allTime={strategy.performance.allTime}
                    winRate={strategy.performance.winRate}
                    averageTrade={strategy.performance.averageTrade}
                    maxDrawdown={strategy.performance.maxDrawdown}
                  />
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm mb-4">Advanced Metrics</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                            <span className="font-medium">{strategy.performance.sharpeRatio.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Sortino Ratio</span>
                            <span className="font-medium">2.14</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Calmar Ratio</span>
                            <span className="font-medium">1.92</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Profit Factor</span>
                            <span className="font-medium">1.87</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Recovery Factor</span>
                            <span className="font-medium">3.2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Standard Deviation</span>
                            <span className="font-medium">4.2%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trades">
            <TradeHistory trades={strategy.trades} />
          </TabsContent>
          
          <TabsContent value="requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Technical Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Minimum Account Size</h4>
                      <p className="text-gray-700">{strategy.requirements.minBalance}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Recommended: $5,000 for optimal position sizing
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Execution Method</h4>
                      <p className="text-gray-700">{strategy.requirements.execution}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Requires broker with API access for automated trading
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Compatible Brokers</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.requirements.brokers.map((broker, i) => (
                          <Badge key={i} variant="outline">{broker}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Subscription Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">What's Included</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <div className="h-2 w-2 bg-teal rounded-full mr-2"></div>
                          Full access to strategy signals
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 bg-teal rounded-full mr-2"></div>
                          Automated trade execution
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 bg-teal rounded-full mr-2"></div>
                          Real-time performance tracking
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 bg-teal rounded-full mr-2"></div>
                          Priority customer support
                        </li>
                        <li className="flex items-center">
                          <div className="h-2 w-2 bg-teal rounded-full mr-2"></div>
                          Strategy updates and improvements
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Billing</h4>
                      <p className="text-gray-700">
                        ${strategy.price} billed monthly. Cancel anytime.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        30-day money back guarantee if not satisfied
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StrategyDetail;
