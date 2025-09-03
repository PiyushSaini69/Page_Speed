import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Button({ children }) {
//   const [active, setActive] = useState(false);

  return (
   
        <button
     className="px-6 py-2 ml-2 mr-2 rounded-md font-medium shadow-lg 
        transition-colors duration-300 focus:outline-none 
        focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 
        hover:bg-gray-700 "
      
    >
      {children}
    </button>

  );
}
