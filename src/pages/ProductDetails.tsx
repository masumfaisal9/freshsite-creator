
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { toast } from "sonner";

// Sample products for related products section
const relatedProducts = [
  {
    id: "101",
    name: "Organic Strawberries",
    price: 4.99,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: false,
    isSale: true,
  },
  {
    id: "102",
    name: "Organic Bananas",
    price: 2.49,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: false,
    isSale: false,
  },
  {
    id: "103",
    name: "Fresh Blueberries",
    price: 3.99,
    originalPrice: 4.99,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: true,
    isSale: true,
  },
  {
    id: "104",
    name: "Organic Kiwi",
    price: 1.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: false,
    isSale: false,
  },
];

// Mock database of products
const productsDatabase = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    price: 5.99,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Fruits",
    isNew: true,
    isSale: false,
    rating: 4.8,
    reviewCount: 124,
    description: "Our fresh organic apples are handpicked from local orchards. These crisp, juicy apples are perfect for snacking, baking, or adding to your favorite recipes. Free from pesticides and chemicals, these apples are a healthy choice for you and your family.",
    nutritionInfo: {
      calories: "52",
      protein: "0.3g",
      carbs: "14g",
      fiber: "2.4g",
      sugar: "10g",
      fat: "0.2g",
    },
    stock: 45,
    weight: "1kg",
    farm: "Green Valley Orchards",
    origin: "Washington, USA",
  },
  {
    id: "2",
    name: "Organic Carrots",
    price: 3.49,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Vegetables",
    isNew: false,
    isSale: false,
    rating: 4.5,
    reviewCount: 86,
    description: "Our organic carrots are freshly harvested and packed with nutrients. These vibrant, crunchy carrots are perfect for salads, soups, or as a healthy snack. Grown without synthetic pesticides or fertilizers, they deliver the pure taste of nature.",
    nutritionInfo: {
      calories: "41",
      protein: "0.9g",
      carbs: "10g",
      fiber: "2.8g",
      sugar: "4.7g",
      fat: "0.2g",
    },
    stock: 78,
    weight: "500g",
    farm: "Sunshine Organic Farm",
    origin: "California, USA",
  },
  // More products can be added as needed
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate fetching product details from API
    setLoading(true);
    const foundProduct = productsDatabase.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Reset state when product changes
      setQuantity(1);
      setIsFavorite(false);
    }
    
    setLoading(false);
    
    // Scroll to top when navigating to product details
    window.scrollTo(0, 0);
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast("Added to wishlist", {
        description: `${product?.name} has been added to your wishlist`,
      });
    } else {
      toast("Removed from wishlist", {
        description: `${product?.name} has been removed from your wishlist`,
      });
    }
  };

  const addToCart = () => {
    toast("Added to cart", {
      description: `${quantity} × ${product?.name} added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse space-y-8 w-full max-w-6xl">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mt-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/shop">
              <Button variant="default" className="bg-fresh-600 hover:bg-fresh-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
              </Button>
            </Link>
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
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-fresh-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-fresh-600 transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-fresh-600 transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover object-center rounded-xl"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : i < product.rating 
                            ? "text-yellow-400 fill-yellow-400 opacity-50" 
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-fresh-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through ml-3 text-lg">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-8">
                {product.description}
              </p>
              
              {/* Product Meta */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Availability</span>
                  <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Weight</span>
                  <span className="font-medium text-gray-800">{product.weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Farm</span>
                  <span className="font-medium text-gray-800">{product.farm}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Origin</span>
                  <span className="font-medium text-gray-800">{product.origin}</span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-full">
                  <button 
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-fresh-600 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-fresh-600 disabled:opacity-50"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={addToCart}
                  className="flex-1 bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={toggleFavorite}
                  variant="outline"
                  className={`rounded-full px-4 py-3 flex items-center justify-center ${
                    isFavorite ? "bg-red-50 border-red-200 text-red-500" : ""
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-600">
                Our products are sourced from local farms and suppliers who share our commitment to sustainable and ethical farming practices. We believe in providing our customers with the freshest, highest-quality produce while supporting local communities and protecting the environment.
              </p>
            </TabsContent>
            <TabsContent value="nutrition" className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.nutritionInfo).map(([key, value]) => (
                  <div key={key} className="border border-gray-100 p-4 rounded-lg">
                    <span className="text-gray-500 text-sm capitalize">{key}</span>
                    <p className="font-semibold text-gray-800">{String(value)}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button variant="outline" className="rounded-full">Write a Review</Button>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                  <div className="sm:w-1/4">
                    <p className="font-medium text-gray-800">John D.</p>
                    <div className="flex mt-1 mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">Posted on May 15, 2023</p>
                  </div>
                  <div className="sm:w-3/4">
                    <p className="font-medium text-gray-800 mb-2">Fresh and delicious!</p>
                    <p className="text-gray-600">
                      These are the best I've ever tasted. Extremely fresh and sweet. Will definitely buy again!
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                  <div className="sm:w-1/4">
                    <p className="font-medium text-gray-800">Sarah M.</p>
                    <div className="flex mt-1 mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">Posted on April 28, 2023</p>
                  </div>
                  <div className="sm:w-3/4">
                    <p className="font-medium text-gray-800 mb-2">Great quality</p>
                    <p className="text-gray-600">
                      Very fresh and high quality. Delivery was prompt and everything arrived in perfect condition.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
