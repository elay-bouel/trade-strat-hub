
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StrategyCard from "@/components/StrategyCard";
import { ArrowRightIcon, BarChart3, Lock, RefreshCw } from "lucide-react";

// Mock data for featured strategies
const featuredStrategies = [
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
    chartData: Array.from({ length: 30 }, (_, i) => ({ 
      value: 100 + Math.random() * 5 * i + (i > 15 ? 20 : 0) 
    })),
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
    chartData: Array.from({ length: 30 }, (_, i) => ({ 
      value: 100 + Math.sin(i/3) * 10 + i * 0.5 
    })),
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
    chartData: Array.from({ length: 30 }, (_, i) => ({ 
      value: 100 + Math.random() * 8 * i 
    })),
    risk: "High" as const,
    category: "Crypto"
  }
];

// Testimonial data
const testimonials = [
  {
    quote: "I've been using strategies from TradeStratHub for 6 months. My portfolio is up 32% with much lower stress.",
    author: "Michael R.",
    role: "Retail Trader"
  },
  {
    quote: "As a strategy creator, I've earned over $50,000 from subscribers while helping others succeed in the markets.",
    author: "Jennifer K.",
    role: "Professional Trader & Creator"
  },
  {
    quote: "The automated execution is what makes this platform special. Set it up once and let it run for you.",
    author: "Robert L.",
    role: "Busy Professional"
  }
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Trade Smarter with <span className="text-teal">Expert Strategies</span>
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Discover and subscribe to proven trading strategies created by expert traders. 
                Let algorithms do the work while you focus on what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-teal hover:bg-teal-dark text-white">
                  <Link to="/marketplace">Browse Strategies</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <div className="absolute inset-0 bg-teal/10 rounded-lg blur-xl"></div>
                <div className="relative bg-navy-light p-6 rounded-lg border border-teal/20 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-1">Win Rate</div>
                        <div className="text-2xl font-bold text-teal">68.5%</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium mb-1">Monthly ROI</div>
                        <div className="text-2xl font-bold text-teal">+5.2%</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/10 border-white/20 col-span-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Last Signal: BUY AAPL</div>
                          <div className="text-xs text-teal bg-teal/20 px-2 py-0.5 rounded-full">Active</div>
                        </div>
                        <div className="text-xs text-gray-300">Executed at $198.45 • 2h ago</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-teal rounded-full mr-2 animate-pulse-subtle"></div>
                      <span className="text-sm">Auto-trading active</span>
                    </div>
                    <span className="text-xs text-teal">Connected to Broker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy">Featured Strategies</h2>
            <Button variant="outline" asChild>
              <Link to="/marketplace" className="flex items-center gap-2">
                View All <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStrategies.map(strategy => (
              <StrategyCard key={strategy.id} {...strategy} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              TradeStratHub connects strategy creators with traders looking to automate their trading with proven strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-5">
                <BarChart3 size={32} className="text-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Strategies</h3>
              <p className="text-gray-600">
                Browse our marketplace of verified trading strategies with transparent performance metrics and risk profiles.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-5">
                <Lock size={32} className="text-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Subscribe Securely</h3>
              <p className="text-gray-600">
                Choose strategies that match your trading style and risk tolerance. Subscribe with our secure payment system.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mb-5">
                <RefreshCw size={32} className="text-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automate Your Trading</h3>
              <p className="text-gray-600">
                Connect your broker account and let our system execute trades based on your subscribed strategies.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/how-it-works">Learn More About Our Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-navy-light p-6 rounded-lg border border-white/10">
                <p className="mb-6 text-gray-200 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-teal">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal/10 to-teal/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy">Ready to Transform Your Trading?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of traders already using TradeStratHub to access verified trading strategies and automate their trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-navy hover:bg-navy-dark">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-navy text-navy">
              <Link to="/marketplace">Browse Strategies</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
