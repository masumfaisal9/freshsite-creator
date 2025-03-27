
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isSale = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {isSale && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div 
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}
        >
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite 
                ? "bg-red-500 text-white" 
                : "bg-white text-gray-700 hover:bg-fresh-500 hover:text-white"
            }`}
            onClick={toggleFavorite}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        
        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-gray-800 font-medium text-lg hover:text-fresh-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2">
          <span className="text-fresh-600 font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through ml-2 text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <Button 
            className="w-full bg-fresh-600 hover:bg-fresh-700 text-white rounded-full flex items-center justify-center gap-2 py-2 transition-all btn-hover"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
