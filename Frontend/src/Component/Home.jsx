import React, { useState } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import Dashboard from "./DashBoard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDesktopSelected, setIsDesktopSelected] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: url }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      // Desktop Data
      const desktopdata = {
        url: result.desktop?.lighthouseResult?.finalUrl || url,
        totalTiming: result.desktop?.lighthouseResult?.timing?.total || "N/A",
        performance:
          (result.desktop?.lighthouseResult?.categories?.performance?.score ?? 0) *
            100 || "N/A",
        fcp: result.desktop?.lighthouseResult?.audits?.["first-contentful-paint"]?.displayValue || "N/A",
        lcp: result.desktop?.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue || "N/A",
        cls: result.desktop?.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue || "N/A",
        tbt: result.desktop?.lighthouseResult?.audits?.["total-blocking-time"]?.displayValue || "N/A",
        inp: result.desktop?.lighthouseResult?.audits?.["experimental-interaction-to-next-paint"]?.displayValue ||
             result.desktop?.lighthouseResult?.audits?.["interaction-to-next-paint"]?.displayValue || "N/A",
        ttfb: result.desktop?.lighthouseResult?.audits?.["server-response-time"]?.displayValue || "N/A",
      };

      // Mobile Data
      const mobiledata = {
        url: result.mobile?.lighthouseResult?.finalUrl || url,
        totalTiming: result.mobile?.lighthouseResult?.timing?.total || "N/A",
        performance:
          (result.mobile?.lighthouseResult?.categories?.performance?.score ?? 0) * 100 || "N/A",
        fcp: result.mobile?.lighthouseResult?.audits?.["first-contentful-paint"]?.displayValue || "N/A",
        lcp: result.mobile?.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue || "N/A",
        cls: result.mobile?.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue || "N/A",
        tbt: result.mobile?.lighthouseResult?.audits?.["total-blocking-time"]?.displayValue || "N/A",
        inp: result.mobile?.lighthouseResult?.audits?.["experimental-interaction-to-next-paint"]?.displayValue ||
             result.mobile?.lighthouseResult?.audits?.["interaction-to-next-paint"]?.displayValue || "N/A",
        ttfb: result.mobile?.lighthouseResult?.audits?.["server-response-time"]?.displayValue || "N/A",
      };

      setDesktopData(desktopdata);
      setMobileData(mobiledata);
      setUrl("");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pick data based on selected tab
  const displayData = isDesktopSelected ? desktopData : mobileData;

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🚀 Website Performance Checker
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg flex flex-col items-center"
        >
          <input
            type="url"
            placeholder="Enter your website URL..."
            value={url}
            className="border-2 border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 rounded-xl px-4 py-2 w-full mb-4 outline-none"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Performance
          </button>
        </form>

        {loading && (
          <div className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
            ⏳ Analyzing website... Please wait
          </div>
        )}

        {desktopData && mobileData && (
          <div className="flex justify-center items-center mt-10 space-x-4">
            <Button onClick={() => setIsDesktopSelected(true)}>🖥️ Desktop</Button>
            <Button onClick={() => setIsDesktopSelected(false)}>📱 Mobile</Button>
          </div>
        )}

        {/* Results Section */}
        {displayData && (
          <div className="mt-10 w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">✅ Results</h2>

            <div className="grid gap-4">
              <h2>For {isDesktopSelected ? "Desktop" : "Mobile"}:</h2>
              <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-xl transition">
                <div>
                  <p className="font-medium text-lg text-gray-800">
                    🌍 {displayData.url}
                  </p>
                  <p className="text-sm text-gray-500">
                    Timing: {displayData.totalTiming} ms
                  </p>
                </div>
                <span
                  className={`mt-3 md:mt-0 px-4 py-2 rounded-lg text-white font-bold ${
                    displayData.performance >= 80
                      ? "bg-green-500"
                      : displayData.performance >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {displayData.performance}%
                </span>
              </div>

              <div className="bg-white shadow-md rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="font-semibold text-gray-700">FCP</p>
                  <p className="text-gray-600">{displayData.fcp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">LCP</p>
                  <p className="text-gray-600">{displayData.lcp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">CLS</p>
                  <p className="text-gray-600">{displayData.cls}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">TBT</p>
                  <p className="text-gray-600">{displayData.tbt}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">INP</p>
                  <p className="text-gray-600">{displayData.inp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">TTFB</p>
                  <p className="text-gray-600">{displayData.ttfb}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dashboard/>
      {/* <Performance/> */}
    </>
  );
}
