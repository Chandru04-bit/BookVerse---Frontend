// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// 🧩 Context Providers
import { AuthProvider } from "./components/context/AuthContext.jsx";
import { MessageProvider } from "./components/context/MessageContext.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Wrap in correct order (Auth first so others can use it if needed) */}
      <AuthProvider>
        <MessageProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
