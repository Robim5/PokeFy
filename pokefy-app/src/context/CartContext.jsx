import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // carregar do localstorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('pokefy-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // persistir carrinho local
  useEffect(() => {
    localStorage.setItem('pokefy-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // add ao carrinho
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.type === product.type); // distingue tipos
      if (existing) {
        // incrementar qtd se existir
        return prev.map((item) =>
          (item.id === product.id && item.type === product.type)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    // mostrar toast
    toast.success(`Adicionado ${quantity}x ${product.title} ao carrinho!`);
  };

  // remover item
  const removeFromCart = (productId, productType) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && item.type === productType)));
    // mostrar toast info
    toast.info('Item removido.');
  };

  // atualizar qtd, mín 1
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

  // limpar carrinho
  const clearCart = () => {
    setCartItems([]);
    // aviso limpar
    toast.warn('Carrinho limpo.');
  };

  // subtotal dos itens
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // portes condicionais
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 10 : 0);
  // total final
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
