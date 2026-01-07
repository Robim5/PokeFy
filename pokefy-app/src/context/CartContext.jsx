import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('pokefy-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokefy-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.type === product.type); // type distinguishes poke vs common if ids clash
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.type === product.type)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`Adicionado ${quantity}x ${product.title} ao carrinho!`);
  };

  const removeFromCart = (productId, productType) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && item.type === productType)));
    toast.info('Item removido.');
  };

  const updateQuantity = (productId, productType, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.type === productType) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.warn('Carrinho limpo.');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 10 : 0); // Example: 10 shipping if < 100
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
