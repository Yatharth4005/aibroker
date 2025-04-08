
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for financial news
const financialNews = [
  {
    id: 1,
    title: 'Fed Signals Rate Cuts Could Begin in September',
    source: 'Financial Times',
    timeAgo: '2 hours ago',
    category: 'Policy'
  },
  {
    id: 2,
    title: 'Apple Beats Earnings Expectations, Shares Rise 5%',
    source: 'Bloomberg',
    timeAgo: '4 hours ago',
    category: 'Earnings'
  },
  {
    id: 3,
    title: 'Tech Sector Leads Market Rally Amid Cooling Inflation',
    source: 'CNBC',
    timeAgo: '6 hours ago',
    category: 'Markets'
  },
  {
    id: 4,
    title: 'Oil Prices Fall as Supply Concerns Ease',
    source: 'Reuters',
    timeAgo: '8 hours ago',
    category: 'Commodities'
  },
  {
    id: 5,
    title: 'Treasury Yields Drop to Three-Month Low',
    source: 'WSJ',
    timeAgo: '12 hours ago',
    category: 'Bonds'
  }
];

// Category to color mapping
const categoryColors: Record<string, string> = {
  'Policy': 'bg-blue-600',
  'Earnings': 'bg-green-600',
  'Markets': 'bg-purple-600',
  'Commodities': 'bg-yellow-600',
  'Bonds': 'bg-orange-600'
};

const FinancialNews = () => {
  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Financial News</CardTitle>
        <CardDescription className="text-slate-400">
          Latest market and financial updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {financialNews.map((news) => (
            <div key={news.id} className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white text-base">{news.title}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-slate-400 mr-2">{news.source}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400 ml-2">{news.timeAgo}</span>
                  </div>
                </div>
                <Badge className={`${categoryColors[news.category]} text-white`}>{news.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialNews;
