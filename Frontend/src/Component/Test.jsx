import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import CirculerProgress from "./CirculerProgress";
import Dashboard from "./DashBoard";
import MetricCard from "./DashBoard";

export default function Test() {
  const [value, setValue] = useState(3.5);
  const [progress, setProgress] = useState(91);
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Progress Bar with Knob</h2>
      <ProgressBar value={value}  />
      <Dashboard   />
       
     
      
      <CirculerProgress value={progress} />
    </div>
  );
}