
import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  {
    id: "1",
    name: "Organic Red Apple",
    price: 3.99,
    originalPrice: 4.99,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: true,
    isSale: false,
  },
  {
    id: "2",
    name: "Fresh Broccoli",
    price: 2.49,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Vegetables",
    isNew: false,
    isSale: false,
  },
  {
    id: "3",
    name: "Organic Strawberries",
    price: 4.99,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: false,
    isSale: true,
  },
  {
    id: "4",
    name: "Free Range Eggs",
    price: 5.49,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1518569656728-7f25e6235099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Dairy",
    isNew: true,
    isSale: false,
  },
  {
    id: "5",
    name: "Fresh Salmon Fillet",
    price: 12.99,
    originalPrice: 15.99,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fish",
    isNew: false,
    isSale: true,
  },
  {
    id: "6",
    name: "Organic Spinach",
    price: 1.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Vegetables",
    isNew: false,
    isSale: false,
  },
  {
    id: "7",
    name: "Grass-Fed Ground Beef",
    price: 8.99,
    originalPrice: 10.99,
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Meat",
    isNew: false,
    isSale: true,
  },
  {
    id: "8",
    name: "Organic Bananas",
    price: 2.49,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Fruits",
    isNew: false,
    isSale: false,
  },
];

const tabs = ["All", "Fruits", "Vegetables", "Meat", "Fish", "Dairy"];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter((product) => product.category === activeTab);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
            Top Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
            Featured Products
          </h2>
          <p className="text-gray-600 mt-4">
            Discover our handpicked selection of premium quality fresh products
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-fresh-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
