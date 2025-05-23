
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define types for our context
type User = {
  id: string;
  email: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication - will be replaced with Supabase
  useEffect(() => {
    // Check if user is logged in (from localStorage in this mock version)
    const checkAuth = () => {
      const storedUser = localStorage.getItem("authenticUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function - will be replaced with Supabase auth
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with Supabase
      const isAdmin = ["admin@authenticwear.com", "owner@authenticwear.com"].includes(email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const user = { id: "1", email, isAdmin };
      
      // Store user in localStorage (temporary until Supabase)
      localStorage.setItem("authenticUser", JSON.stringify(user));
      setUser(user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function - will be replaced with Supabase auth
  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock signup - replace with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isAdmin = ["admin@authenticwear.com", "owner@authenticwear.com"].includes(email);
      
      // Create mock user
      const user = { id: "1", email, isAdmin };
      
      // Store user in localStorage (temporary until Supabase)
      localStorage.setItem("authenticUser", JSON.stringify(user));
      setUser(user);
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function - will be replaced with Supabase auth
  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout - replace with Supabase
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove user from localStorage
      localStorage.removeItem("authenticUser");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
