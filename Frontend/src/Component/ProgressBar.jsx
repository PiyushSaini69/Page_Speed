import React from "react";

export default function ProgressBar({ value }) {
  // Decide color based on the range
  let colorClass = "bg-green-500";
  if (value >= 2.5 && value <= 4) {
    colorClass = "bg-orange-500";
  } else if (value > 4) {
    colorClass = "bg-red-500";
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
      {/* Progress Fill */}
      <div
        className={`${colorClass} h-6 rounded-full transition-all duration-300 flex items-center justify-center`}
        style={{ width: `${(value / 5) * 100}%` }} // normalize to 0–5 scale
      >
        {/* Value Text */}
        <span className="text-white text-sm font-semibold">{value}s</span>
      </div>
    </div>
  );
}
