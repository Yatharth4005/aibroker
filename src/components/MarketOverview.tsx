
import React from 'react';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for market indices
const marketIndices = [
  { name: 'S&P 500', value: '4,781.24', change: '+0.83%', isUp: true },
  { name: 'Dow 30', value: '38,519.84', change: '+0.55%', isUp: true },
  { name: 'Nasdaq', value: '15,361.64', change: '-0.12%', isUp: false },
  { name: 'Russell 2000', value: '2,027.47', change: '+1.54%', isUp: true }
];

const MarketOverview = () => {
  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-finance-teal" />
          Market Overview
        </CardTitle>
        <CardDescription className="text-slate-400">
          Today's global market performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketIndices.map((index) => (
            <div key={index.name} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-slate-300">{index.name}</h3>
                {index.isUp ? (
                  <ArrowUp className="h-4 w-4 text-market-up" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-market-down" />
                )}
              </div>
              <p className="text-lg font-bold text-white mt-1">{index.value}</p>
              <p className={`text-sm font-medium ${index.isUp ? 'text-market-up' : 'text-market-down'}`}>
                {index.change}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
