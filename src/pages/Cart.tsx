
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  
  // Shipping options
  const shippingOptions = [
    { id: "free", name: "Free Shipping", price: 0, days: "5-7" },
    { id: "standard", name: "Standard Shipping", price: 9.99, days: "2-4" },
    { id: "express", name: "Express Shipping", price: 19.99, days: "1-2" }
  ];
  
  // State for selected shipping option
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  
  // Calculate order total
  const calculateTotal = () => {
    return (subtotal + selectedShipping.price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4">
                    <div className="col-span-6 text-sm font-medium text-gray-600">Product</div>
                    <div className="col-span-2 text-sm font-medium text-gray-600 text-center">Price</div>
                    <div className="col-span-2 text-sm font-medium text-gray-600 text-center">Quantity</div>
                    <div className="col-span-2 text-sm font-medium text-gray-600 text-center">Subtotal</div>
                  </div>
                  
                  {/* Cart Item List */}
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 p-4 border-b border-gray-100 items-center">
                      {/* Product */}
                      <div className="col-span-6 flex items-center mb-4 sm:mb-0">
                        <Link to={`/product/${item.id}`} className="shrink-0 w-16 h-16 mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded" 
                          />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="text-gray-800 font-medium hover:text-fresh-600">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center sm:text-center text-gray-600 font-medium mb-4 sm:mb-0">
                        <span className="sm:hidden inline-block mr-2 text-gray-500">Price:</span>
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center mb-4 sm:mb-0">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-fresh-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-fresh-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-gray-500">Subtotal:</span>
                        <span className="text-gray-800 font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="ml-4 text-gray-400 hover:text-red-500 sm:absolute sm:right-4"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="mt-6 flex flex-wrap gap-4 justify-between">
                  <Link to="/shop">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-gray-800 font-medium mb-2">Shipping</h3>
                      <div className="space-y-2">
                        {shippingOptions.map((option) => (
                          <label key={option.id} className="flex items-center">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={selectedShipping.id === option.id}
                              onChange={() => setSelectedShipping(option)}
                              className="mr-2"
                            />
                            <span className="text-gray-600 flex-1">{option.name} ({option.days} days)</span>
                            <span className="text-gray-800 font-medium">
                              {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-800">Total</span>
                        <span className="text-fresh-600">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/checkout">
                    <Button className="w-full bg-fresh-600 hover:bg-fresh-700 flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/shop">
                <Button className="bg-fresh-600 hover:bg-fresh-700">Start Shopping</Button>
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
