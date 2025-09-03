import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      {/* Left side - Text */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        🔍 Page Speed Insight
      </h1>

      {/* Right side - Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-100"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
