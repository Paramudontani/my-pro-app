"use client";

import React, { useState } from "react";

export default function BoomberbetBillionPro() {
  // Asset & Currency Selection
  const [assetClass, setAssetClass] = useState<string>("GOLD");
  const [currency, setCurrency] = useState<string>("THB");

  // Inputs State
  const [capital, setCapital] = useState<number>(1000000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [leverage, setLeverage] = useState<number>(100);
  const [entryPrice, setEntryPrice] = useState<number>(2500);
  const [stopLossPrice, setStopLossPrice] = useState<number>(2480);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(2550);
  const [winRate, setWinRate] = useState<number>(60);

  // Core Money Management Calculations
  const riskAmount = (capital * riskPercent) / 100;
  const priceDiffSL = Math.abs(entryPrice - stopLossPrice);
  const priceDiffTP = Math.abs(takeProfitPrice - entryPrice);

  const slPercent = entryPrice > 0 ? (priceDiffSL / entryPrice) * 100 : 0;
  const tpPercent = entryPrice > 0 ? (priceDiffTP / entryPrice) * 100 : 0;

  const rrRatioNumber = priceDiffSL > 0 ? priceDiffTP / priceDiffSL : 0;
  const rrRatio = rrRatioNumber.toFixed(2);

  const positionSizeValue = slPercent > 0 ? riskAmount / (slPercent / 100) : 0;
  const units = entryPrice > 0 ? positionSizeValue / entryPrice : 0;
  const marginRequired = leverage > 0 ? positionSizeValue / leverage : 0;

  // Pro Advanced Metrics
  const profitPotential = riskAmount * rrRatioNumber;
  const drawdownRecoveryNeeded = capital - riskAmount > 0 ? (riskAmount / (capital - riskAmount)) * 100 : 0;
  const maxConsecutiveLosses = riskAmount > 0 ? Math.floor(capital / riskAmount) : 0;
  const expectedValue = ((winRate / 100) * profitPotential) - (((100 - winRate) / 100) * riskAmount);

  const isMarginExceeded = marginRequired > capital;

  const handleExternalRedirect = () => {
    window.open("https://www.boomberbet.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#050508] text-amber-100 font-sans p-4 md:p-8 relative overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* 🌟 LUXURY FLOATING GOLD & CASH DUST BACKGROUND 🌟 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/15 via-yellow-600/5 to-transparent blur-[140px] rounded-full" />
        
        {/* Floating Dollars & Gold Dust Overlay Effect */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] animate-pulse" />
        
        {/* Simulated Floating Cash & Coins Elements */}
        <div className="absolute top-[10%] left-[5%] text-4xl opacity-15 animate-bounce duration-[4000ms]">💵</div>
        <div className="absolute top-[20%] right-[8%] text-5xl opacity-20 animate-pulse duration-[3000ms]">💰</div>
        <div className="absolute bottom-[15%] left-[12%] text-5xl opacity-15 animate-bounce duration-[5000ms]">🪙</div>
        <div className="absolute bottom-[25%] right-[10%] text-6xl opacity-10 animate-pulse duration-[6000ms]">💎</div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.02] font-black text-amber-300 font-serif">
          BOOMBERBET
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* 👑 TOP BAR & NAVIGATION */}
        <header className="flex flex-col lg:flex-row justify-between items-center pb-6 border-b border-amber-500/20 gap-6">
          <div className="flex items-center gap-4">
            {/* Logo Crown */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-500 to-yellow-800 p-[1.5px] shadow-[0_0_35px_rgba(245,158,11,0.4)]">
              <div className="w-full h-full bg-[#0a0a10] rounded-[14px] flex items-center justify-center">
                <span className="text-3xl drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]">👑</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-widest bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-600 bg-clip-text text-transparent uppercase font-serif">
                  BOOMBERBET
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/50 bg-amber-500/10 text-amber-300 font-mono tracking-widest uppercase">
                  BILLIONAIRE
                </span>
              </div>
              <p className="text-xs text-amber-200/50 tracking-[0.25em] uppercase font-medium mt-0.5">
                Institutional Algorithmic Risk Management Engine
              </p>
            </div>
          </div>

          {/* Asset Selector & CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Asset Selector Menu */}
            <div className="flex bg-[#0d0d14] p-1 rounded-xl border border-amber-500/20 text-xs font-mono">
              {["GOLD", "CRYPTO", "FOREX", "STOCKS"].map((item) => (
                <button
                  key={item}
                  onClick={() => setAssetClass(item)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    assetClass === item
                      ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "text-amber-200/60 hover:text-amber-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Currency Toggle */}
            <div className="flex bg-[#0d0d14] p-1 rounded-xl border border-amber-500/20 text-xs font-mono">
              {["THB", "USD"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    currency === curr ? "bg-amber-400/20 text-amber-300 border border-amber-400/40" : "text-amber-200/40"
                  }`}
                >
                  {curr === "THB" ? "฿ THB" : "$ USD"}
                </button>
              ))}
            </div>

            {/* 🚀 CTA BUTTONS (REDIRECT TO BOOMBERBET) */}
            <button
              onClick={handleExternalRedirect}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>🔥</span> สมัครสมาชิกฟรี
            </button>

            <button
              onClick={handleExternalRedirect}
              className="px-4 py-2.5 rounded-xl bg-[#12121c] border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5"
            >
              <span>📩</span> รับข่าวสารฟรี
            </button>
          </div>
        </header>

        {/* 📊 MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL: PARAMETER INPUTS */}
          <div className="lg:col-span-5 bg-[#0a0a10]/80 border border-amber-500/30 rounded-3xl p-6 space-y-5 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                พารามิเตอร์การเทรด (Inputs)
              </h2>
              <span className="text-[10px] font-mono text-amber-500/60">INSTITUTIONAL v4.0</span>
            </div>

            {/* Capital Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-amber-200/70 font-medium block">
                เงินทุนทั้งหมดในพอร์ต (Capital Balance)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full bg-[#040407] border border-amber-500/40 rounded-xl px-4 py-3 text-amber-300 font-mono text-xl font-black focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-amber-500/60 font-bold">
                  {currency}
                </span>
              </div>
            </div>

            {/* Risk & Leverage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-rose-300/80 font-medium block">ยอมเสียได้ต่อไม้ (% Risk)</label>
                <input
                  type="number"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full bg-[#040407] border border-rose-500/40 rounded-xl px-3.5 py-2.5 text-rose-400 font-mono text-lg font-bold focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-sky-300/80 font-medium block">Leverage (x)</label>
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full bg-[#040407] border border-sky-500/40 rounded-xl px-3.5 py-2.5 text-sky-300 font-mono text-lg font-bold focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {/* Prices Settings */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="text-xs text-amber-200/60 block mb-1">ราคาเข้าออเดอร์ (Entry Price)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full bg-[#040407] border border-white/10 rounded-xl px-4 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-400/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-rose-400 block mb-1">ตัดขาดทุน (Stop Loss)</label>
                  <input
                    type="number"
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(Number(e.target.value))}
                    className="w-full bg-[#040407] border border-rose-900/50 rounded-xl px-3 py-2 text-rose-300 font-mono text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-emerald-400 block mb-1">ทำกำไร (Take Profit)</label>
                  <input
                    type="number"
                    value={takeProfitPrice}
                    onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                    className="w-full bg-[#040407] border border-emerald-900/50 rounded-xl px-3 py-2 text-emerald-300 font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-amber-200/60 block mb-1">Win Rate คาดการณ์ของระบบ (%)</label>
                <input
                  type="number"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full bg-[#040407] border border-amber-500/20 rounded-xl px-4 py-2 text-amber-300 font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: ADVANCED RISK & POSITION SIZING METRICS */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="bg-[#0a0a12] border border-rose-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">Max Loss/Trade</span>
                <span className="text-xl font-black font-mono text-rose-500 mt-1 block">
                  -{riskAmount.toLocaleString()} <span className="text-[10px] font-normal">{currency}</span>
                </span>
                <span className="text-[9px] text-rose-300/40 font-mono mt-0.5 block">{riskPercent}% Risk</span>
              </div>

              <div className="bg-[#0a0a12] border border-emerald-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Max Profit</span>
                <span className="text-xl font-black font-mono text-emerald-400 mt-1 block">
                  +{profitPotential.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-[10px] font-normal">{currency}</span>
                </span>
                <span className="text-[9px] text-emerald-300/40 font-mono mt-0.5 block">Target Gain</span>
              </div>

              <div className="bg-[#0a0a12] border border-amber-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">R:R Ratio</span>
                <span className="text-xl font-black font-mono text-amber-300 mt-1 block">
                  1 : {rrRatio}
                </span>
                <span className="text-[9px] text-amber-200/40 font-mono mt-0.5 block">
                  {rrRatioNumber >= 2 ? "✦ Excellent" : "✦ High Risk"}
                </span>
              </div>

              <div className="bg-[#0a0a12] border border-sky-500/30 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Margin Needed</span>
                <span className="text-xl font-black font-mono text-sky-300 mt-1 block">
                  {marginRequired.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[9px] text-sky-200/40 font-mono mt-0.5 block">{leverage}x Leverage</span>
              </div>

            </div>

            {/* Main Position Sizing Box */}
            <div className="bg-gradient-to-br from-[#0f0f1a] via-[#090910] to-[#050508] border border-amber-500/30 rounded-3xl p-6 space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
              <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-[0.2em]">
                  คำแนะนำขนาดออเดอร์ (POSITION SIZING)
                </h3>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                  REALTIME CALCULATED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#040408] p-4 rounded-2xl border border-amber-500/15 space-y-1">
                  <span className="text-xs text-amber-200/60 block">จำนวนสัญญา / Lot Size / Units ที่ต้องเปิด</span>
                  <span className="text-3xl font-black font-mono text-amber-300 block">
                    {units.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                  <span className="text-[10px] text-amber-500/50 font-mono">Contracts / Lots</span>
                </div>

                <div className="bg-[#040408] p-4 rounded-2xl border border-amber-500/15 space-y-1">
                  <span className="text-xs text-amber-200/60 block">มูลค่าออเดอร์รวมจริง (Position Value)</span>
                  <span className="text-3xl font-black font-mono text-yellow-400 block">
                    {positionSizeValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-[10px] text-amber-500/50 font-mono">{currency} Exposure</span>
                </div>
              </div>

              {/* Status Warning Indicator */}
              {isMarginExceeded ? (
                <div className="bg-rose-950/50 border border-rose-500/50 text-rose-200 p-3.5 rounded-xl text-xs flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <strong className="block text-rose-400 font-bold uppercase tracking-wider mb-0.5">OVER-LEVERAGE WARNING</strong>
                    <span>เงินประกันที่ต้องการสูงกว่าเงินทุนในพอร์ต! กรุณาเพิ่ม Leverage หรือขยายระยะ Stop Loss</span>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 p-3.5 rounded-xl text-xs flex items-center gap-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <strong className="block text-emerald-400 font-bold uppercase tracking-wider mb-0.5">BOOMBERBET RISK PASSED</strong>
                    <span>พอร์ตปลอดภัยอยู่ในเกณฑ์ความเสี่ยง {riskPercent}% พร้อมออกออเดอร์ได้อย่างแม่นยำ</span>
                  </div>
                </div>
              )}
            </div>

            {/* 🔥 PRO ADVANCED ANALYTICS (ยัดฟีเจอร์คำนวณสถาบันเพิ่ม) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-[#08080f] p-3.5 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[10px] text-amber-200/50 uppercase block">Drawdown Recovery</span>
                <span className="text-sm font-bold text-amber-300">{drawdownRecoveryNeeded.toFixed(2)}%</span>
                <span className="text-[9px] text-slate-500 block">ต้องทำกำไรคืนเมื่อแพ้</span>
              </div>

              <div className="bg-[#08080f] p-3.5 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[10px] text-amber-200/50 uppercase block">Max Loss Streak</span>
                <span className="text-sm font-bold text-rose-400">{maxConsecutiveLosses} ไม้ติด</span>
                <span className="text-[9px] text-slate-500 block">จนกว่าพอร์ตจะหมด</span>
              </div>

              <div className="bg-[#08080f] p-3.5 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[10px] text-amber-200/50 uppercase block">Expectancy (EV)</span>
                <span className={`text-sm font-bold ${expectedValue >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {expectedValue >= 0 ? "+" : ""}{expectedValue.toFixed(0)} {currency}
                </span>
                <span className="text-[9px] text-slate-500 block">กำไรคาดหวังเฉลี่ย/ไม้</span>
              </div>
            </div>

            {/* BOTTOM BANNER LINK TO BOOMBERBET */}
            <div 
              onClick={handleExternalRedirect}
              className="cursor-pointer bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between hover:border-amber-400 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🎰</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    เข้าร่วม BOOMBERBET BILLION CLUB วันนี้
                  </h4>
                  <p className="text-[10px] text-amber-200/60">
                    รับสิทธิ์ใช้งานระบบวิเคราะห์และสัญญาณเทรดฟรีตลอดชีพ
                  </p>
                </div>
              </div>
              <button className="text-xs font-black text-black bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-xl uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                เข้าสู่เว็บไซต์ ➔
              </button>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <footer className="pt-8 text-center border-t border-amber-500/10 text-[10px] text-amber-200/30 font-mono tracking-widest uppercase flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© BOOMBERBET BILLION — HIGH FREQUENCY TRADING & MONEY MANAGEMENT ENGINE</span>
          <span className="cursor-pointer hover:text-amber-400 transition-colors" onClick={handleExternalRedirect}>
            WWW.BOOMBERBET.COM
          </span>
        </footer>

      </div>
    </div>
  );
}
