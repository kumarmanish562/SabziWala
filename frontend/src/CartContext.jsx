import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      // Ensure we always return an array
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
      return [];
    }
  });
   
  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (Array.isArray(cart)) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add an item to cart or increase quantity
  const addtoCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      // Ensure prevCart is always an array
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      const existingItem = cartArray.find((ci) => ci.id === item.id);
      if (existingItem) {
        return cartArray.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      } else {
        return [...cartArray, { ...item, quantity }];
      }
    });
  };

  // Remove an item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.filter((ci) => ci.id !== itemId);
    });
  };

  // Update an item quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.map((ci) =>
        ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
      );
    });
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price of cart
  const getCartTotal = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, ci) => total + (ci.price || 0) * (ci.quantity || 0), 0);
  };

  // Calculate total items in cart
  const cartCount = Array.isArray(cart) ? cart.reduce((count, ci) => count + (ci.quantity || 0), 0) : 0;

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addtoCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};