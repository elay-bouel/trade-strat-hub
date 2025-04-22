import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Users, Info } from "lucide-react";

const steps = [
  {
    title: "Create Your Strategy",
    description: "Build and backtest your trading strategy using TradingView's Pine Script. Once you're satisfied with its performance, upload it to our platform.",
    icon: <Layout className="w-12 h-12 text-teal" />,
  },
  {
    title: "Share with Subscribers",
    description: "Set your subscription price and share your strategy with our community. Traders can subscribe to automatically copy your trades.",
    icon: <Users className="w-12 h-12 text-teal" />,
  },
  {
    title: "Earn Revenue",
    description: "Earn a percentage of the subscription revenue when traders use your strategy. The more successful your strategy, the more you earn.",
    icon: <Info className="w-12 h-12 text-teal" />,
  },
];

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How TradeStratHub Works</h1>
          <p className="text-lg text-muted-foreground">
            Our platform connects strategy creators with traders, making algorithmic trading accessible to everyone.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">{step.icon}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Join our community of strategy creators and traders. Start sharing your trading expertise or discover profitable strategies today.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/marketplace">Browse Strategies</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
