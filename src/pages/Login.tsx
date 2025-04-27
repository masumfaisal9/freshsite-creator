
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, LogIn, Key } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdminHint, setShowAdminHint] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const success = await login(email, password);
    
    setIsLoading(false);
    if (!success) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const setAdminCredentials = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
    setShowAdminHint(false);
  };

  const setUserCredentials = () => {
    setEmail("user@example.com");
    setPassword("password");
    setShowAdminHint(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-fresh-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-fresh-600 hover:bg-fresh-700 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </span>
                )}
              </Button>
              
              <div className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-fresh-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-center text-gray-600 mb-2">
                  {showAdminHint ? (
                    <span>
                      <strong>Admin Login:</strong> admin@example.com / admin123<br />
                      <strong>User Login:</strong> user@example.com / password
                    </span>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="text-gray-700 flex items-center justify-center text-sm"
                      onClick={() => setShowAdminHint(!showAdminHint)}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Show Demo Credentials
                    </Button>
                  )}
                </p>
                
                {showAdminHint && (
                  <div className="flex justify-center space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="text-fresh-600 border-fresh-200"
                      onClick={setAdminCredentials}
                    >
                      Use Admin Login
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={setUserCredentials}
                    >
                      Use User Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
