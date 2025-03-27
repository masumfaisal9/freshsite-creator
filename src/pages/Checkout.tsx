
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample cart summary data
const cartSummary = {
  subtotal: 14.97,
  discount: 1.50,
  shipping: 0,
  total: 13.47,
  items: [
    {
      id: "1",
      name: "Fresh Organic Apples",
      price: 5.99,
      quantity: 2,
    },
    {
      id: "5",
      name: "Organic Spinach",
      price: 2.99,
      quantity: 1,
    },
  ],
};

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [saveInfo, setSaveInfo] = useState(false);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOrderProcessed(true);
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase. Your order is being processed.",
      });
    }, 1500);
  };

  if (orderProcessed) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 lg:pt-32">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
                You will receive an email confirmation shortly.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Order Number:</span>
                    <span className="font-medium text-gray-800">#BF{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Order Date:</span>
                    <span className="font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total Amount:</span>
                    <span className="font-medium text-gray-800">${cartSummary.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Payment Method:</span>
                    <span className="font-medium text-gray-800">
                      {paymentMethod === "credit-card" ? "Credit Card" : 
                       paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-fresh-600 hover:bg-fresh-700 rounded-full">
                    Back to Home
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full">
                  View Order Details
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex items-center mb-8">
            <Link to="/cart" className="text-gray-600 hover:text-fresh-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={processOrder}>
                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input 
                          id="first-name" 
                          placeholder="Enter your first name" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input 
                          id="last-name" 
                          placeholder="Enter your last name" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          placeholder="Enter your street address" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          placeholder="Enter your city" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input 
                          id="postal-code" 
                          placeholder="Enter your postal code" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state" 
                          placeholder="Enter your state or province" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select 
                          id="country" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fresh-500"
                          required
                        >
                          <option value="">Select a country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="BD">Bangladesh</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 flex items-center space-x-2">
                        <Checkbox id="save-info" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(!!checked)} />
                        <label htmlFor="save-info" className="text-gray-600 cursor-pointer">
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                            <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                            <span>Credit / Debit Card</span>
                          </Label>
                        </div>
                        
                        {paymentMethod === "credit-card" && (
                          <div className="pl-8 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input 
                                id="card-number" 
                                placeholder="1234 5678 9012 3456" 
                                required={paymentMethod === "credit-card"} 
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input 
                                  id="expiry" 
                                  placeholder="MM/YY" 
                                  required={paymentMethod === "credit-card"} 
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input 
                                  id="cvc" 
                                  placeholder="123" 
                                  required={paymentMethod === "credit-card"} 
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.0267 6.43179C19.0267 8.86898 17.5949 10.7472 15.2477 10.7472H13.3694C13.1337 10.7472 12.925 10.9111 12.8789 11.1351L12.0916 16.1525C12.0685 16.2702 12 16.5403 12 16.5403C11.9769 16.658 11.8616 16.7528 11.7462 16.7528H9.58968C9.35861 16.7528 9.19584 16.5403 9.24196 16.3279L10.8199 6.83791C10.8661 6.61388 11.0749 6.45 11.3059 6.45H18.1932C18.6544 6.45 19.0267 6.66455 19.0267 6.43179Z" fill="#002987"/>
                              <path d="M8.48702 11.213L9.19583 6.45H11.306C11.0749 6.45 10.866 6.61388 10.8199 6.83791L9.24191 16.3279C9.19579 16.5403 9.35857 16.7528 9.58964 16.7528H11.7461C11.8616 16.7528 11.9769 16.658 12 16.5403C12 16.5403 12.0684 16.2702 12.0915 16.1525L12.8789 11.1351C12.925 10.9111 13.1337 10.7472 13.3694 10.7472H13.2309C11.7461 10.7472 9.86782 10.6642 8.48702 11.213Z" fill="#0085CC"/>
                              <path d="M7.5182 11.4255C7.5182 11.1906 7.70373 11 7.93479 11H9.42267C9.6999 11 9.93096 11.1906 9.97708 11.4255L9.28104 16.3279C9.23492 16.5403 9.3977 16.7528 9.62876 16.7528H7.33876C7.10769 16.7528 6.92217 16.5745 6.94491 16.3497L7.5182 11.4255Z" fill="#00186A"/>
                            </svg>
                            <span>PayPal</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex items-center cursor-pointer">
                            <svg className="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10C2 7.79086 3.79086 6 6 6H18C20.2091 6 22 7.79086 22 10V14C22 16.2091 20.2091 18 18 18H6C3.79086 18 2 16.2091 2 14V10Z" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V6" stroke="currentColor" strokeWidth="2"/>
                              <path d="M19 18V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V18" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>Cash on Delivery</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="lg:hidden mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                    
                    <div className="border-b pb-4 mb-4">
                      {cartSummary.items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2">
                          <span className="text-gray-600">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${cartSummary.subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${cartSummary.discount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>{cartSummary.shipping === 0 ? "Free" : `$${cartSummary.shipping.toFixed(2)}`}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg text-gray-800">
                        <span>Total</span>
                        <span>${cartSummary.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-fresh-600 hover:bg-fresh-700 rounded-full py-3 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>
            
            {/* Order Summary - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm sticky top-32">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="border-b pb-4 mb-4">
                    {cartSummary.items.map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${cartSummary.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${cartSummary.discount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{cartSummary.shipping === 0 ? "Free" : `$${cartSummary.shipping.toFixed(2)}`}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg text-gray-800">
                      <span>Total</span>
                      <span>${cartSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
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
