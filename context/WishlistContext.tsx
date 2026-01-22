"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // 初始化时从 LocalStorage 读取
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // 每次变动都保存到 LocalStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems([...items, product]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}