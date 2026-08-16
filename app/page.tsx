"use client";

import React, { useState } from "react";

export default function BinanceFuturesProCalculator() {
  // Inputs State (ถอดแบบเมนู Binance)
  const [avbl, setAvbl] = useState<number>(604.34); // ยอด Avbl USDT
  const [leverage, setLeverage] = useState<number>(20); // Leverage
  const [percentSlider, setPercentSlider] = useState<number>(50); // % ของ Avbl ที่จะใช้
  const [entryPrice, setEntryPrice] = useState<number>(65420.50); // ราคาเข้า BTC/USDT
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(68000.00); // TP
  const [stopLossPrice, setStopLossPrice] = useState<number>(64000.00); // SL

  // 🧮 Auto Calculations (สูตรคำนวณสถาบัน)
  const marginUsed = (avbl * percentSlider) / 100; // เงินประกันที่ใช้จริง (USDT)
  const positionValue = marginUsed * leverage; // มูลค่าออเดอร์รวม (USDT)
  const orderSizeInCoin = entryPrice > 0 ? positionValue / entryPrice : 0; // ขนาดสัญญา (BTC)

  // PnL Calculations
  const estimatedProfit = orderSizeInCoin * (takeProfitPrice - entryPrice); // กำไรคาดการณ์ (USDT)
  const estimatedLoss = orderSizeInCoin * (entryPrice - stopLossPrice); // ขาดทุนคาดการณ์ (USDT)
  const roeProfitPercent = marginUsed > 0 ? (estimatedProfit / marginUsed) * 100 : 0;
  const roeLossPercent = marginUsed > 0 ? (estimatedLoss / marginUsed) * 100 : 0;

  // Risk / Reward Ratio
  const priceDiffTP = Math.abs(takeProfitPrice - entryPrice);
  const priceDiffSL = Math.abs(entryPrice - stopLossPrice);
  const rrRatio = priceDiffSL > 0 ? (priceDiffTP / priceDiffSL).toFixed(2) : "0.00";

  // ฟังก์ชันคลิกเด้งไปเว็บ www.boomberbet.com
  const handleRedirect = () => {
    window.open("https://www.boomberbet.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#05080e] text-slate-200 p-4 md:p-8 font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* 🌌 Background Neon Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        
        {/* 🏆 BRANDING HEADER & ACTION BUTTONS SECTION */}
        <div className="bg-[#0b121e]/90 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleRedirect}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-teal-300 p-0.5 shadow-[0_0_20px_rgba(0,255,102,0.5)] flex items-center justify-center">
              <div className="w-full h-full bg-[#05080e] rounded-[14px] flex items-center justify-center font-black text-xl text-cyan-400 tracking-tighter">
                BB
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                  BOOMBERBET
                </h1>
                <span className="text-xs font-mono font-bold text-black bg-emerald-400 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(0,255,102,0.5)]">
                  BILLION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                ระดับพันล้าน • เครื่องมือคำนวณสถาบันการเทรดแบบมืออาชีพ
              </p>
            </div>
          </div>

          {/* Action Buttons (สมัครฟรี / สมาชิกฟรี / รับข้อมูลเพิ่ม) */}
          <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={handleRedirect}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] whitespace-nowrap active:scale-95"
            >
              🔥 สมัครสมาชิกฟรี
            </button>
            <button
              onClick={handleRedirect}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] whitespace-nowrap active:scale-95"
            >
              ℹ️ รับข้อมูลเพิ่มเติม
            </button>
          </div>

        </div>

        {/* ⚡ BANNER คำอธิบายสไตล์ NEON CYBER */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-emerald-950/20 to-transparent border border-cyan-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              ⚡
            </div>
            <div>
              <h2 className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-wider">
                ระบบคำนวณอัตโนมัติ BINANCE TRADER PRO
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                เพียงกรอกวงเงินต้นทุนของคุณในช่อง <strong className="text-cyan-400">Avbl (USDT)</strong> ระบบจะคำนวณขนาดออเดอร์, Margin, Leverage, ค่า R:R และคาดการณ์กำไร/ขาดทุนให้อัตโนมัติทันที!
              </p>
            </div>
          </div>
          <button
            onClick={handleRedirect}
            className="text-[10px] font-mono font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-1.5 rounded-full uppercase whitespace-nowrap shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:scale-105 transition-transform cursor-pointer"
          >
            1-CLICK BINANCE CALC
          </button>
        </div>

        {/* 📊 MAIN BINANCE TRADING PANEL */}
        <div className="bg-[#0b121e]/80 border border-cyan-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(0,102,255,0.08)]">
          
          {/* Symbol Bar */}
          <div className="flex justify-between items-center pb-4 mb-5 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-wide">BTCUSDT</span>
              <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">Perpetual</span>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">Cross {leverage}x</span>
            </div>
            <div className="font-mono font-bold text-emerald-400 text-sm drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]">
              65,420.50 USDT
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 👈 LEFT: BINANCE ORDER FORM */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#05080e] rounded-xl border border-cyan-500/20 font-bold text-xs">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black py-2.5 text-center rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.4)] transition-all">
                  Buy / Long
                </button>
                <button className="bg-transparent text-slate-400 py-2.5 text-center rounded-lg hover:text-white transition-all">
                  Sell / Short
                </button>
              </div>

              {/* Avbl Input (ต้นทุน) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Avbl (เงินทุนของคุณ)</span>
                  <span className="text-cyan-400 font-mono font-bold">{avbl.toLocaleString()} USDT</span>
                </div>
                <div className="relative flex items-center bg-[#05080e] border border-cyan-400/60 rounded-xl px-3 py-2.5 shadow-[0_0_12px_rgba(0,240,255,0.25)] focus-within:border-cyan-300 transition-all">
                  <input
                    type="number"
                    value={avbl}
                    onChange={(e) => setAvbl(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-base font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-slate-400 font-bold">USDT</span>
                </div>
              </div>

              {/* Price Input */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Price (ราคาเข้าออเดอร์)</span>
                  <span className="text-xs text-cyan-400 cursor-pointer hover:underline">BBO</span>
                </div>
                <div className="relative flex items-center bg-[#05080e] border border-cyan-500/20 rounded-xl px-3 py-2 focus-within:border-cyan-500/50 transition-all">
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-sm font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-slate-400">USDT</span>
                </div>
              </div>

              {/* Auto Size Output */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Size (ขนาดออเดอร์อัตโนมัติ)</span>
                </div>
                <div className="relative flex items-center bg-[#05080e] border border-emerald-500/30 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    readOnly
                    value={orderSizeInCoin.toFixed(4)}
                    className="w-full bg-transparent font-mono text-sm font-bold text-emerald-400 focus:outline-none drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]"
                  />
                  <span className="text-xs font-mono text-slate-400">BTC</span>
                </div>
              </div>

              {/* Percentage Slider */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[25, 50, 75, 100].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPercentSlider(p)}
                    className={`py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      percentSlider === p
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold border-cyan-400 shadow-[0_0_12px_rgba(0,102,255,0.4)]"
                        : "bg-[#05080e] text-slate-400 border-cyan-500/20 hover:text-white hover:border-cyan-500/40"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>

              {/* TP/SL inputs */}
              <div className="pt-2 border-t border-cyan-500/20 space-y-3">
                <div className="text-xs font-bold text-cyan-400">☑ TP / SL (Take Profit / Stop Loss)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Take Profit</span>
                    <input
                      type="number"
                      value={takeProfitPrice}
                      onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                      className="w-full bg-[#05080e] border border-emerald-500/40 rounded-xl p-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Stop Loss</span>
                    <input
                      type="number"
                      value={stopLossPrice}
                      onChange={(e) => setStopLossPrice(Number(e.target.value))}
                      className="w-full bg-[#05080e] border border-cyan-500/40 rounded-xl p-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-300 transition-all"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* 👉 RIGHT: PRO TRADER ANALYTICS RESULTS */}
            <div className="lg:col-span-6 bg-[#05080e]/80 border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-wider mb-3">
                  📊 สรุปผลการคำนวณระดับสถาบัน
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0b121e] p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-slate-400 block">Initial Margin (หลักประกัน)</span>
                    <span className="text-lg font-mono font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                      {marginUsed.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-slate-500 block">({percentSlider}% ของ Avbl)</span>
                  </div>

                  <div className="bg-[#0b121e] p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-slate-400 block">Position Value (มูลค่ารวม)</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {positionValue.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-slate-500 block">Leverage {leverage}x</span>
                  </div>
                </div>

                {/* Risk / Reward & PnL List */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-cyan-500/10">
                    <span className="text-slate-400">Est. Profit (Take Profit):</span>
                    <span className="text-emerald-400 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.3)]">
                      +{estimatedProfit.toFixed(2)} USDT (+{roeProfitPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-cyan-500/10">
                    <span className="text-slate-400">Est. Loss (Stop Loss):</span>
                    <span className="text-cyan-400 font-bold drop-shadow-[0_0_6px_rgba(0,240,255,0.3)]">
                      -{estimatedLoss.toFixed(2)} USDT (-{roeLossPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-cyan-500/10">
                    <span className="text-slate-400">Risk / Reward Ratio:</span>
                    <span className="text-teal-300 font-bold">1 : {rrRatio}</span>
                  </div>
                </div>
              </div>

              {/* Status Alert & Direct Link */}
              <div 
                onClick={handleRedirect}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">✓</span>
                  <span><strong>Binance Risk Approved:</strong> การบริหารเงินทุนอยู่ในสัดส่วนปลอดภัย</span>
                </div>
                <span className="text-[10px] underline font-bold whitespace-nowrap ml-2">เข้าสู่เว็บไบแนนซ์ →</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
