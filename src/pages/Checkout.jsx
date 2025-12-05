// ✅ src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../components/context/CartContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart, subtotal = 0, discount = 0, total = 0 } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Next Step
  const nextStep = () => {
    if (step === 1) {
      const { name, email, address, city, zip } = formData;
      if (!name || !email || !address || !city || !zip) {
        toast.error("⚠️ Please fill all shipping fields.");
        return;
      }
    }

    if (step === 2) {
      if (paymentMethod === "card") {
        const { cardNumber, expiry, cvv } = formData;
        if (!cardNumber || !expiry || !cvv) {
          toast.error("⚠️ Please enter valid card details.");
          return;
        }
      }

      if (paymentMethod === "upi" && !formData.upiId) {
        toast.error("⚠️ Please enter your UPI ID.");
        return;
      }
    }

    scrollToTop();
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    scrollToTop();
    setStep((prev) => prev - 1);
  };

  // Place Order
  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success("🎉 Order placed successfully!");
      setStep(4);
      scrollToTop();
      setTimeout(() => navigate("/"), 3000);
    }, 1500);
  };

  // If cart empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-2">🛒 Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add some books before checkout.</p>
        <button
          onClick={() => navigate("/explore")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Checkout</h1>

      {/* Progress Bar */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= n ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {n}
            </div>
            {n < 3 && (
              <div
                className={`h-1 w-16 sm:w-24 ${
                  step > n ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: SHIPPING */}
            {step === 1 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email", "address", "city", "zip"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                <div className="flex gap-3 mb-6">
                  {["card", "upi", "cod"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 border p-3 rounded-lg font-medium ${
                        paymentMethod === method
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {method === "card"
                        ? "Card"
                        : method === "upi"
                        ? "UPI"
                        : "Cash on Delivery"}
                    </button>
                  ))}
                </div>

                {/* CARD PAYMENT */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                )}

                {/* UPI PAYMENT */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="upiId"
                      placeholder="UPI ID (e.g. name@upi)"
                      value={formData.upiId}
                      onChange={handleChange}
                      className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}

                {/* CASH ON DELIVERY */}
                {paymentMethod === "cod" && (
                  <p className="text-gray-600 border p-4 rounded-lg bg-gray-50">
                    Pay cash when your books arrive.
                  </p>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Review Order →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                <div className="space-y-3 border rounded-lg p-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>{item.title}</span>
                      <span>
                        ₹{Number(item.price * item.quantity || 0).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>₹{Number(total || 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={`px-8 py-3 rounded-lg font-semibold text-white ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {step === 4 && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  ✅ Order Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for shopping. Redirecting to Home...
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Go to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <aside className="lg:w-80 bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{Number(subtotal || 0).toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{Number(discount || 0).toFixed(2)}</span>
            </div>

            <div className="border-t pt-3 font-semibold flex justify-between text-lg">
              <span>Total</span>
              <span>₹{Number(total || 0).toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
