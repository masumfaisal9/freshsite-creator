
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound, ShoppingBag, Heart, CreditCard, LogOut, MapPin } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Mock order history
  const orders = [
    { id: "ORD-1234", date: "2023-06-15", status: "Delivered", total: 78.95 },
    { id: "ORD-5678", date: "2023-05-28", status: "Processing", total: 45.50 },
  ];
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar */}
            <div className="bg-white border rounded-lg p-6 h-fit">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserRound size={40} className="text-gray-500" />
                </div>
                <h2 className="font-semibold text-gray-800">{user?.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
              </div>
              
              <hr className="my-4" />
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/account">
                    <UserRound className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/account?tab=orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/account?tab=addresses">
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/account?tab=payment">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Link>
                </Button>
                <hr className="my-2" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="bg-white border rounded-lg p-6">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <h3 className="text-xl font-semibold">Profile Information</h3>
                  <div className="grid gap-6 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountEmail">Email</Label>
                      <Input id="accountEmail" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Add your phone number" />
                    </div>
                    <Button className="bg-fresh-600 hover:bg-fresh-700">Save Changes</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders">
                  <h3 className="text-xl font-semibold mb-6">Order History</h3>
                  {orders.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="link" size="sm" className="text-fresh-600">
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Button asChild>
                        <Link to="/shop">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="addresses">
                  <h3 className="text-xl font-semibold mb-6">My Addresses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Address */}
                    <div className="border rounded-lg p-4 relative">
                      <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        Default
                      </span>
                      <h4 className="font-medium">Home</h4>
                      <p className="text-gray-600 text-sm mt-2">
                        123 Main Street<br />
                        Apt 4B<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    {/* Add New Address Card */}
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-[200px]">
                      <MapPin className="h-8 w-8 text-gray-400 mb-2" />
                      <h4 className="font-medium text-gray-600">Add New Address</h4>
                      <p className="text-gray-500 text-sm mt-2 mb-4">
                        Add a new delivery address for your orders
                      </p>
                      <Button variant="outline">Add Address</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
