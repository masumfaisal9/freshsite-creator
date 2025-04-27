
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo users for testing
const DEMO_USERS = [
  { id: "1", email: "user@example.com", name: "Demo User", password: "password", role: "user" as const },
  { id: "2", email: "admin@example.com", name: "Admin User", password: "admin123", role: "admin" as const }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse auth from localStorage:", error);
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // For demo, we're using a simple array lookup
      const foundUser = DEMO_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));
        toast.success("Successfully logged in");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.success("Logged out successfully");
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // Check if user exists
      if (DEMO_USERS.some(u => u.email === email)) {
        toast.error("Email already in use");
        return false;
      }
      
      // In a real app, this would be a server call
      // For demo, we'll just pretend it worked
      const newUser = { 
        id: `${DEMO_USERS.length + 1}`, 
        name, 
        email, 
        role: 'user' as const 
      };
      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return false;
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
