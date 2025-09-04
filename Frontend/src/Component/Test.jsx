import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import CirculerProgress from "./CirculerProgress";
import Dashboard from "./DashBoard";
import MetricCard from "./DashBoard";
import Performance from "./Performance";
import SeoChecker from "./SeoChecker";

export default function Test() {
  const [value, setValue] = useState(3.5);
  const [progress, setProgress] = useState(91);
  return (
    <div className="p-8">
      <SeoChecker/>
      
      {/* <ProgressBar value={value}  /> */}
      {/* <Dashboard   />
     */}
     <Performance/>
       
     
      
      {/* <CirculerProgress value={progress} /> */}
    </div>
  );
}