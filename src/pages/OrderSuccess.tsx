
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  // Clear cart on successful order completion
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-500 mb-2">Order Number</p>
              <p className="text-xl font-semibold text-gray-800">{orderNumber}</p>
            </div>
            
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email with order details and tracking information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-fresh-600 hover:bg-fresh-700">
                <Link to="/account?tab=orders">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Order
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
