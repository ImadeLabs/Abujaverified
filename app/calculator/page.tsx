"use client";
import React, { useState, useEffect } from 'react';

const buildingBasics = {
  "Self-Contain": { construction: 25000000, time: "4 Months" },
  "2-Bedroom Bungalow": { construction: 45000000, time: "6 Months" },
  "4-Bedroom Luxury Terrace": { construction: 120000000, time: "12 Months" } // 2026 Luxury Rate
};

const currencyMap = { US: "USD", GH: "GHS", RW: "RWF", AU: "AUD", CN: "CNY", RU: "RUB", GB: "GBP", NG: "NGN" };
const exchangeRates = { NGN: 1, USD: 0.00067, GHS: 0.0080, RWF: 1.05, AUD: 0.0010, CNY: 0.0050, RUB: 0.058, GBP: 0.00052 };
const symbols = { NGN: "₦", USD: "$", GHS: "GH₵", RWF: "RF", AUD: "A$", CNY: "¥", RUB: "₽", GBP: "£" };

export default function SmartCalculator() {
  const [houseType, setHouseType] = useState("4-Bedroom Luxury Terrace");
  const [landCost, setLandCost] = useState(40000000);
  const [currency, setCurrency] = useState("NGN");

  // --- AUTOMATIC IP LOOKUP SCRIPT ---
  useEffect(() => {
    fetch('https://api.country.is/')
      .then(res => res.json())
      .then(data => {
        const detectedCurrency = currencyMap[data.country] || "USD";
        setCurrency(detectedCurrency);
      }).catch(() => setCurrency("USD")); // Fallback to USD
  }, []);

  const baseConstruction = buildingBasics[houseType].construction;
  const engFee = (baseConstruction + landCost) * 0.15; // Your 15% Engineer 1 Fee
  const totalNaira = baseConstruction + landCost + engFee;
  
  const convert = (amt) => (amt * exchangeRates[currency]).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="container py-5">
      <div className="alert alert-warning border-0 rounded-4 mb-4">
        <strong>⚠️ 2026 Inflation Alert:</strong> Material costs reflect ₦12,500/bag cement.
        Prices auto-converted to <strong>{currency}</strong> based on your location.
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card p-4 border-0 shadow-sm rounded-4">
             <h3>Investment Details</h3>
             <select className="form-select mb-3" onChange={(e) => setHouseType(e.target.value)}>
               {Object.keys(buildingBasics).map(k => <option key={k}>{k}</option>)}
             </select>
             <label>Land Cost ({symbols[currency]})</label>
             <input type="number" className="form-control" value={landCost} onChange={(e)=>setLandCost(Number(e.target.value))} />
          </div>
        </div>

        <div className="col-md-5">
          <div className="card p-4 border-0 shadow-lg bg-dark text-white rounded-4">
            <p className="opacity-75">Total Project Estimate ({currency})</p>
            <h1 className="text-success fw-bold">{symbols[currency]}{convert(totalNaira)}</h1>
            <hr />
            <div className="d-flex justify-content-between small mb-2">
              <span>Engineer 1 Supervision (15%):</span>
              <span className="text-warning">{symbols[currency]}{convert(engFee)}</span>
            </div>
            <p className="x-small opacity-50 mt-3">Includes 24/7 Site Live-Stream & Legal Verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}