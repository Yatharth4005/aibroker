
import { supabase } from "@/integrations/supabase/client";

export interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
}

// Mock API function to fetch trending stocks data
// In a real app, this would connect to a financial data API
export const fetchTrendingStocks = async (): Promise<StockData[]> => {
  try {
    // This simulates network latency for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for trending stocks
    // In a real app, this would be replaced with actual API calls
    const trendingStocks: StockData[] = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: '189.84', change: '+2.45%', isUp: true },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: '402.56', change: '+1.87%', isUp: true },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '141.16', change: '-0.54%', isUp: false },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '178.22', change: '+3.12%', isUp: true },
      { symbol: 'META', name: 'Meta Platforms', price: '459.32', change: '+0.78%', isUp: true },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: '218.51', change: '-1.24%', isUp: false },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '829.76', change: '+4.32%', isUp: true },
      { symbol: 'JPM', name: 'JPMorgan Chase', price: '194.52', change: '-0.75%', isUp: false },
    ];

    return trendingStocks;
  } catch (error) {
    console.error('Error fetching trending stocks:', error);
    return [];
  }
};

// Function to get random stock price fluctuation for real-time updates
export const getUpdatedStockData = (stock: StockData): StockData => {
  // Generate random price change between -2% and +2%
  const changePercent = (Math.random() * 4 - 2).toFixed(2);
  const isPositive = parseFloat(changePercent) >= 0;
  
  // Parse current price
  const currentPrice = parseFloat(stock.price);
  
  // Calculate new price
  const priceChange = currentPrice * (parseFloat(changePercent) / 100);
  const newPrice = (currentPrice + priceChange).toFixed(2);
  
  // Format new change string
  const newChangeString = `${isPositive ? '+' : ''}${changePercent}%`;
  
  return {
    ...stock,
    price: newPrice,
    change: newChangeString,
    isUp: isPositive,
  };
};
