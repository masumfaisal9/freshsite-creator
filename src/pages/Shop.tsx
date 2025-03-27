
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Sample product data
const products = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    price: 5.99,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Fruits",
    isNew: true,
    isSale: false,
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
  },
  {
    id: "3",
    name: "Free Range Eggs",
    price: 4.99,
    originalPrice: 5.99,
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "Dairy & Eggs",
    isNew: false,
    isSale: true,
  },
  {
    id: "4",
    name: "Fresh Chicken Breast",
    price: 12.99,
    originalPrice: 14.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Meat & Fish",
    isNew: false,
    isSale: true,
  },
  {
    id: "5",
    name: "Organic Spinach",
    price: 2.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "Vegetables",
    isNew: true,
    isSale: false,
  },
  {
    id: "6",
    name: "Whole Grain Bread",
    price: 3.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
    category: "Bakery",
    isNew: false,
    isSale: false,
  },
  {
    id: "7",
    name: "Atlantic Salmon",
    price: 18.99,
    originalPrice: 21.99,
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Meat & Fish",
    isNew: false,
    isSale: true,
  },
  {
    id: "8",
    name: "Organic Avocados",
    price: 6.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
    category: "Fruits",
    isNew: true,
    isSale: false,
  },
];

const categories = [
  "Fruits",
  "Vegetables",
  "Meat & Fish",
  "Dairy & Eggs",
  "Bakery",
  "Beverages",
  "Snacks",
  "Organic",
];

const Shop = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 20]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter products based on search term, price range, and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0; // featured - no specific sorting
    }
  });

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Toggle category selection
  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 20]);
    setSelectedCategory(null);
    setSortOption("featured");
  };

  // Toggle mobile filters visibility
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Our Products
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-4">
                Fresh Organic Products
              </h1>
              <p className="text-gray-600 mt-4 md:text-lg">
                Browse our selection of fresh, organic, and locally sourced products.
              </p>
            </div>
          </div>
        </div>

        {/* Shop Section */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          {/* Search and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="hidden md:block">
                <Label htmlFor="sort" className="mr-2">Sort by:</Label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
              
              <Button 
                onClick={toggleFilters}
                variant="outline" 
                className="md:hidden flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => handleCategorySelect(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-gray-700 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 20]}
                    max={20}
                    step={0.5}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">${priceRange[0].toFixed(2)}</span>
                    <span className="text-gray-700">${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
                <RadioGroup value={sortOption} onValueChange={setSortOption}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="featured" id="featured" />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-low" id="price-low" />
                    <Label htmlFor="price-low">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-high" id="price-high" />
                    <Label htmlFor="price-high">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name-asc" id="name-asc" />
                    <Label htmlFor="name-asc">Name: A to Z</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name-desc" id="name-desc" />
                    <Label htmlFor="name-desc">Name: Z to A</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>

            {/* Filters - Mobile */}
            {filtersOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                <div className="bg-white h-full w-80 max-w-full p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={toggleFilters}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategory === category}
                              onCheckedChange={() => handleCategorySelect(category)}
                            />
                            <label
                              htmlFor={`mobile-category-${category}`}
                              className="ml-2 text-gray-700 cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[0, 20]}
                          max={20}
                          step={0.5}
                          value={priceRange}
                          onValueChange={handlePriceChange}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">${priceRange[0].toFixed(2)}</span>
                          <span className="text-gray-700">${priceRange[1].toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
                      <RadioGroup value={sortOption} onValueChange={setSortOption}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="featured" id="mobile-featured" />
                          <Label htmlFor="mobile-featured">Featured</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="price-low" id="mobile-price-low" />
                          <Label htmlFor="mobile-price-low">Price: Low to High</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="price-high" id="mobile-price-high" />
                          <Label htmlFor="mobile-price-high">Price: High to Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="name-asc" id="mobile-name-asc" />
                          <Label htmlFor="mobile-name-asc">Name: A to Z</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="name-desc" id="mobile-name-desc" />
                          <Label htmlFor="mobile-name-desc">Name: Z to A</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <Button onClick={toggleFilters}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice || undefined}
                      image={product.image}
                      category={product.category}
                      isNew={product.isNew || false}
                      isSale={product.isSale || false}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">No products found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your filters or search term</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
