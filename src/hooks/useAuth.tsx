
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './use-toast';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('savvystock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('savvystock_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate authentication
    // In a real app, this would make an API call to your backend
    return new Promise<void>((resolve, reject) => {
      try {
        // Check if email contains '@' for basic validation
        if (!email.includes('@')) {
          reject(new Error('Invalid email format'));
          return;
        }

        // Creating a mock user (in a real app, this would come from your backend)
        const mockUser = {
          id: crypto.randomUUID(),
          email,
          fullName: email.split('@')[0] // Just using part of the email as the name for demo
        };

        // Store user in localStorage (in a real app, you would store a token)
        localStorage.setItem('savvystock_user', JSON.stringify(mockUser));
        setUser(mockUser);
        resolve();
      } catch (error) {
        console.error('Sign-in error:', error);
        reject(error);
      }
    });
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Simulate registration
    // In a real app, this would make an API call to your backend
    return new Promise<void>((resolve, reject) => {
      try {
        // Check if email contains '@' for basic validation
        if (!email.includes('@')) {
          reject(new Error('Invalid email format'));
          return;
        }

        // Creating a new user (in a real app, this would come from your backend)
        const newUser = {
          id: crypto.randomUUID(),
          email,
          fullName
        };

        // Store user in localStorage (in a real app, you would store a token)
        localStorage.setItem('savvystock_user', JSON.stringify(newUser));
        setUser(newUser);
        resolve();
      } catch (error) {
        console.error('Sign-up error:', error);
        reject(error);
      }
    });
  };

  const signOut = async () => {
    return new Promise<void>((resolve) => {
      // Remove user from localStorage
      localStorage.removeItem('savvystock_user');
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      resolve();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
