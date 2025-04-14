
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WishlistContextType {
  favorites: string[];
  addToWishlist: (id: string, name: string) => void;
  removeFromWishlist: (id: string, name: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setFavorites(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(favorites));
  }, [favorites]);
  
  const addToWishlist = (id: string, name: string) => {
    setFavorites(prev => {
      if (!prev.includes(id)) {
        toast.success(`Added to wishlist`, {
          description: name
        });
        return [...prev, id];
      }
      return prev;
    });
  };
  
  const removeFromWishlist = (id: string, name: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast.success(`Removed from wishlist`, {
          description: name
        });
        return prev.filter(item => item !== id);
      }
      return prev;
    });
  };
  
  const isInWishlist = (id: string) => favorites.includes(id);
  
  return (
    <WishlistContext.Provider value={{
      favorites,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
