import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [lines, setLines] = useState<any[]>([]);

  const addToCart = (item: any) => setLines(prev => [...prev, item]);
  const removeFromCart = (id: string) => setLines(prev => prev.filter(l => l.productId !== id));
  const clearCart = () => setLines([]);

  return (
    <CartContext.Provider value={{ lines, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);