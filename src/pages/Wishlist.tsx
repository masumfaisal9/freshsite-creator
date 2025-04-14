
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { X, ShoppingCart } from "lucide-react";

// Sample product database (in a real app this would come from API)
const productsDatabase = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Fruits",
  },
  {
    id: "2",
    name: "Organic Carrots",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Vegetables",
  },
  {
    id: "3",
    name: "Free Range Eggs",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "Dairy & Eggs",
  },
  // More products...
];

const Wishlist = () => {
  const { favorites, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // Get product details for each favorite ID
  const wishlistItems = favorites.map(id => 
    productsDatabase.find(product => product.id === id)
  ).filter(Boolean);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
          
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {wishlistItems.map((product: any) => (
                <div 
                  key={product.id} 
                  className="flex flex-col sm:flex-row items-center border rounded-lg p-4 gap-4"
                >
                  <div className="w-24 h-24 shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                  
                  <div className="flex-1 sm:ml-2">
                    <Link to={`/product/${product.id}`} className="font-medium text-gray-800 hover:text-fresh-600">
                      {product.name}
                    </Link>
                    <p className="text-fresh-600 font-semibold mt-1">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                    <Button 
                      onClick={() => handleAddToCart(product)} 
                      className="bg-fresh-600 hover:bg-fresh-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => removeFromWishlist(product.id, product.name)} 
                      className="text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Add items you love to your wishlist</p>
              <Button asChild className="bg-fresh-600 hover:bg-fresh-700">
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
