
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quantity: 2,
  },
  {
    id: "5",
    name: "Organic Spinach",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Apply discount if coupon is applied
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount
  
  // Shipping fee
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  // Calculate total
  const total = subtotal - discount + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast("Item removed", {
      description: "The item has been removed from your cart",
    });
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "fresh10") {
      setCouponApplied(true);
      toast.success("Coupon applied", {
        description: "10% discount has been applied to your order",
      });
    } else {
      toast.error("Invalid coupon", {
        description: "The coupon code you entered is invalid or expired",
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponApplied(false);
    setCouponCode("");
    toast("Cart cleared", {
      description: "All items have been removed from your cart",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-gray-600 font-medium border-b">
                    <div className="col-span-6 md:col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                      <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-fresh-600">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 flex md:justify-center">
                        <span className="md:hidden font-medium text-gray-500 mr-2">Price:</span>
                        <span className="text-gray-800">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                        <span className="md:hidden font-medium text-gray-500 mr-2">Quantity:</span>
                        <div className="flex items-center border border-gray-200 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-fresh-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-fresh-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                        <span className="md:hidden font-medium text-gray-500 mr-2">Subtotal:</span>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800 mr-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
                  <Link to="/shop">
                    <Button variant="outline" className="rounded-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="rounded-full text-red-500 border-red-100 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {couponApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-bold text-lg text-gray-800">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-b">
                    <h3 className="font-medium text-gray-800 mb-3">Apply Coupon</h3>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fresh-500"
                      />
                      <Button 
                        onClick={applyCoupon}
                        className="rounded-l-none bg-fresh-600 hover:bg-fresh-700"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Try "FRESH10" for 10% off</p>
                  </div>
                  
                  <div className="p-6">
                    <Link to="/checkout">
                      <Button className="w-full bg-fresh-600 hover:bg-fresh-700 rounded-full mb-4">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        <span>Secure shopping experience</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>Multiple payment options</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Truck className="w-4 h-4 mr-2" />
                        <span>Free shipping over $50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Looks like you haven't added any products to your cart yet. Browse our collection and find something you'll love!
              </p>
              <Link to="/shop">
                <Button className="bg-fresh-600 hover:bg-fresh-700 rounded-full">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
