
import React, { useState } from 'react';
import { Bell, LogIn, LogOut, Search, Settings, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthDialog from './auth/AuthDialog';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white mr-8">
          <span className="text-finance-teal">AI</span>Broker
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
        
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-white hover:bg-slate-700">
                <User className="mr-2 h-4 w-4" />
                <span>{user?.fullName}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">
                <span className="text-xs text-slate-400">{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-white hover:bg-slate-700" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={() => setAuthDialogOpen(true)}
            variant="default" 
            size="sm"
            className="bg-finance-teal hover:bg-finance-teal/90 text-white"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>
      <AuthDialog isOpen={authDialogOpen} onClose={() => setAuthDialogOpen(false)} />
    </header>
  );
};

export default Header;
