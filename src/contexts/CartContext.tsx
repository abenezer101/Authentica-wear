
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define types for our cart
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number, size?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("authenticCart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("authenticCart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  // Add item to cart
  const addToCart = (product: Omit<CartItem, "quantity">, quantity = 1, size?: string) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && (!size || item.size === size)
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity for ${product.name}`);
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity, size }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast.success(`Removed ${removedItem.name} from cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
