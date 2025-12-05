import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaTag } from "react-icons/fa";
import { useCart } from "../components/context/CartContext";
import { useMessage } from "../components/context/MessageContext";

const Cart = () => {
  const {
    cartItems = [],
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal = 0,
    discount = 0,
    total = 0,
    cartCount = 0,
  } = useCart();

  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // ✅ Always ensure safe numeric calculations
  const safeSubtotal = Number(subtotal) || 0;
  const safeDiscount = Number(discount) || 0;
  const safeTotal = Number(total) || 0;
  const discountedTotal = safeTotal - safeTotal * appliedDiscount;

  // ✅ Scroll helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Navigate to book details
  const handleBookClick = (book) => {
    if (!book || !book._id) {
      showMessage("Unable to open book details. Try again.", "error");
      return;
    }
    scrollToTop();
    navigate(`/book/${book._id}`);
  };

  // ✅ Coupon logic
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      showMessage("⚠️ Please enter a coupon code.", "warning");
    } else if (code === "BOOK10") {
      setAppliedDiscount(0.1);
      showMessage("🎉 Coupon applied! You got 10% off.", "success");
    } else if (code === "BOOK20") {
      setAppliedDiscount(0.2);
      showMessage("🔥 Big Save! You got 20% off.", "success");
    } else {
      setAppliedDiscount(0);
      showMessage("❌ Invalid coupon code.", "error");
    }
  };

  // ✅ Checkout
  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      return showMessage("⚠️ Your cart is empty.", "warning");
    }
    scrollToTop();
    navigate("/checkout", {
      state: {
        cartItems,
        subtotal: safeSubtotal,
        discount: safeDiscount,
        appliedDiscount,
        total: safeTotal,
        discountedTotal,
      },
    });
  };

  // ✅ Empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-semibold mb-2">🛒 Your cart is empty</h2>
          <p className="text-gray-500 mb-4">
            Browse our collection and add some books.
          </p>
          <button
            onClick={() => {
              scrollToTop();
              navigate("/explore");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Explore Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Your Cart ({cartCount} {cartCount > 1 ? "items" : "item"})
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ✅ Cart Items */}
        <div className="lg:flex-1 bg-white rounded-2xl shadow p-6 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => {
              const itemPrice = Number(item.price) || 0;
              const itemQuantity = Number(item.quantity) || 1;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col sm:flex-row items-center sm:justify-between border-b pb-4 gap-4"
                >
                  <div
                    className="flex items-center gap-4 flex-1 w-full cursor-pointer hover:bg-gray-50 rounded-md p-2 transition"
                    onClick={() => handleBookClick(item)}
                  >
                    <div className="w-24 h-32 flex items-center justify-center bg-gray-100 rounded-md shadow-sm p-2">
                      <img
                        src={
                          item.img || item.image || "/assets/images/fallback.jpg"
                        }
                        alt={item.title || "Book"}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) =>
                          (e.target.src = "/assets/images/fallback.jpg")
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.title || "Untitled"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        ₹{itemPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <motion.div
                      className="flex items-center border rounded-md overflow-hidden"
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item._id, itemQuantity - 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-3 py-1 font-medium">
                        {itemQuantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, itemQuantity + 1)
                        }
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200"
                      >
                        <FaPlus />
                      </button>
                    </motion.div>

                    <motion.button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash size={14} /> Remove
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ✅ Order Summary */}
        <aside className="lg:w-80 bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">
              ₹{safeSubtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span className="font-medium">
              ₹{safeDiscount.toFixed(2)}
            </span>
          </div>

          {appliedDiscount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Coupon ({(appliedDiscount * 100).toFixed(0)}%)</span>
              <span>-₹{(safeTotal * appliedDiscount).toFixed(2)}</span>
            </div>
          )}

          <div className="border-t pt-3 flex justify-between text-lg font-bold">
            <span>Total</span>
            <motion.span
              key={discountedTotal}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              ₹{Number(discountedTotal).toFixed(2)}
            </motion.span>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
              <FaTag /> Have a coupon?
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Enter coupon code (BOOK10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button
              onClick={() => {
                scrollToTop();
                navigate("/explore");
              }}
              className="w-full bg-white border text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
