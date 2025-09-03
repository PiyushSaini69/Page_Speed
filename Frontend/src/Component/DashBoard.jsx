// Dashboard.jsx
import React from "react";
import ProgressBar from "./ProgressBar"; // reuse your progress bar
import MetricCard from "./MetricCard";

// Reusable Metric Card


export default function Dashboard({lcpScore,inpScore,clsScore,fcpScore,ttfbScore}) {

  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6 items-center justify-center flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">
          Discover what your real users are experiencing
        </h2>
        <p className="text-sm text-red-600 font-medium">
          Core Web Vitals Assessment: Failed
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <MetricCard label="Largest Contentful Paint (LCP)" value={lcpScore} unit="s" max={6} />
        <MetricCard label="Interaction to Next Paint (INP)" value={inpScore} unit="ms" max={800} />
        <MetricCard label="Cumulative Layout Shift (CLS)" value={clsScore} unit="" max={1} />
      </div>

      {/* Other Notable Metrics */}
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Other Notable Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard label="First Contentful Paint (FCP)" value={fcpScore} unit="s" max={6} />
        <MetricCard label="Time to First Byte (TTFB)" value={ttfbScore} unit="s" max={6} />
      </div>
    </div>
  );
}
