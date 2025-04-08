
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const riskLevels = ['Low', 'Moderate', 'High'];
const timeHorizons = ['Short-term (1-2 years)', 'Medium-term (3-5 years)', 'Long-term (5+ years)'];

// Mock data for investment recommendations
const investmentRecommendations = {
  'Low': {
    'Short-term (1-2 years)': {
      title: 'Conservative Income Portfolio',
      description: 'Focus on capital preservation with stable income generation.',
      allocation: [
        { category: 'US Treasury Bonds', percentage: 40, ticker: 'VGIT' },
        { category: 'Investment Grade Corporate Bonds', percentage: 30, ticker: 'LQD' },
        { category: 'Blue-Chip Dividend Stocks', percentage: 20, ticker: 'VYM' },
        { category: 'Cash & Short-Term Instruments', percentage: 10, ticker: 'SHV' }
      ]
    },
    'Medium-term (3-5 years)': {
      title: 'Conservative Growth & Income',
      description: 'Balanced approach with focus on quality dividend stocks and bonds.',
      allocation: [
        { category: 'Quality Dividend Stocks', percentage: 35, ticker: 'SCHD' },
        { category: 'Investment Grade Bonds', percentage: 35, ticker: 'AGG' },
        { category: 'International Developed Markets', percentage: 15, ticker: 'VEA' },
        { category: 'REITs', percentage: 15, ticker: 'VNQ' }
      ]
    },
    'Long-term (5+ years)': {
      title: 'Conservative Long-Term Growth',
      description: 'Diversified portfolio with tilt toward quality equities.',
      allocation: [
        { category: 'Quality Large-Cap Stocks', percentage: 40, ticker: 'QUAL' },
        { category: 'Total Bond Market', percentage: 30, ticker: 'BND' },
        { category: 'International Equities', percentage: 20, ticker: 'VXUS' },
        { category: 'REITs & Infrastructure', percentage: 10, ticker: 'IFRA' }
      ]
    }
  },
  'Moderate': {
    'Short-term (1-2 years)': {
      title: 'Balanced Income Strategy',
      description: 'Equal emphasis on current income and moderate capital appreciation.',
      allocation: [
        { category: 'Dividend Stocks', percentage: 40, ticker: 'HDV' },
        { category: 'Corporate Bonds', percentage: 25, ticker: 'VCIT' },
        { category: 'Preferred Stocks', percentage: 20, ticker: 'PFF' },
        { category: 'High-Yield Bonds', percentage: 15, ticker: 'HYG' }
      ]
    },
    'Medium-term (3-5 years)': {
      title: 'Growth-Oriented Balanced Portfolio',
      description: 'Emphasis on growth with moderate risk exposure.',
      allocation: [
        { category: 'US Large-Cap Growth', percentage: 35, ticker: 'QQQ' },
        { category: 'US Value Stocks', percentage: 20, ticker: 'VTV' },
        { category: 'International Equities', percentage: 25, ticker: 'EFA' },
        { category: 'Total Bond Market', percentage: 20, ticker: 'BND' }
      ]
    },
    'Long-term (5+ years)': {
      title: 'Global Growth Portfolio',
      description: 'Diversified equity exposure across regions and sectors.',
      allocation: [
        { category: 'US Total Market', percentage: 40, ticker: 'VTI' },
        { category: 'International Developed', percentage: 25, ticker: 'EFA' },
        { category: 'Emerging Markets', percentage: 15, ticker: 'VWO' },
        { category: 'Bond Allocation', percentage: 20, ticker: 'AGG' }
      ]
    }
  },
  'High': {
    'Short-term (1-2 years)': {
      title: 'Opportunistic Sector Strategy',
      description: 'Focus on cyclical sectors with potential for rapid appreciation.',
      allocation: [
        { category: 'Technology Sector', percentage: 30, ticker: 'XLK' },
        { category: 'Consumer Discretionary', percentage: 25, ticker: 'XLY' },
        { category: 'Industrials', percentage: 25, ticker: 'XLI' },
        { category: 'Small-Cap Growth', percentage: 20, ticker: 'IJT' }
      ]
    },
    'Medium-term (3-5 years)': {
      title: 'Aggressive Growth Portfolio',
      description: 'Seeks maximum capital appreciation with higher volatility.',
      allocation: [
        { category: 'Tech & Innovation', percentage: 40, ticker: 'VGT' },
        { category: 'Small-Cap Growth', percentage: 25, ticker: 'VBK' },
        { category: 'Emerging Markets', percentage: 25, ticker: 'IEMG' },
        { category: 'High-Yield Bonds', percentage: 10, ticker: 'JNK' }
      ]
    },
    'Long-term (5+ years)': {
      title: 'Maximum Growth Strategy',
      description: 'Seeks aggressive growth through global equity exposure.',
      allocation: [
        { category: 'US Growth Stocks', percentage: 40, ticker: 'VUG' },
        { category: 'Emerging Markets', percentage: 25, ticker: 'VWO' },
        { category: 'Small-Cap Stocks', percentage: 25, ticker: 'VB' },
        { category: 'Sector Rotation', percentage: 10, ticker: 'RYT' }
      ]
    }
  }
};

const AIRecommendation = () => {
  const [risk, setRisk] = useState('Moderate');
  const [timeHorizon, setTimeHorizon] = useState('Medium-term (3-5 years)');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const recommendation = investmentRecommendations[risk as keyof typeof investmentRecommendations][timeHorizon];

  const handleGenerateReport = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate a detailed report",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/report', { 
        state: { 
          recommendation,
          risk,
          timeHorizon
        }
      });
    }, 1000);
  };

  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">AI Investment Recommendation</CardTitle>
        <CardDescription className="text-slate-400">
          Personalized investment ideas based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="risk-level" className="block text-sm font-medium text-slate-400 mb-1">
              Risk Tolerance
            </label>
            <Select value={risk} onValueChange={setRisk}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {riskLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="time-horizon" className="block text-sm font-medium text-slate-400 mb-1">
              Time Horizon
            </label>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Select time horizon" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {timeHorizons.map((horizon) => (
                  <SelectItem key={horizon} value={horizon}>{horizon}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-finance-teal mb-1">{recommendation.title}</h3>
          <p className="text-sm text-slate-300 mb-4">{recommendation.description}</p>
          
          <h4 className="text-sm font-medium text-slate-400 mb-2">Recommended Allocation:</h4>
          <div className="space-y-3">
            {recommendation.allocation.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-700 rounded-md flex items-center justify-center mr-3 text-xs font-bold text-white">
                    {item.percentage}%
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.category}</p>
                    <p className="text-xs text-slate-400">{item.ticker}</p>
                  </div>
                </div>
                <div className="flex items-center text-market-up text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>Buy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-slate-800 pt-4">
        <Button 
          className="w-full bg-finance-teal hover:bg-finance-teal-dark text-white"
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Detailed Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIRecommendation;
