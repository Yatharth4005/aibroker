
import { supabase } from "@/integrations/supabase/client";

export interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
  volume?: string;
  marketCap?: string;
  peRatio?: string;
  dividend?: string;
  sector?: string;
}

// Mock API function to fetch trending stocks data
// In a real app, this would connect to a financial data API
export const fetchTrendingStocks = async (): Promise<StockData[]> => {
  try {
    // This simulates network latency for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data for trending stocks with additional details
    // In a real app, this would be replaced with actual API calls
    const trendingStocks: StockData[] = [
      { 
        symbol: 'AAPL', 
        name: 'Apple Inc.', 
        price: '189.84', 
        change: '+2.45%', 
        isUp: true,
        volume: '58.2M',
        marketCap: '2.98T',
        peRatio: '31.45',
        dividend: '0.92%',
        sector: 'Technology'
      },
      { 
        symbol: 'MSFT', 
        name: 'Microsoft Corp.', 
        price: '402.56', 
        change: '+1.87%', 
        isUp: true,
        volume: '22.8M',
        marketCap: '3.15T',
        peRatio: '34.82',
        dividend: '0.74%',
        sector: 'Technology'
      },
      { 
        symbol: 'GOOGL', 
        name: 'Alphabet Inc.', 
        price: '141.16', 
        change: '-0.54%', 
        isUp: false,
        volume: '14.6M',
        marketCap: '1.78T',
        peRatio: '27.11',
        dividend: '0%',
        sector: 'Technology'
      },
      { 
        symbol: 'AMZN', 
        name: 'Amazon.com Inc.', 
        price: '178.22', 
        change: '+3.12%', 
        isUp: true,
        volume: '32.1M',
        marketCap: '1.87T',
        peRatio: '62.18',
        dividend: '0%',
        sector: 'Consumer Cyclical'
      },
      { 
        symbol: 'META', 
        name: 'Meta Platforms', 
        price: '459.32', 
        change: '+0.78%', 
        isUp: true,
        volume: '18.7M',
        marketCap: '1.16T',
        peRatio: '26.43',
        dividend: '0%',
        sector: 'Technology'
      },
      { 
        symbol: 'TSLA', 
        name: 'Tesla Inc.', 
        price: '218.51', 
        change: '-1.24%', 
        isUp: false,
        volume: '106.3M',
        marketCap: '695.2B',
        peRatio: '58.92',
        dividend: '0%',
        sector: 'Automotive'
      },
      { 
        symbol: 'NVDA', 
        name: 'NVIDIA Corp.', 
        price: '829.76', 
        change: '+4.32%', 
        isUp: true,
        volume: '43.8M',
        marketCap: '2.04T',
        peRatio: '79.16',
        dividend: '0.05%',
        sector: 'Technology'
      },
      { 
        symbol: 'JPM', 
        name: 'JPMorgan Chase', 
        price: '194.52', 
        change: '-0.75%', 
        isUp: false,
        volume: '8.9M',
        marketCap: '559.7B',
        peRatio: '11.89',
        dividend: '2.46%',
        sector: 'Financial Services'
      },
    ];

    return trendingStocks;
  } catch (error) {
    console.error('Error fetching trending stocks:', error);
    return [];
  }
};

// Enhanced function to get more realistic stock price fluctuations for real-time updates
export const getUpdatedStockData = (stock: StockData): StockData => {
  // Generate random price change between -2% and +2% with weighted probabilities
  // More likely to continue in the same direction as previous trend
  let changePercent: number;
  
  if (stock.isUp) {
    // If stock was previously up, 70% chance to continue up but smaller change
    changePercent = Math.random() < 0.7 
      ? (Math.random() * 1.2) // +0 to +1.2%
      : -(Math.random() * 2); // -0 to -2%
  } else {
    // If stock was previously down, 70% chance to continue down but smaller change
    changePercent = Math.random() < 0.7 
      ? -(Math.random() * 1.2) // -0 to -1.2%
      : (Math.random() * 2); // +0 to +2%
  }
  
  changePercent = parseFloat(changePercent.toFixed(2));
  const isPositive = changePercent >= 0;
  
  // Parse current price
  const currentPrice = parseFloat(stock.price);
  
  // Calculate new price
  const priceChange = currentPrice * (changePercent / 100);
  const newPrice = (currentPrice + priceChange).toFixed(2);
  
  // Format new change string
  const newChangeString = `${isPositive ? '+' : ''}${changePercent}%`;
  
  // Update volume with small random fluctuation
  let volume = stock.volume;
  if (volume) {
    const volumeValue = parseFloat(volume.replace('M', ''));
    const newVolume = (volumeValue + (Math.random() * 2 - 1)).toFixed(1);
    volume = `${newVolume}M`;
  }
  
  return {
    ...stock,
    price: newPrice,
    change: newChangeString,
    isUp: isPositive,
    volume,
  };
};

// Fetch detailed stock information
export const fetchStockDetails = async (symbol: string): Promise<StockData | null> => {
  try {
    // This would be an API call in a real application
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const stocks = await fetchTrendingStocks();
    const stockDetails = stocks.find(stock => stock.symbol === symbol);
    
    if (!stockDetails) {
      return null;
    }
    
    return stockDetails;
  } catch (error) {
    console.error(`Error fetching details for ${symbol}:`, error);
    return null;
  }
};
