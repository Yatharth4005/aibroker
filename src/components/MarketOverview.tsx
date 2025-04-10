
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Interface for market indices
interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isUp: boolean;
  symbol?: string;
}

const MarketOverview = () => {
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([
    { name: 'S&P 500', value: '4,781.24', change: '+0.83%', isUp: true, symbol: 'SPX' },
    { name: 'Dow 30', value: '38,519.84', change: '+0.55%', isUp: true, symbol: 'DJI' },
    { name: 'Nasdaq', value: '15,361.64', change: '-0.12%', isUp: false, symbol: 'IXIC' },
    { name: 'Russell 2000', value: '2,027.47', change: '+1.54%', isUp: true, symbol: 'RUT' }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to update market indices with simulated real-time data
  const updateIndices = () => {
    setMarketIndices(prevIndices => 
      prevIndices.map(index => {
        // Generate random price movement between -0.5% and +0.5%
        const changePercent = (Math.random() * 1 - 0.5).toFixed(2);
        const isPositive = parseFloat(changePercent) >= 0;
        
        // Parse current value
        const currentValue = parseFloat(index.value.replace(',', ''));
        
        // Calculate new value
        const valueChange = currentValue * (parseFloat(changePercent) / 100);
        const newValue = (currentValue + valueChange).toFixed(2);
        
        // Format the new value with commas
        const formattedValue = new Intl.NumberFormat('en-US').format(parseFloat(newValue));
        
        // Format new change string
        const newChangeString = `${isPositive ? '+' : ''}${changePercent}%`;
        
        return {
          ...index,
          value: formattedValue,
          change: newChangeString,
          isUp: isPositive
        };
      })
    );
  };

  // Set up interval for updating market indices
  useEffect(() => {
    const intervalId = setInterval(updateIndices, 5000); // Update every 5 seconds
    
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Handle click on a market index card
  const handleIndexClick = (index: MarketIndex) => {
    toast({
      title: "Index Selected",
      description: `You selected ${index.name}`,
    });
    
    // Navigate to the detailed report page with the index symbol
    if (index.symbol) {
      navigate(`/report?symbol=${index.symbol}&type=index`);
    }
  };

  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-finance-teal" />
          Market Overview
        </CardTitle>
        <CardDescription className="text-slate-400">
          Today's global market performance (live updates)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketIndices.map((index) => (
            <div 
              key={index.name} 
              className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors"
              onClick={() => handleIndexClick(index)}
            >
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
