
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for global indices performance
const indicesData = {
  daily: [
    { time: '9:30', US: 4750, Europe: 4580, Asia: 4320 },
    { time: '10:30', US: 4765, Europe: 4575, Asia: 4310 },
    { time: '11:30', US: 4760, Europe: 4590, Asia: 4325 },
    { time: '12:30', US: 4770, Europe: 4600, Asia: 4340 },
    { time: '13:30', US: 4775, Europe: 4610, Asia: 4345 },
    { time: '14:30', US: 4785, Europe: 4605, Asia: 4330 },
    { time: '15:30', US: 4790, Europe: 4615, Asia: 4350 },
    { time: '16:30', US: 4780, Europe: 4620, Asia: 4360 },
  ],
  weekly: [
    { time: 'Mon', US: 4730, Europe: 4560, Asia: 4300 },
    { time: 'Tue', US: 4745, Europe: 4570, Asia: 4310 },
    { time: 'Wed', US: 4760, Europe: 4590, Asia: 4330 },
    { time: 'Thu', US: 4770, Europe: 4600, Asia: 4340 },
    { time: 'Fri', US: 4780, Europe: 4620, Asia: 4360 },
  ],
  monthly: [
    { time: 'Jan', US: 4600, Europe: 4400, Asia: 4150 },
    { time: 'Feb', US: 4650, Europe: 4450, Asia: 4200 },
    { time: 'Mar', US: 4680, Europe: 4480, Asia: 4230 },
    { time: 'Apr', US: 4700, Europe: 4520, Asia: 4260 },
    { time: 'May', US: 4720, Europe: 4540, Asia: 4280 },
    { time: 'Jun', US: 4750, Europe: 4560, Asia: 4300 },
    { time: 'Jul', US: 4780, Europe: 4620, Asia: 4360 },
  ],
};

const GlobalIndicesChart = () => {
  return (
    <Card className="border-slate-700 bg-slate-900 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Global Indices Performance</CardTitle>
        <CardDescription className="text-slate-400">
          Comparative view of major market indices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="daily" className="data-[state=active]:bg-finance-blue-light">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-finance-blue-light">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-finance-blue-light">Monthly</TabsTrigger>
          </TabsList>
          {Object.entries(indicesData).map(([period, data]) => (
            <TabsContent key={period} value={period} className="pt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38B2AC" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#38B2AC" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEurope" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4C51BF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4C51BF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAsia" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ED64A6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ED64A6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} axisLine={{ stroke: '#475569' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      color: '#f1f5f9'
                    }}
                    itemStyle={{ color: '#f1f5f9' }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Area type="monotone" dataKey="US" stroke="#38B2AC" fillOpacity={1} fill="url(#colorUS)" />
                  <Area type="monotone" dataKey="Europe" stroke="#4C51BF" fillOpacity={1} fill="url(#colorEurope)" />
                  <Area type="monotone" dataKey="Asia" stroke="#ED64A6" fillOpacity={1} fill="url(#colorAsia)" />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GlobalIndicesChart;
