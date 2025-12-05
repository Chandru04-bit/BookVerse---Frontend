
// src/components/Loader.jsx
import React from "react";

const Loader = ({ variant = "spinner", size = "md", text = "Loading...", count = 3, className = "" }) => {
  if (variant === "skeleton") {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-6 bg-gray-300 rounded w-full"></div>
        ))}
      </div>
    );
  }

  const sizeClasses =
    size === "sm"
      ? "w-6 h-6 border-2"
      : size === "lg"
      ? "w-12 h-12 border-4"
      : "w-8 h-8 border-3";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`border-t-transparent border-blue-600 border-solid rounded-full animate-spin ${sizeClasses}`}
      ></div>
      {text && <p className="mt-3 text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

// ✅ Default export (fixes your error)
export default Loader;
