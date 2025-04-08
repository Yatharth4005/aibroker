
import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchFinancialNews, type NewsItem } from "@/services/newsService";

// Category to color mapping
const categoryColors: Record<string, string> = {
  'Policy': 'bg-blue-600',
  'Earnings': 'bg-green-600',
  'Markets': 'bg-purple-600',
  'Commodities': 'bg-yellow-600',
  'Bonds': 'bg-orange-600',
  'Regulation': 'bg-indigo-600',
  'Economy': 'bg-emerald-600',
  'Crypto': 'bg-fuchsia-600'
};

const FinancialNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  // Function to load financial news
  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchFinancialNews();
      setNews(data);
    } catch (error) {
      toast({
        title: "Error fetching news",
        description: "Could not load financial news data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh news
  const refreshNews = async () => {
    if (refreshing) return;
    
    try {
      setRefreshing(true);
      await loadNews();
      toast({
        title: "News refreshed",
        description: "Latest financial news has been loaded."
      });
    } catch (error) {
      toast({
        title: "Error refreshing news",
        description: "Could not update financial news.",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Load news on component mount
  useEffect(() => {
    loadNews();
  }, []);

  // Get color for category or use default
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || 'bg-slate-600';
  };

  // Handle news item click
  const handleNewsClick = (newsItem: NewsItem) => {
    if (newsItem.url) {
      window.open(newsItem.url, '_blank');
    }
  };

  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-finance-teal" />
              Financial News
            </CardTitle>
            <CardDescription className="text-slate-400">
              Latest market and financial updates
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-2 border-slate-700 bg-slate-800 hover:bg-slate-700"
            onClick={refreshNews}
            disabled={refreshing || loading}
          >
            <RefreshCw className={`h-4 w-4 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 bg-slate-800/50 rounded-lg animate-pulse">
                <div className="flex items-start justify-between">
                  <div className="w-4/5">
                    <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                    <div className="flex items-center mt-2">
                      <div className="h-3 bg-slate-700 rounded w-20 mr-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-16 ml-2"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-slate-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div 
                key={item.id} 
                className="p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                onClick={() => handleNewsClick(item)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white text-base">{item.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-slate-400 mr-2">{item.source}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 ml-2">{item.timeAgo}</span>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(item.category)} text-white`}>
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialNews;
