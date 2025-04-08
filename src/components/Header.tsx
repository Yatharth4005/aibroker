
import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-finance-blue border-b border-slate-700">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white mr-8">
          <span className="text-finance-teal">Savvy</span>Stock Compass
        </h1>
        <div className="relative ml-6 hidden md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search stocks, indices..."
            className="pl-8 w-[250px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-finance-teal"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
