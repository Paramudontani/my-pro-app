"use client";

import React, { useState } from "react";

export default function BillionaireMMCalculator() {
  // Inputs State
  const [capital, setCapital] = useState<number>(1000000); // เริ่มต้น 1,000,000 บาท
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [leverage, setLeverage] = useState<number>(20);
  const [entryPrice, setEntryPrice] = useState<number>(100);
  const [stopLossPrice, setStopLossPrice] = useState<number>(97);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(109);

  // Calculations
  const riskAmount = (capital * riskPercent) / 100;
  const priceDiffSL = Math.abs(entryPrice - stopLossPrice);
  const priceDiffTP = Math.abs(takeProfitPrice - entryPrice);

  const slPercent = entryPrice > 0 ? (priceDiffSL / entryPrice) * 100 : 0;
  const tpPercent = entryPrice > 0 ? (priceDiffTP / entryPrice) * 100 : 0;

  const rrRatio = priceDiffSL > 0 ? (priceDiffTP / priceDiffSL).toFixed(2) : "0.00";
  const positionSizeValue = slPercent > 0 ? riskAmount / (slPercent / 100) : 0;
  const units = entryPrice > 0 ? positionSizeValue / entryPrice : 0;
  const marginRequired = leverage > 0 ? positionSizeValue / leverage : 0;

  const isMarginExceeded = marginRequired > capital;

  return (
    <div className="min-h-screen bg-[#070709] text-amber-100/90 font-sans p-4 md:p-10 relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* LOGO & HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-amber-500/20 gap-6">
          <div className="flex items-center gap-4">
            {/* Crown Logo Badge */}
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[1px] shadow-[0_0_25px_rgba(217,119,6,0.3)]">
              <div className="w-full h-full bg-[#0d0d12] rounded-[15px] flex items-center justify-center">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">👑</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-widest bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent uppercase font-serif drop-shadow-sm">
                  BOOMBERBET
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 font-mono tracking-widest">
                  BILLION
                </span>
              </div>
              <p className="text-xs text-amber-200/50 uppercase tracking-[0.2em] font-medium mt-1">
                Institutional Risk & Money Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#12121a]/80 border border-amber-500/20 px-5 py-2.5 rounded-full shadow-inner backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-xs font-mono tracking-wider text-amber-200/80">
              PORTFOLIO STATUS: <strong className="text-amber-400">BILLIONAIRE CLUB</strong>
            </span>
          </div>
        </header>

        {/* MAIN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUTS PANEL */}
          <div className="lg:col-span-5 bg-[#0f0f17]/60 border border-amber-500/20 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-amber-500/10 pb-4">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-amber-300/90 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full" />
                ตั้งค่าคำนวณ (Inputs)
              </h2>
              <span className="text-[10px] font-mono text-amber-500/60 uppercase">PRO EDITION</span>
            </div>

            {/* Capital Input */}
            <div className="space-y-2">
              <label className="text-xs text-amber-200/60 font-medium tracking-wide block">
                เงินทุนทั้งหมด (Capital Balance - THB)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-amber-500/30 rounded-xl px-4 py-3 text-amber-300 font-mono text-lg font-bold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all shadow-inner"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-amber-500/50">THB</span>
              </div>
            </div>

            {/* Risk & Leverage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-amber-200/60 font-medium tracking-wide block">
                  ความเสี่ยง (% Risk)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 font-mono text-lg font-bold focus:outline-none focus:border-rose-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-amber-200/60 font-medium tracking-wide block">
                  Leverage (x)
                </label>
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-amber-500/30 rounded-xl px-4 py-3 text-amber-300 font-mono text-lg font-bold focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Prices */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs text-amber-200/60 block">ราคาเข้าซื้อ (Entry Price)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-white/10 rounded-xl px-4 py-2.5 text-slate-200 font-mono focus:outline-none focus:border-amber-400/50 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-rose-400/80 block">จุดตัดขาดทุน (Stop Loss Price)</label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-rose-900/40 rounded-xl px-4 py-2.5 text-rose-300 font-mono focus:outline-none focus:border-rose-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-emerald-400/80 block">จุดทำกำไร (Take Profit Price)</label>
                <input
                  type="number"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                  className="w-full bg-[#08080c] border border-emerald-900/40 rounded-xl px-4 py-2.5 text-emerald-300 font-mono focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* OUTPUT ANALYSIS PANEL */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Max Risk Amount */}
              <div className="bg-gradient-to-b from-[#140a0e] to-[#0b0608] border border-rose-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl" />
                <span className="text-[11px] font-medium text-rose-400 uppercase tracking-widest block">
                  Max Risk Amount
                </span>
                <span className="text-2xl font-black font-mono text-rose-500 mt-2 block tracking-tight">
                  -{riskAmount.toLocaleString()} <span className="text-xs font-normal text-rose-400/60">THB</span>
                </span>
                <span className="text-[10px] text-rose-300/40 font-mono mt-1 block">
                  {riskPercent}% of Portfolio
                </span>
              </div>

              {/* R:R Ratio */}
              <div className="bg-gradient-to-b from-[#1a150a] to-[#0c0a05] border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl" />
                <span className="text-[11px] font-medium text-amber-400 uppercase tracking-widest block">
                  Risk : Reward Ratio
                </span>
                <span className="text-2xl font-black font-mono text-amber-300 mt-2 block tracking-tight">
                  1 : {rrRatio}
                </span>
                <span className="text-[10px] text-amber-200/40 font-mono mt-1 block">
                  {Number(rrRatio) >= 2 ? "✦ HIGHLY PROFITABLE" : "✦ HIGH RISK RATIO"}
                </span>
              </div>

              {/* Margin Required */}
              <div className="bg-gradient-to-b from-[#0a121a] to-[#05080d] border border-sky-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/5 rounded-full blur-xl" />
                <span className="text-[11px] font-medium text-sky-400 uppercase tracking-widest block">
                  Margin Required
                </span>
                <span className="text-2xl font-black font-mono text-sky-300 mt-2 block tracking-tight">
                  {marginRequired.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-sky-200/40 font-mono mt-1 block">
                  Leverage {leverage}x
                </span>
              </div>

            </div>

            {/* Position Sizing Display */}
            <div className="bg-gradient-to-br from-[#12121c] via-[#0d0d14] to-[#09090e] border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative">
              <div className="flex items-center justify-between border-b border-amber-500/10 pb-4">
                <h3 className="text-xs font-bold text-amber-300/80 uppercase tracking-[0.2em]">
                  คำแนะนำขนาดการออกออเดอร์ (POSITION SIZING)
                </h3>
                <span className="text-[10px] text-amber-500/50 font-mono">AUTOMATED ANALYSIS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#07070a] p-5 rounded-2xl border border-amber-500/10 space-y-1">
                  <span className="text-xs text-amber-200/50 font-medium block">
                    จำนวนที่ต้องซื้อ (Quantity / Units)
                  </span>
                  <span className="text-3xl font-black font-mono text-amber-300 tracking-tight block">
                    {units.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </span>
                  <span className="text-[10px] text-amber-500/40 font-mono">Units / Contracts</span>
                </div>

                <div className="bg-[#07070a] p-5 rounded-2xl border border-amber-500/10 space-y-1">
                  <span className="text-xs text-amber-200/50 font-medium block">
                    มูลค่าออเดอร์รวม (Position Value)
                  </span>
                  <span className="text-3xl font-black font-mono text-yellow-400 tracking-tight block">
                    {positionSizeValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-amber-500/40 font-mono">THB (Total Exposure)</span>
                </div>
              </div>

              {/* Status Banner */}
              {isMarginExceeded ? (
                <div className="bg-rose-950/40 border border-rose-500/40 text-rose-200 p-4 rounded-2xl text-xs flex items-center gap-3">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <strong className="block text-rose-400 uppercase tracking-wider font-bold mb-0.5">OVER-LEVERAGE WARNING</strong>
                    <span>หลักประกัน ({marginRequired.toFixed(0)} THB) สูงกว่าเงินทุนของคุณ! กรุณาเพิ่ม Leverage หรือขยับจุด Stop Loss</span>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 p-4 rounded-2xl text-xs flex items-center gap-3">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <strong className="block text-emerald-400 uppercase tracking-wider font-bold mb-0.5">RISK APPROVED BY BOOMBERBET</strong>
                    <span>ความเสี่ยงอยู่ในเกณฑ์ปลอดภัยที่ {riskPercent}% ของพอร์ต พร้อมลุยอย่างมั่นใจ</span>
                  </div>
                </div>
              )}
            </div>

            {/* Percentage Ratios */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#0d0d14] p-4 rounded-2xl border border-rose-500/10 flex justify-between items-center">
                <span className="text-amber-200/50">SL Distance:</span>
                <span className="text-rose-400 font-bold text-sm">-{slPercent.toFixed(2)}%</span>
              </div>
              <div className="bg-[#0d0d14] p-4 rounded-2xl border border-emerald-500/10 flex justify-between items-center">
                <span className="text-amber-200/50">TP Distance:</span>
                <span className="text-emerald-400 font-bold text-sm">+{tpPercent.toFixed(2)}%</span>
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <footer className="pt-10 text-center border-t border-amber-500/10 text-xs text-amber-200/30 font-mono tracking-widest uppercase">
          © BOOMBERBET BILLION CLUB — HIGH FREQUENCY RISK & MONEY MANAGEMENT SYSTEM
        </footer>

      </div>
    </div>
  );
}
