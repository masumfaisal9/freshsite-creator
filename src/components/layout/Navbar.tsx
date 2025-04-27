
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, LogIn, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Sample cart items count - in a real app, this would come from a cart context/state
  const cartItemsCount = 2;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-fresh-600 flex items-center"
          >
            <span className="text-3xl mr-1">B</span>
            <span className="animate-fade-in">eFresh</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                location.pathname === '/' 
                  ? 'text-fresh-600' 
                  : 'text-gray-700 hover:text-fresh-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`transition-colors font-medium ${
                location.pathname === '/shop' 
                  ? 'text-fresh-600' 
                  : 'text-gray-700 hover:text-fresh-600'
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors font-medium ${
                location.pathname === '/about' 
                  ? 'text-fresh-600' 
                  : 'text-gray-700 hover:text-fresh-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors font-medium ${
                location.pathname === '/contact' 
                  ? 'text-fresh-600' 
                  : 'text-gray-700 hover:text-fresh-600'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/faq" 
              className={`transition-colors font-medium ${
                location.pathname === '/faq' 
                  ? 'text-fresh-600' 
                  : 'text-gray-700 hover:text-fresh-600'
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-fresh-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="text-gray-700 hover:text-fresh-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-fresh-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative flex items-center">
                <Link 
                  to={isAdmin ? "/admin" : "/account"} 
                  className="text-gray-700 hover:text-fresh-600 transition-colors flex items-center"
                >
                  <User className="w-5 h-5" />
                  <span className="ml-2 text-sm">{user?.name}</span>
                </Link>
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="ml-4 text-gray-700 hover:text-fresh-600 transition-colors flex items-center"
                  >
                    <Package className="w-5 h-5" />
                    <span className="ml-1 text-sm">Admin</span>
                  </Link>
                )}
              </div>
            ) : (
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center text-gray-700 hover:text-fresh-600"
                asChild
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
            
            <Button 
              className="bg-fresh-600 hover:bg-fresh-700 text-white px-5 py-2 rounded-full shadow-md btn-hover"
              asChild
            >
              <Link to="/shop">
                Order Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="text-gray-700 hover:text-fresh-600 transition-colors relative mr-2">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-fresh-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button 
              className="text-gray-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container mx-auto px-4 pt-4 pb-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium py-2 ${
                  location.pathname === '/' 
                    ? 'text-fresh-600' 
                    : 'text-gray-700 hover:text-fresh-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`font-medium py-2 ${
                  location.pathname === '/shop' 
                    ? 'text-fresh-600' 
                    : 'text-gray-700 hover:text-fresh-600'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className={`font-medium py-2 ${
                  location.pathname === '/about' 
                    ? 'text-fresh-600' 
                    : 'text-gray-700 hover:text-fresh-600'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium py-2 ${
                  location.pathname === '/contact' 
                    ? 'text-fresh-600' 
                    : 'text-gray-700 hover:text-fresh-600'
                }`}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className={`font-medium py-2 ${
                  location.pathname === '/faq' 
                    ? 'text-fresh-600' 
                    : 'text-gray-700 hover:text-fresh-600'
                }`}
              >
                FAQ
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to={isAdmin ? "/admin" : "/account"}  
                    className="font-medium py-2 flex items-center text-gray-700 hover:text-fresh-600"
                  >
                    <User className="w-5 h-5 mr-2" />
                    {user?.name}
                  </Link>
                  
                  {isAdmin && (
                    <Link 
                      to="/admin"  
                      className="font-medium py-2 flex items-center text-gray-700 hover:text-fresh-600"
                    >
                      <Package className="w-5 h-5 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={() => logout()}
                    className="font-medium py-2 text-left text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="font-medium py-2 flex items-center text-gray-700 hover:text-fresh-600"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login / Register
                </Link>
              )}
              
              <Button 
                className="bg-fresh-600 hover:bg-fresh-700 text-white mt-4 py-2 rounded-full shadow-md w-full"
                asChild
              >
                <Link to="/shop">
                  Order Now
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
