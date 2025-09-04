// SegmentedProgressBar.jsx
import React from "react";

export default function ProgressBar({ value = 2.7, max = 6 }) {
  const segments = [
    { max: 2.5, color: "bg-green-500" },
    { max: 4, color: "bg-orange-400" },
    { max: max, color: "bg-red-500" },
  ];

  const percent = Math.min((value / max) * 100, 100);

  const knobColor =
    value <= 2.5 ? "bg-green-500" : value <= 4 ? "bg-orange-400" : "bg-red-500";

  return (
    <div className="relative w-2xs mx-auto"> {/* Now uses custom w-2xs */}
      {/* Segmented bar */}
      <div className="flex w-full h-2 rounded-md overflow-hidden">
        {segments.map((seg, i) => {
          const prevMax = i === 0 ? 0 : segments[i - 1].max;
          const widthPercent = ((seg.max - prevMax) / max) * 100;
          return (
            <div
              key={i}
              className={`${seg.color}`}
              style={{ width: `${widthPercent}%` }}
            />
          );
        })}
      </div>

      {/* Knob with value */}
      <div
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ left: `${percent}%`, transform: "translate(-50%, -50%)" }}
      >
        <span
          className={`mb-1 text-xs font-semibold text-white px-1.5 py-0.5 rounded ${knobColor}`}
        >
          {value}
        </span>

        <div
          className={`w-3 h-3 border-2 border-white rounded-full shadow ${knobColor}`}
        />
      </div>
    </div>
  );
}
