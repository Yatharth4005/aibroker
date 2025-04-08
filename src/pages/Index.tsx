
import React from 'react';
import Header from '@/components/Header';
import MarketOverview from '@/components/MarketOverview';
import TrendingStocks from '@/components/TrendingStocks';
import GlobalIndicesChart from '@/components/GlobalIndicesChart';
import FinancialNews from '@/components/FinancialNews';
import AIRecommendation from '@/components/AIRecommendation';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <MarketOverview />
          </div>
          <div className="h-full">
            <TrendingStocks />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlobalIndicesChart />
          <FinancialNews />
        </div>
        
        <div className="mb-6">
          <AIRecommendation />
        </div>
      </main>
      <footer className="bg-[#111827] border-t border-slate-800 py-4">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 AI-Broker. All market data is for demonstration purposes only.</p>
          <p className="mt-1">Not financial advice. Trading involves risk.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
