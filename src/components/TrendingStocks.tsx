
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, TrendingUp, RefreshCw, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchTrendingStocks, getUpdatedStockData, type StockData } from "@/services/stockService";

const TrendingStocks = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to load trending stocks
  const loadStocks = async () => {
    try {
      setLoading(true);
      const data = await fetchTrendingStocks();
      setStocks(data);
    } catch (error) {
      toast({
        title: "Error fetching stocks",
        description: "Could not load trending stocks data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh stock data with simulated real-time updates
  const refreshStocks = async () => {
    if (refreshing) return;
    
    try {
      setRefreshing(true);
      
      // Simulate a live update by updating each stock with a random price change
      setStocks(prevStocks => 
        prevStocks.map(stock => getUpdatedStockData(stock))
      );
      
      toast({
        title: "Data refreshed",
        description: "Stock prices have been updated."
      });
    } catch (error) {
      toast({
        title: "Error refreshing data",
        description: "Could not update stock prices.",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Handle click on a stock item to view details
  const handleStockClick = (symbol: string) => {
    navigate(`/report?symbol=${symbol}`);
  };

  // Load stocks on component mount
  useEffect(() => {
    loadStocks();
    
    // Set up an interval to simulate real-time updates every 15 seconds (more frequent updates)
    const interval = setInterval(() => {
      if (!refreshing && stocks.length > 0) {
        refreshStocks();
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

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
          <div className="flex items-center gap-2">
            <Badge className={`${refreshing ? 'animate-pulse' : ''} bg-slate-800 text-slate-300 hover:bg-slate-700`}>
              Live
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2 border-slate-700 bg-slate-800 hover:bg-slate-700"
              onClick={refreshStocks}
              disabled={refreshing || loading}
            >
              <RefreshCw className={`h-4 w-4 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center p-2.5 bg-slate-800/50 rounded-md animate-pulse">
                <div className="w-12 h-12 bg-slate-800 rounded-md mr-3"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-slate-800 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-800 rounded w-16"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-slate-800 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-slate-800 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {stocks.map((stock) => (
              <div 
                key={stock.symbol} 
                className="flex items-center p-2.5 hover:bg-slate-800 rounded-md transition-colors border border-transparent hover:border-slate-700 cursor-pointer group"
                onClick={() => handleStockClick(stock.symbol)}
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
                <ExternalLink className="h-4 w-4 ml-2 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingStocks;
