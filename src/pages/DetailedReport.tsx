
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Header from '@/components/Header';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { generatePDF } from '@/services/pdfService';

const DetailedReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportContentRef = useRef<HTMLDivElement>(null);
  
  const { recommendation, risk, timeHorizon } = location.state || {};
  
  useEffect(() => {
    if (!recommendation) {
      toast({
        title: "No report data found",
        description: "Redirecting to home page",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [recommendation, navigate]);

  const handleDownloadPDF = async () => {
    if (!reportContentRef.current) return;
    
    try {
      setIsGeneratingPDF(true);
      await generatePDF('report-content', `AIBroker_Investment_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      toast({
        title: "PDF Downloaded",
        description: "Your report has been downloaded successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const performanceData = [
    { month: 'Jan', return: 2.3 },
    { month: 'Feb', return: 1.8 },
    { month: 'Mar', return: -0.5 },
    { month: 'Apr', return: 3.2 },
    { month: 'May', return: 2.1 },
    { month: 'Jun', return: 1.5 },
    { month: 'Jul', return: 4.2 },
    { month: 'Aug', return: 3.7 },
    { month: 'Sep', return: -1.2 },
    { month: 'Oct', return: 2.8 },
    { month: 'Nov', return: 3.4 },
    { month: 'Dec', return: 2.9 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = recommendation?.allocation.map(item => ({
    name: item.category,
    value: item.percentage,
  })) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Generating your detailed report...</h2>
            <p className="text-slate-400">This may take a moment</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Button 
          variant="outline" 
          className="mb-6 bg-transparent border-slate-700 text-slate-300"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card className="border-slate-700 bg-slate-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                Detailed Investment Report
              </CardTitle>
              <CardDescription className="text-slate-400">
                {user?.email ? `Prepared for ${user.email}` : 'Personal Investment Analysis'} | {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div id="report-content" ref={reportContentRef}>
                <div className="mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-finance-teal mb-2">{recommendation.title}</h3>
                  <div className="text-sm text-slate-300 mb-4">
                    <p><strong>Risk Level:</strong> {risk}</p>
                    <p><strong>Time Horizon:</strong> {timeHorizon}</p>
                  </div>
                  <p className="text-slate-300">{recommendation.description}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Portfolio Allocation</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Historical Performance Simulation</h3>
                    <div className="h-64">
                      <ChartContainer
                        config={{
                          performanceLine: {
                            label: "Monthly Returns",
                            theme: {
                              light: "#33C3F0",
                              dark: "#33C3F0",
                            },
                          },
                        }}
                      >
                        <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#33C3F0" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" stroke="#8E9196" />
                          <YAxis stroke="#8E9196" tickFormatter={(value) => `${value}%`} />
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <Tooltip formatter={(value) => [`${value}%`, "Return"]} />
                          <Area type="monotone" dataKey="return" stroke="#33C3F0" fillOpacity={1} fill="url(#colorReturns)" />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended Securities</h3>
                  <div className="rounded-md border border-slate-700 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-800">
                        <TableRow>
                          <TableHead className="text-slate-300">Asset Category</TableHead>
                          <TableHead className="text-slate-300">Allocation</TableHead>
                          <TableHead className="text-slate-300">Ticker</TableHead>
                          <TableHead className="text-slate-300">Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recommendation.allocation.map((item, index) => (
                          <TableRow key={index} className="border-slate-700 hover:bg-slate-800">
                            <TableCell className="font-medium text-white">{item.category}</TableCell>
                            <TableCell>{item.percentage}%</TableCell>
                            <TableCell className="text-finance-teal font-medium">{item.ticker}</TableCell>
                            <TableCell className="text-slate-300">
                              {getTickerDescription(item.ticker)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="space-y-4 text-slate-300">
                  <h3 className="text-lg font-semibold text-white mb-2">Market Outlook & Strategy</h3>
                  <p>This {risk.toLowerCase()} risk portfolio is designed for a {timeHorizon.toLowerCase()} investment horizon. The allocation balances growth potential with appropriate risk management strategies for your profile.</p>
                  <p>Current market conditions indicate {risk === 'Low' ? 'a defensive positioning is prudent' : risk === 'Moderate' ? 'a balanced approach with selective opportunities' : 'potential for higher returns with increased volatility exposure'}.</p>
                  <p>We recommend quarterly rebalancing to maintain the target allocation and regular review of your investment goals.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 pt-4 flex justify-between">
              <Button 
                className="bg-slate-800 hover:bg-slate-700 text-white"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF Report"}
              </Button>
              <Button className="bg-finance-teal hover:bg-finance-teal-dark text-white">
                Schedule Advisor Call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="bg-slate-900 border-t border-slate-800 py-4">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 AIBroker. All market data is for demonstration purposes only.</p>
          <p className="mt-1">Not financial advice. Trading involves risk.</p>
        </div>
      </footer>
    </div>
  );
};

const getTickerDescription = (ticker: string) => {
  const descriptions: Record<string, string> = {
    'VGIT': 'Vanguard Intermediate-Term Treasury ETF',
    'LQD': 'iShares iBoxx $ Investment Grade Corporate Bond ETF',
    'VYM': 'Vanguard High Dividend Yield ETF',
    'SHV': 'iShares Short Treasury Bond ETF',
    'SCHD': 'Schwab US Dividend Equity ETF',
    'AGG': 'iShares Core U.S. Aggregate Bond ETF',
    'VEA': 'Vanguard FTSE Developed Markets ETF',
    'VNQ': 'Vanguard Real Estate ETF',
    'QUAL': 'iShares MSCI USA Quality Factor ETF',
    'BND': 'Vanguard Total Bond Market ETF',
    'VXUS': 'Vanguard Total International Stock ETF',
    'IFRA': 'iShares U.S. Infrastructure ETF',
    'HDV': 'iShares Core High Dividend ETF',
    'VCIT': 'Vanguard Intermediate-Term Corporate Bond ETF',
    'PFF': 'iShares Preferred & Income Securities ETF',
    'HYG': 'iShares iBoxx $ High Yield Corporate Bond ETF',
    'QQQ': 'Invesco QQQ Trust Series 1',
    'VTV': 'Vanguard Value ETF',
    'EFA': 'iShares MSCI EAFE ETF',
    'VTI': 'Vanguard Total Stock Market ETF',
    'VWO': 'Vanguard FTSE Emerging Markets ETF',
    'XLK': 'Technology Select Sector SPDR Fund',
    'XLY': 'Consumer Discretionary Select Sector SPDR Fund',
    'XLI': 'Industrial Select Sector SPDR Fund',
    'IJT': 'iShares S&P Small-Cap 600 Growth ETF',
    'VGT': 'Vanguard Information Technology ETF',
    'VBK': 'Vanguard Small-Cap Growth ETF',
    'IEMG': 'iShares Core MSCI Emerging Markets ETF',
    'JNK': 'SPDR Bloomberg High Yield Bond ETF',
    'VUG': 'Vanguard Growth ETF',
    'VB': 'Vanguard Small-Cap ETF',
    'RYT': 'Invesco S&P 500 Equal Weight Technology ETF',
  };
  
  return descriptions[ticker] || 'Exchange-Traded Fund';
};

export default DetailedReport;
