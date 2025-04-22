
import React from 'react';
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Creator {
  id: number;
  name: string;
  avatar: string;
  strategiesCount: number;
  subscribers: number;
  totalReturns: number;
  badges: string[];
}

const creators: Creator[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    strategiesCount: 12,
    subscribers: 1420,
    totalReturns: 127.5,
    badges: ["Top Performer", "Verified"]
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    strategiesCount: 8,
    subscribers: 890,
    totalReturns: 94.2,
    badges: ["Rising Star"]
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=3",
    strategiesCount: 15,
    subscribers: 2100,
    totalReturns: 156.8,
    badges: ["Top Performer", "Veteran"]
  }
];

const TopCreators = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Top Strategy Creators</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Meet our most successful trading strategy creators, ranked by performance and subscriber count.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <Card key={creator.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{creator.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {creator.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">{badge}</Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Strategies</dt>
                    <dd className="font-medium">{creator.strategiesCount}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Subscribers</dt>
                    <dd className="font-medium">{creator.subscribers.toLocaleString()}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Total Returns</dt>
                    <dd className="font-medium text-profit">+{creator.totalReturns}%</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TopCreators;
