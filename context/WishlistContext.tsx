"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 定义收藏商品的格式
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. 初始化：从浏览器本地加载数据
  useEffect(() => {
    const saved = localStorage.getItem("titan_wishlist");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // 2. 监听变化：一旦 items 变了，就自动存入浏览器
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("titan_wishlist", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev; // 如果有了就不重复加
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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

// 导出这个 Hook 供其他组件使用
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}