// ✅ src/components/context/MessageContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  // 🧠 Show message handler
  const showMessage = useCallback((text, type = "info", duration = 2500) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), duration);
  }, []);

  // 🎨 Color map based on message type
  const typeColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}

      {/* ✅ Animated message popup */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-sm z-50 ${
              typeColors[message.type] || typeColors.info
            }`}
          >
            {message.type === "success" && "✅ "}
            {message.type === "error" && "❌ "}
            {message.type === "warning" && "⚠️ "}
            {message.type === "info" && "ℹ️ "}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </MessageContext.Provider>
  );
};
