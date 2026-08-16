"use client";

import React, { useState } from "react";

export default function BinanceFuturesUltimateCalculator() {
  // Inputs State
  const [avbl, setAvbl] = useState<number>(1000); // ทุน (USDT)
  const [riskPercent, setRiskPercent] = useState<number>(2); // Risk % ต่อไม้
  const [leverage, setLeverage] = useState<number>(20); // Leverage
  const [entryPrice, setEntryPrice] = useState<number>(65000); // ราคาเข้า
  const [stopLossPrice, setStopLossPrice] = useState<number>(64000); // SL
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(68000); // TP
  const [feeRate, setFeeRate] = useState<number>(0.05); // ค่าธรรมเนียม Binance Taker 0.05%
  const [copied, setCopied] = useState<boolean>(false);

  // 🧮 Advanced Auto Calculations (สูตรระดับสถาบัน)
  
  // 1. ความเสี่ยงสูงสุดที่เป็นตัวเงิน (USDT)
  const maxRiskAmount = (avbl * riskPercent) / 100;

  // 2. ระยะห่าง Stop Loss (เป็น %)
  const slDistancePercent = entryPrice > 0 ? (Math.abs(entryPrice - stopLossPrice) / entryPrice) * 100 : 0;

  // 3. Perfect Position Size (USDT) คำนวณตาม Risk % และระยะ SL
  // สูตร: Position Size = Max Risk / (SL Distance % + Total Fee %)
  const estimatedFeePercent = (feeRate * 2) / 100; // ค่าธรรมเนียมเข้า-ออก
  const totalRiskPercentDec = (slDistancePercent / 100) + estimatedFeePercent;
  
  const idealPositionValue = totalRiskPercentDec > 0 ? maxRiskAmount / totalRiskPercentDec : 0; // มูลค่าสัญญารวม (USDT)
  const requiredMargin = leverage > 0 ? idealPositionValue / leverage : 0; // เงินประกันจริงที่ต้องใช้ (USDT)
  const orderSizeInCoin = entryPrice > 0 ? idealPositionValue / entryPrice : 0; // จำนวน Coin (BTC)

  // 4. Estimation PnL & Fee
  const totalTradingFee = idealPositionValue * estimatedFeePercent; // ค่าธรรมเนียมรวม เข้า-ออก (USDT)
  const grossProfit = orderSizeInCoin * (takeProfitPrice - entryPrice); // กำไรขั้นต้น (USDT)
  const netProfit = grossProfit - totalTradingFee; // กำไรสุทธิหลังหัก Fee
  const grossLoss = orderSizeInCoin * (entryPrice - stopLossPrice); // ขาดทุนขั้นต้น
  const netLoss = grossLoss + totalTradingFee; // ขาดทุนสุทธิรวม Fee

  // 5. Breakeven Price (จุดเสมอตัวคืนทุนค่า Fee)
  const breakevenPrice = entryPrice * (1 + estimatedFeePercent);

  // 6. Estimated Liquidation Price (ราคาล้างพอร์ตคาดการณ์ - คิดแบบประมาณการณ์ Cross/Isolated)
  const estimatedLiqPrice = entryPrice > 0 ? entryPrice * (1 - (1 / leverage) + 0.005) : 0;

  // RR Ratio
  const rrRatio = netLoss > 0 ? (netProfit / netLoss).toFixed(2) : "0.00";

  // Redirect link
  const handleRedirect = () => {
    window.open("https://www.boomberbet.com", "_blank", "noopener,noreferrer");
  };

  // Copy Trade Plan Function
  const handleCopyPlan = () => {
    const planText = `
🎯 [BOOMBERBET TRADING PLAN]
----------------------------
• Pair: BTCUSDT (Long)
• Capital: ${avbl.toLocaleString()} USDT
• Risk: ${riskPercent}% (${maxRiskAmount.toFixed(2)} USDT)
• Entry Price: ${entryPrice.toLocaleString()} USDT
• Take Profit: ${takeProfitPrice.toLocaleString()} USDT (+${netProfit.toFixed(2)} USDT)
• Stop Loss: ${stopLossPrice.toLocaleString()} USDT (-${netLoss.toFixed(2)} USDT)
• Position Size: ${idealPositionValue.toFixed(2)} USDT (${orderSizeInCoin.toFixed(4)} BTC)
• Margin Used: ${requiredMargin.toFixed(2)} USDT (${leverage}x)
• RR Ratio: 1 : ${rrRatio}
----------------------------
⚡ Powered by BOOMBERBET BILLION
    `.trim();

    navigator.clipboard.writeText(planText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#03060d] text-slate-200 p-4 md:p-8 font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* BRANDING HEADER */}
        <div className="bg-[#0a0f1d]/90 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleRedirect}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-teal-300 p-0.5 shadow-[0_0_20px_rgba(0,255,102,0.5)] flex items-center justify-center">
              <div className="w-full h-full bg-[#03060d] rounded-[14px] flex items-center justify-center font-black text-xl text-cyan-400 tracking-tighter">
                BB
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  BOOMBERBET
                </h1>
                <span className="text-[10px] font-mono font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  ULTIMATE PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                ระดับสถาบัน • ระบบคำนวณความเสี่ยง และ Position Sizing อัตโนมัติ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleCopyPlan}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              {copied ? "✓ คัดลอกแผนเทรดแล้ว!" : "📋 คัดลอกแผนเทรด (Copy Plan)"}
            </button>
            <button
              onClick={handleRedirect}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] whitespace-nowrap active:scale-95"
            >
              🔥 เข้าสู่หน้าเทรด
            </button>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="bg-[#0a0f1d]/80 border border-cyan-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
          
          <div className="flex justify-between items-center pb-4 mb-5 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-wide">BTCUSDT</span>
              <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">Futures Pro</span>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">Risk-based Mode</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">จุดคุ้มทุนหลังหัก Fee (Breakeven)</span>
              <span className="font-mono font-bold text-cyan-300 text-xs">
                {breakevenPrice.toFixed(2)} USDT
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT INPUT FORM */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* 1. Avbl Capital */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1. เงินทุนทั้งหมดในพอร์ต (Avbl Balance)</span>
                  <span className="text-cyan-400 font-mono font-bold">{avbl.toLocaleString()} USDT</span>
                </div>
                <div className="relative flex items-center bg-[#03060d] border border-cyan-400/60 rounded-xl px-3 py-2.5">
                  <input
                    type="number"
                    value={avbl === 0 ? "" : avbl}
                    placeholder="0.00"
                    onChange={(e) => setAvbl(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-base font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-slate-400 font-bold">USDT</span>
                </div>
              </div>

              {/* 2. Risk % */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>2. ยอมรับความเสี่ยงสูงสุดต่อไม้ (Risk %)</span>
                  <span className="text-cyan-300 font-mono font-bold">
                    {maxRiskAmount.toFixed(2)} USDT ({riskPercent}%)
                  </span>
                </div>
                <div className="relative flex items-center bg-[#03060d] border border-cyan-500/30 rounded-xl px-3 py-2">
                  <input
                    type="number"
                    step="0.5"
                    value={riskPercent === 0 ? "" : riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-sm font-bold text-cyan-300 focus:outline-none"
                  />
                  <span className="text-xs font-mono text-slate-400 font-bold">%</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                  {[1, 2, 3, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRiskPercent(r)}
                      className={`py-1 rounded text-[10px] font-mono border transition-all ${
                        riskPercent === r
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                          : "bg-[#03060d] text-slate-500 border-cyan-500/10"
                      }`}
                    >
                      {r}% Risk
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Entry, SL, TP Prices */}
              <div className="pt-2 border-t border-cyan-500/20 space-y-3">
                <div className="text-xs font-bold text-cyan-400">3. กำหนดราคาเปิดออเดอร์ & ตัดขาดทุน</div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">ราคาเข้า (Entry)</span>
                    <input
                      type="number"
                      value={entryPrice === 0 ? "" : entryPrice}
                      onChange={(e) => setEntryPrice(Number(e.target.value))}
                      className="w-full bg-[#03060d] border border-slate-700 rounded-xl p-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Stop Loss (SL)</span>
                    <input
                      type="number"
                      value={stopLossPrice === 0 ? "" : stopLossPrice}
                      onChange={(e) => setStopLossPrice(Number(e.target.value))}
                      className="w-full bg-[#03060d] border border-cyan-500/50 rounded-xl p-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Take Profit (TP)</span>
                    <input
                      type="number"
                      value={takeProfitPrice === 0 ? "" : takeProfitPrice}
                      onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                      className="w-full bg-[#03060d] border border-emerald-500/50 rounded-xl p-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-300"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Leverage & Fee Selector */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Leverage</span>
                  <div className="relative flex items-center bg-[#03060d] border border-cyan-500/20 rounded-xl px-3 py-1.5">
                    <input
                      type="number"
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full bg-transparent font-mono text-xs font-bold text-emerald-400 focus:outline-none"
                    />
                    <span className="text-xs font-mono text-slate-400">x</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Fee Rate (Binance Taker)</span>
                  <div className="relative flex items-center bg-[#03060d] border border-cyan-500/20 rounded-xl px-3 py-1.5">
                    <input
                      type="number"
                      step="0.01"
                      value={feeRate}
                      onChange={(e) => setFeeRate(Number(e.target.value))}
                      className="w-full bg-transparent font-mono text-xs font-bold text-slate-300 focus:outline-none"
                    />
                    <span className="text-xs font-mono text-slate-400">%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT ANALYTICS RESULTS */}
            <div className="lg:col-span-6 bg-[#03060d]/90 border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-wider">
                    ⚡ ขนาดสัญญาที่คำนวณให้อัตโนมัติ (Optimal Size)
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Risk Protected
                  </span>
                </div>

                {/* Main Calculated Position Boxes */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a0f1d] p-3 rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
                    <span className="text-[10px] text-slate-400 block">มูลค่าสัญญาที่ควรเปิด (Position Size)</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {idealPositionValue.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-slate-500 block">≈ {orderSizeInCoin.toFixed(4)} BTC</span>
                  </div>

                  <div className="bg-[#0a0f1d] p-3 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] text-slate-400 block">เงินประกันที่ต้องใช้ (Margin Used)</span>
                    <span className="text-lg font-mono font-bold text-cyan-300">
                      {requiredMargin.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-slate-500 block">ใช้ทุนจริง {((requiredMargin / avbl) * 100).toFixed(1)}% ของพอร์ต</span>
                  </div>
                </div>

                {/* Risk & Analytics List */}
                <div className="space-y-2 text-xs font-mono bg-[#050914] p-3 rounded-xl border border-cyan-500/10">
                  <div className="flex justify-between py-1 border-b border-cyan-500/10">
                    <span className="text-slate-400">Net Est. Profit (กำไรสุทธิหลังหัก Fee):</span>
                    <span className="text-emerald-400 font-bold">
                      +{netProfit.toFixed(2)} USDT
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-cyan-500/10">
                    <span className="text-slate-400">Net Est. Loss (ขาดทุนสุทธิเมื่อโดน SL):</span>
                    <span className="text-cyan-400 font-bold">
                      -{netLoss.toFixed(2)} USDT ({riskPercent}%)
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-cyan-500/10">
                    <span className="text-slate-400">Total Est. Fee (ค่าธรรมเนียมรวม เข้า-ออก):</span>
                    <span className="text-slate-300">{totalTradingFee.toFixed(2)} USDT</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-cyan-500/10">
                    <span className="text-slate-400">Est. Liquidation Price (ราคาล้างพอร์ต):</span>
                    <span className="text-amber-400 font-bold">~{estimatedLiqPrice.toFixed(2)} USDT</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Risk / Reward Ratio:</span>
                    <span className="text-teal-300 font-bold">1 : {rrRatio}</span>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div 
                onClick={handleRedirect}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🛡️</span>
                  <span><strong>Institutional Risk Management:</strong> ระบบควบคุมการขาดทุนไม่เกิน {riskPercent}% พอดีเป๊ะ</span>
                </div>
                <span className="text-[10px] underline font-bold whitespace-nowrap ml-2">เปิดออเดอร์ไบแนนซ์ →</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
