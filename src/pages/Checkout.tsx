
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Home, ShoppingCart, ArrowRight, ChevronsRight } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Form state
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [orderNotes, setOrderNotes] = useState("");
  const [saveInfo, setSaveInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Calculate shipping cost based on method
  const getShippingCost = () => {
    switch (shippingMethod) {
      case "express":
        return 19.99;
      case "standard":
        return 9.99;
      case "free":
      default:
        return 0;
    }
  };
  
  // Calculate total
  const total = subtotal + getShippingCost();
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      navigate("/order-success");
    }, 1500);
  };
  
  // If cart is empty, don't render checkout form
  if (items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-fresh-600 transition-colors">Home</Link>
            <ChevronsRight className="mx-2 h-4 w-4" />
            <Link to="/cart" className="hover:text-fresh-600 transition-colors">Cart</Link>
            <ChevronsRight className="mx-2 h-4 w-4" />
            <span className="text-gray-700 font-medium">Checkout</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Login Prompt */}
                {!isAuthenticated && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <p className="text-gray-600">
                      Returning customer? 
                      <Link to="/login" className="text-fresh-600 hover:underline ml-1">
                        Log in
                      </Link>
                    </p>
                  </div>
                )}
                
                {/* Billing Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Billing Details</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input 
                        id="first-name" 
                        required
                        defaultValue={isAuthenticated ? "John" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input 
                        id="last-name" 
                        required
                        defaultValue={isAuthenticated ? "Doe" : ""}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input id="company" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input 
                        id="address" 
                        placeholder="House number and street name" 
                        required
                        defaultValue={isAuthenticated ? "123 Main St" : ""}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address2">Apartment, suite, etc. (Optional)</Label>
                      <Input id="address2" placeholder="Apartment, suite, unit, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City / Town *</Label>
                      <Input 
                        id="city" 
                        required
                        defaultValue={isAuthenticated ? "New York" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input 
                        id="state" 
                        required
                        defaultValue={isAuthenticated ? "NY" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP / Postal Code *</Label>
                      <Input 
                        id="zip" 
                        required
                        defaultValue={isAuthenticated ? "10001" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input 
                        id="country" 
                        required
                        defaultValue={isAuthenticated ? "United States" : ""}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required
                        defaultValue={isAuthenticated ? "555-123-4567" : ""}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required
                        defaultValue={isAuthenticated ? "john.doe@example.com" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    <Checkbox 
                      id="save-info" 
                      checked={saveInfo}
                      onCheckedChange={(checked) => setSaveInfo(checked === true)}
                    />
                    <label
                      htmlFor="save-info"
                      className="ml-2 text-gray-600 text-sm cursor-pointer"
                    >
                      Save this information for faster checkout next time
                    </label>
                  </div>
                </div>
                
                {/* Shipping Method */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="free"
                        checked={shippingMethod === "free"}
                        onChange={() => setShippingMethod("free")}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Free Shipping</div>
                        <div className="text-sm text-gray-500">5-7 business days</div>
                      </div>
                      <div className="font-medium">Free</div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-500">2-4 business days</div>
                      </div>
                      <div className="font-medium">$9.99</div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-gray-500">1-2 business days</div>
                      </div>
                      <div className="font-medium">$19.99</div>
                    </label>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="mr-3"
                      />
                      <div className="flex-1 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                        <span>Credit / Debit Card</span>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span>PayPal</span>
                      </div>
                    </label>
                  </div>
                  
                  {paymentMethod === "credit-card" && (
                    <div className="mt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number *</Label>
                        <Input 
                          id="card-number" 
                          placeholder="XXXX XXXX XXXX XXXX" 
                          required={paymentMethod === "credit-card"}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="expiry">Expiration Date (MM/YY) *</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM / YY" 
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC *</Label>
                          <Input 
                            id="cvc" 
                            placeholder="CVC" 
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-on-card">Name on Card *</Label>
                        <Input 
                          id="name-on-card" 
                          placeholder="Name as it appears on your card" 
                          required={paymentMethod === "credit-card"}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Order Notes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="order-notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="order-notes"
                      placeholder="Notes about your order, e.g. special delivery instructions"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="h-24"
                    />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-28">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                {/* Order Items */}
                <div className="max-h-64 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex py-3 border-b border-gray-100">
                      <div className="w-16 h-16 shrink-0 mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-medium">{item.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500 text-sm">{item.quantity} × ${item.price.toFixed(2)}</span>
                          <span className="text-gray-800 font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Total Calculations */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800 font-medium">
                      {getShippingCost() === 0 ? "Free" : `$${getShippingCost().toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <span className="text-gray-800 font-semibold">Total</span>
                    <span className="text-fresh-600 font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <Button 
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full mt-8 bg-fresh-600 hover:bg-fresh-700 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Place Order <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
                
                {/* Security Notice */}
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    Your personal data will be used to process your order, support your experience, and for other purposes described in our privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
