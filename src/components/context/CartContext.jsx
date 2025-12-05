// src/components/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    if (!book || !book._id) return toast.error("Invalid book");

    const existing = cartItems.find((item) => item._id === book._id);

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
      toast.success("Quantity updated!");
      return;
    }

    setCartItems((prev) => [...prev, { ...book, quantity: 1 }]);
    toast.success("Added to cart!");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("Removed from cart!");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  // 🧮 Calculate subtotal
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      ),
    [cartItems]
  );

  // 💸 Discount rule
  const discount = useMemo(() => {
    return subtotal > 500 ? 50 : 0; // Example: ₹50 off for orders above 500
  }, [subtotal]);

  // 🧾 Total
  const total = useMemo(() => {
    return subtotal - discount;
  }, [subtotal, discount]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
