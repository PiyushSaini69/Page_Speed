// Report.jsx
import React from "react";
import CirculerProgress from "./CirculerProgress"; // reuse your circular progress bar

// Top Score Item
function ScoreBadge({ label, score }) {
  const color =
    score < 50
      ? "text-red-600 border-red-600"
      : score < 90
      ? "text-yellow-500 border-yellow-500"
      : "text-green-600 border-green-600";

  return (
    <div className={`flex flex-col items-center gap-1`}>
      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold ${color}`}>
        {score}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}

// Metric Row
function MetricRow({ label, value, unit, status }) {
  const color =
    status === "bad"
      ? "text-red-600"
      : status === "avg"
      ? "text-yellow-500"
      : "text-green-600";

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`text-sm font-semibold ${color}`}>
        {value} {unit}
      </span>
    </div>
  );
}

export default function Performance( { performance,
                   FCP,
                   TBT,
                   LCP,
                   CLS,
                   SI,
                  SEO,
                  accessibility,
                  bestpractices}) {
  return (
    <div className="w-full max-w-5xl mb-8 mx-auto p-6 bg-gray-200  rounded-3xl shadow-2xl">
      {/* Header */}
      <h2 className="text-gray-700 font-semibold text-sm mb-4">
        Diagnose performance issues
      </h2>

      {/* Category Scores */}
      <div className="flex justify-center gap-10 mb-6">
         <div className=" flex flex-col justify-center items-center">
            <CirculerProgress value={performance} size={90} stroke={7} />
         <p className="mt-1"> Performance</p>
         </div>
        <div className=" flex flex-col justify-center items-center">
             <CirculerProgress value={accessibility} size={90} stroke={7} />
             <p className="mt-1">Assessability</p>
        </div>
         <div className=" flex flex-col justify-center items-center">
            <CirculerProgress value={bestpractices} size={90} stroke={7} />
            <p className="mt-1">Best Practices</p>
         </div>
         <div className=" flex flex-col justify-center items-center">
        <CirculerProgress value={SEO} size={90} stroke={7} />
        <p className="mt-1">SEO</p>
         </div>
         
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Circular Score + Metrics */}
        <div className="flex flex-col items-center gap-6">
          {/* Circular Progress */}
          <div className="flex flex-col items-center">
            <CirculerProgress value={performance} size={160} stroke={14} />
            <p className="mt-2 text-lg font-medium text-gray-700">Performance</p>
            <p className="text-xs text-gray-500 text-center max-w-sm">
              Values are estimated and may vary. 
        
            </p>
          </div>

          {/* Metrics Table */}
         
        </div>

        {/* Right: Website Preview */}
        <div className="flex justify-center items-start mt-10 border-2 border-black p-2 rounded-3xl">
           <div className="w-full">
            <h3 className="text-xs font-semibold text-gray-600 mb-2">Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MetricRow label="First Contentful Paint" value={FCP}  status="bad" />
                <MetricRow label="Total Blocking Time" value={TBT}  status="bad" />
                <MetricRow label="Speed Index" value={SI}  status="bad" />
              </div>
              <div>
                <MetricRow label="Largest Contentful Paint" value={LCP} unit="" status="bad" />
                <MetricRow label="Cumulative Layout Shift" value={CLS} unit="" status="good" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
