
import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for trending stocks
const trendingStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '189.84', change: '+2.45%', isUp: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '402.56', change: '+1.87%', isUp: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '141.16', change: '-0.54%', isUp: false },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '178.22', change: '+3.12%', isUp: true },
  { symbol: 'META', name: 'Meta Platforms', price: '459.32', change: '+0.78%', isUp: true },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '218.51', change: '-1.24%', isUp: false },
];

const TrendingStocks = () => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-lg h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-finance-teal" />
              Trending Stocks
            </CardTitle>
            <CardDescription className="text-slate-400">
              Most active stocks today
            </CardDescription>
          </div>
          <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">Live</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingStocks.map((stock) => (
            <div 
              key={stock.symbol} 
              className="flex items-center p-2.5 hover:bg-slate-800 rounded-md transition-colors border border-transparent hover:border-slate-700"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center mr-3 border border-slate-700">
                <span className="font-bold text-finance-teal">{stock.symbol}</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-white">{stock.name}</h3>
                <p className="text-sm text-slate-400">{stock.symbol}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">${stock.price}</p>
                <p className={`flex items-center justify-end text-sm font-medium ${stock.isUp ? 'text-market-up' : 'text-market-down'}`}>
                  {stock.isUp ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingStocks;
