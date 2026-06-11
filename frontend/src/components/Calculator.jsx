import React, { useState, useEffect } from "react";

export default function Calculator({ selectedPlot }) {
  const [area, setArea] = useState(1200);
  const [rate, setRate] = useState(3500);
  const [downPayPercent, setDownPayPercent] = useState(20);
  const [tenure, setTenure] = useState(15);

  // Sync inputs with selected plot changes
  useEffect(() => {
    if (selectedPlot) {
      setArea(selectedPlot.area);
      setRate(selectedPlot.rate);
    }
  }, [selectedPlot]);

  const formatIndianCurrency = (number) => {
    const rounded = Math.round(number);
    const numStr = rounded.toString();
    if (numStr.length <= 3) return "₹ " + numStr;
    
    const lastThree = numStr.substring(numStr.length - 3);
    const otherBits = numStr.substring(0, numStr.length - 3);
    const formattedOther = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return "₹ " + formattedOther + "," + lastThree;
  };

  const totalValue = area * rate;
  const downPaymentVal = totalValue * (downPayPercent / 100);
  const loanPrincipal = totalValue - downPaymentVal;

  // Assumed interest rate: 8.5% p.a.
  const annualInterestRate = 8.5;
  const monthlyInterestRate = (annualInterestRate / 12) / 100;
  const totalMonths = tenure * 12;

  let monthlyEmi = 0;
  if (loanPrincipal > 0) {
    monthlyEmi = loanPrincipal * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  }

  return (
    <section className="section" id="calculator">
      <div className="container">
        <div className="section-header">
          <h2>Plot Budget & EMI Calculator</h2>
          <p>Estimate your custom investment structure. Slide the values below to match your budget and see instant financing breakdowns.</p>
        </div>

        <div className="calc-grid">
          {/* Slider Panel */}
          <div className="calc-panel">
            {/* Area Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <label htmlFor="calc-area">Plot Area (Sq.Ft.)</label>
                <div className="slider-val">{area.toLocaleString()} sq.ft.</div>
              </div>
              <div className="slider-control">
                <input 
                  type="range" 
                  id="calc-area" 
                  min="600" 
                  max="5000" 
                  step="50" 
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                />
                <div className="slider-limits">
                  <span>600 sq.ft</span>
                  <span>5,000 sq.ft</span>
                </div>
              </div>
            </div>

            {/* Price Per Sqft Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <label htmlFor="calc-rate">Price per Sq.Ft. (₹)</label>
                <div className="slider-val">₹ {rate.toLocaleString()}</div>
              </div>
              <div className="slider-control">
                <input 
                  type="range" 
                  id="calc-rate" 
                  min="1500" 
                  max="10000" 
                  step="100" 
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <div className="slider-limits">
                  <span>₹ 1,500 / sq.ft</span>
                  <span>₹ 10,000 / sq.ft</span>
                </div>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <label htmlFor="calc-downpayment">Down Payment</label>
                <div className="slider-val">{formatIndianCurrency(downPaymentVal)} ({downPayPercent}%)</div>
              </div>
              <div className="slider-control">
                <input 
                  type="range" 
                  id="calc-downpayment" 
                  min="10" 
                  max="90" 
                  step="5" 
                  value={downPayPercent}
                  onChange={(e) => setDownPayPercent(parseInt(e.target.value))}
                />
                <div className="slider-limits">
                  <span>10% Min</span>
                  <span>90% Max</span>
                </div>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <label htmlFor="calc-tenure">Loan Tenure (Years)</label>
                <div className="slider-val">{tenure} Years</div>
              </div>
              <div className="slider-control">
                <input 
                  type="range" 
                  id="calc-tenure" 
                  min="5" 
                  max="25" 
                  step="1" 
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                />
                <div className="slider-limits">
                  <span>5 Years</span>
                  <span>25 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculated Results Cards */}
          <div className="calc-results">
            <div className="result-row">
              <span className="result-label">Total Plot Value</span>
              <span className="result-val">{formatIndianCurrency(totalValue)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Down Payment Required</span>
              <span className="result-val">{formatIndianCurrency(downPaymentVal)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Principal Loan Amount</span>
              <span className="result-val">{formatIndianCurrency(loanPrincipal)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Interest Rate (Assumed)</span>
              <span className="result-val" style={{ color: "var(--text-secondary)" }}>8.5% p.a.</span>
            </div>
            
            <div className="result-row highlight">
              <span className="result-label">Estimated Monthly EMI</span>
              <span className="result-val">{formatIndianCurrency(monthlyEmi)} / mo*</span>
            </div>
            
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "10px" }}>
              *Figures shown are estimates for guidance. Exact EMIs may vary depending on financing bank terms.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
