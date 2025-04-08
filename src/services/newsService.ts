
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  url?: string;
}

// Mock API function to fetch financial news
// In a real app, this would connect to a news API
export const fetchFinancialNews = async (): Promise<NewsItem[]> => {
  try {
    // This simulates network latency for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock data for financial news
    // In a real app, this would be replaced with actual API calls
    const financialNews: NewsItem[] = [
      {
        id: 1,
        title: 'Fed Signals Rate Cuts Could Begin in September',
        source: 'Financial Times',
        timeAgo: '2 hours ago',
        category: 'Policy',
        url: 'https://example.com/news/1'
      },
      {
        id: 2,
        title: 'Apple Beats Earnings Expectations, Shares Rise 5%',
        source: 'Bloomberg',
        timeAgo: '4 hours ago',
        category: 'Earnings',
        url: 'https://example.com/news/2'
      },
      {
        id: 3,
        title: 'Tech Sector Leads Market Rally Amid Cooling Inflation',
        source: 'CNBC',
        timeAgo: '6 hours ago',
        category: 'Markets',
        url: 'https://example.com/news/3'
      },
      {
        id: 4,
        title: 'Oil Prices Fall as Supply Concerns Ease',
        source: 'Reuters',
        timeAgo: '8 hours ago',
        category: 'Commodities',
        url: 'https://example.com/news/4'
      },
      {
        id: 5,
        title: 'Treasury Yields Drop to Three-Month Low',
        source: 'WSJ',
        timeAgo: '12 hours ago',
        category: 'Bonds',
        url: 'https://example.com/news/5'
      },
      {
        id: 6,
        title: 'European Markets Close Higher Following Positive Economic Data',
        source: 'Bloomberg',
        timeAgo: '14 hours ago',
        category: 'Markets',
        url: 'https://example.com/news/6'
      },
      {
        id: 7,
        title: 'SEC Approves New Rules for Cryptocurrency Trading',
        source: 'Reuters',
        timeAgo: '1 day ago',
        category: 'Regulation',
        url: 'https://example.com/news/7'
      }
    ];

    return financialNews;
  } catch (error) {
    console.error('Error fetching financial news:', error);
    return [];
  }
};
