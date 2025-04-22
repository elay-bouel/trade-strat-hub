
import React, { useState } from 'react';
import MainLayout from "@/components/MainLayout";
import StrategyCard from "@/components/StrategyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from 'lucide-react';

// Mock strategies data
const allStrategies = [
  {
    id: "1",
    name: "Momentum Master",
    description: "A momentum-based strategy that follows strong market trends with strict risk management rules.",
    creator: {
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    performance: {
      month: 4.2,
      year: 27.8,
      allTime: 68.5
    },
    subscribers: 347,
    price: 29.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + Math.random() * 5 * i + (i > 15 ? 20 : 0) })),
    risk: "Medium" as const,
    category: "Forex"
  },
  {
    id: "2",
    name: "Adaptive RSI Reversal",
    description: "Identifies market reversals using adaptive RSI settings across multiple timeframes.",
    creator: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    performance: {
      month: -2.1,
      year: 19.5,
      allTime: 47.3
    },
    subscribers: 215,
    price: 24.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + Math.sin(i/3) * 10 + i * 0.5 })),
    risk: "Low" as const,
    category: "Stocks"
  },
  {
    id: "3",
    name: "Volatility Breakout Pro",
    description: "Capitalizes on high volatility breakouts with precision entries and dynamic profit targets.",
    creator: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    performance: {
      month: 8.7,
      year: 42.3,
      allTime: 112.5
    },
    subscribers: 582,
    price: 49.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + Math.random() * 8 * i })),
    risk: "High" as const,
    category: "Crypto"
  },
  {
    id: "4",
    name: "Mean Reversion Edge",
    description: "Exploits statistical tendencies of markets to revert to mean values after deviations.",
    creator: {
      name: "David Williams",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    performance: {
      month: 3.5,
      year: 22.1,
      allTime: 54.8
    },
    subscribers: 198,
    price: 34.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + (Math.random() * 4 - 2) * i + i * 0.8 })),
    risk: "Medium" as const,
    category: "Stocks"
  },
  {
    id: "5",
    name: "Harmonic Pattern Finder",
    description: "Detects and trades harmonic price patterns with specific Fibonacci ratios and formations.",
    creator: {
      name: "Emma Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    performance: {
      month: 5.8,
      year: 31.2,
      allTime: 87.6
    },
    subscribers: 264,
    price: 39.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + Math.cos(i/2) * 15 + i * 1.2 })),
    risk: "Medium" as const,
    category: "Forex"
  },
  {
    id: "6",
    name: "Scalping Master",
    description: "High-frequency strategy that captures small price movements with tight risk controls.",
    creator: {
      name: "Robert Kim",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    performance: {
      month: 6.3,
      year: 38.7,
      allTime: 93.4
    },
    subscribers: 421,
    price: 44.99,
    chartData: Array.from({ length: 30 }, (_, i) => ({ value: 100 + (Math.random() * 2) * i + i * 1.1 })),
    risk: "High" as const,
    category: "Crypto"
  }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRisk, setSelectedRisk] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [performanceMin, setPerformanceMin] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter strategies based on search and filters
  const filteredStrategies = allStrategies.filter(strategy => {
    // Search term filter
    if (searchTerm && !strategy.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory && strategy.category !== selectedCategory) {
      return false;
    }
    
    // Risk filter
    if (selectedRisk.length > 0 && !selectedRisk.includes(strategy.risk)) {
      return false;
    }
    
    // Price filter
    if (strategy.price < priceRange[0] || strategy.price > priceRange[1]) {
      return false;
    }
    
    // Performance filter (1-month performance)
    if (strategy.performance.month < performanceMin) {
      return false;
    }
    
    return true;
  });

  const handleRiskChange = (risk: string) => {
    setSelectedRisk(prev => 
      prev.includes(risk) 
        ? prev.filter(item => item !== risk)
        : [...prev, risk]
    );
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-navy to-navy-dark text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trading Strategy Marketplace</h1>
          <p className="text-gray-200 max-w-3xl">
            Browse and subscribe to high-performing trading strategies developed by expert traders. 
            Each strategy is thoroughly vetted and includes transparent performance metrics.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              placeholder="Search strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Forex">Forex</SelectItem>
              <SelectItem value="Crypto">Crypto</SelectItem>
              <SelectItem value="Stocks">Stocks</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </Button>
        </div>

        {/* Mobile Filters (Collapsible) */}
        <div className={`md:hidden mb-6 ${showMobileFilters ? 'block' : 'hidden'}`}>
          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Risk Level</h3>
              <div className="flex flex-wrap gap-2">
                {["Low", "Medium", "High"].map((risk) => (
                  <Badge 
                    key={risk}
                    variant={selectedRisk.includes(risk) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleRiskChange(risk)}
                  >
                    {risk}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 50]} 
                  max={50} 
                  step={1} 
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Min. Monthly Performance</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0]} 
                  max={10} 
                  step={0.5}
                  value={[performanceMin]}
                  onValueChange={([val]) => setPerformanceMin(val)} 
                />
              </div>
              <div className="text-sm mt-2">
                <span>{performanceMin}%+</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters (Sidebar) */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <Accordion type="multiple" defaultValue={["risk", "price", "performance"]}>
                <AccordionItem value="risk">
                  <AccordionTrigger>Risk Level</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-3">
                      {["Low", "Medium", "High"].map((risk) => (
                        <div key={risk} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`risk-${risk}`} 
                            checked={selectedRisk.includes(risk)}
                            onCheckedChange={() => handleRiskChange(risk)}
                          />
                          <label htmlFor={`risk-${risk}`} className="cursor-pointer text-sm">{risk}</label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 50]} 
                        max={50} 
                        step={1} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="performance">
                  <AccordionTrigger>Performance</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <label className="text-sm mb-2 block">Min. Monthly Return</label>
                      <div className="px-2">
                        <Slider 
                          defaultValue={[0]} 
                          max={10} 
                          step={0.5}
                          value={[performanceMin]}
                          onValueChange={([val]) => setPerformanceMin(val)} 
                        />
                      </div>
                      <div className="text-sm mt-2">
                        <span>{performanceMin}%+</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedRisk([]);
                    setPriceRange([0, 50]);
                    setPerformanceMin(0);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Strategy Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredStrategies.length} {filteredStrategies.length === 1 ? 'strategy' : 'strategies'} found
              </p>
            </div>
            
            {filteredStrategies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStrategies.map(strategy => (
                  <StrategyCard key={strategy.id} {...strategy} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-lg text-muted-foreground">No strategies match your filters</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedRisk([]);
                    setPriceRange([0, 50]);
                    setPerformanceMin(0);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
