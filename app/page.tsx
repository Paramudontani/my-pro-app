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

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#eaecef] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* 🌟 BANNER คำอธิบายสไตล์ PRO */}
        <div className="bg-gradient-to-r from-[#f0b90b]/20 via-[#f0b90b]/10 to-transparent border border-[#f0b90b]/40 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#f0b90b]">⚡</span>
            <div>
              <h2 className="text-sm font-bold text-[#f0b90b] uppercase tracking-wider">
                ระบบคำนวณอัตโนมัติ BINANCE TRADER PRO
              </h2>
              <p className="text-xs text-[#eaecef]/80 mt-0.5">
                เพียงกรอกวงเงินต้นทุนของคุณในช่อง <strong className="text-[#f0b90b]">Avbl (USDT)</strong> ระบบจะคำนวณขนาดออเดอร์, Margin, Leverage, ค่า R:R และคาดการณ์กำไร/ขาดทุนให้อัตโนมัติทันที!
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-black bg-[#f0b90b] px-3 py-1.5 rounded-full uppercase whitespace-nowrap">
            1-CLICK BINANCE CALC
          </span>
        </div>

        {/* 📊 MAIN BINANCE TRADING PANEL */}
        <div className="bg-[#181a20] border border-[#2b313a] rounded-2xl p-5 shadow-2xl">
          
          {/* Symbol Bar */}
          <div className="flex justify-between items-center pb-4 mb-5 border-b border-[#2b313a]">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-wide">BTCUSDT</span>
              <span className="text-[10px] font-bold bg-[#2b313a] text-[#f0b90b] px-2 py-0.5 rounded">Perpetual</span>
              <span className="text-[10px] font-bold bg-[#2b313a] text-[#eaecef] px-2 py-0.5 rounded">Cross {leverage}x</span>
            </div>
            <div className="font-mono font-bold text-emerald-400 text-sm">
              65,420.50 USDT
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 👈 LEFT: BINANCE ORDER FORM */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-0 rounded-lg overflow-hidden font-bold text-xs">
                <button className="bg-[#0ecb81] text-white py-2.5 text-center">Buy / Long</button>
                <button className="bg-[#2b313a] text-[#848e9c] py-2.5 text-center hover:text-white">Sell / Short</button>
              </div>

              {/* Avbl Input (ต้นทุน) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#848e9c]">
                  <span>Avbl (เงินทุนของคุณ)</span>
                  <span className="text-[#f0b90b] font-mono font-bold">{avbl.toLocaleString()} USDT</span>
                </div>
                <div className="relative flex items-center bg-[#2b313a] border border-[#f0b90b] rounded-lg px-3 py-2 shadow-[0_0_10px_rgba(240,185,11,0.2)]">
                  <input
                    type="number"
                    value={avbl}
                    onChange={(e) => setAvbl(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-base font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#848e9c] font-bold">USDT</span>
                </div>
              </div>

              {/* Price Input */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#848e9c]">
                  <span>Price (ราคาเข้าออเดอร์)</span>
                  <span className="text-xs text-[#f0b90b] cursor-pointer">BBO</span>
                </div>
                <div className="relative flex items-center bg-[#2b313a] border border-[#474d57] rounded-lg px-3 py-2">
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-sm font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#848e9c]">USDT</span>
                </div>
              </div>

              {/* Auto Size Output */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#848e9c]">
                  <span>Size (ขนาดออเดอร์อัตโนมัติ)</span>
                </div>
                <div className="relative flex items-center bg-[#2b313a] border border-[#474d57] rounded-lg px-3 py-2">
                  <input
                    type="text"
                    readOnly
                    value={orderSizeInCoin.toFixed(4)}
                    className="w-full bg-transparent font-mono text-sm font-bold text-[#0ecb81] focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#848e9c]">BTC</span>
                </div>
              </div>

              {/* Percentage Slider */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[25, 50, 75, 100].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPercentSlider(p)}
                    className={`py-1 rounded text-xs font-mono border transition-all ${
                      percentSlider === p
                        ? "bg-[#f0b90b] text-black font-bold border-[#f0b90b]"
                        : "bg-[#2b313a] text-[#848e9c] border-[#474d57] hover:text-white"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>

              {/* TP/SL inputs */}
              <div className="pt-2 border-t border-[#2b313a] space-y-3">
                <div className="text-xs font-bold text-[#f0b90b]">☑ TP / SL (Take Profit / Stop Loss)</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-[#848e9c] block mb-1">Take Profit</span>
                    <input
                      type="number"
                      value={takeProfitPrice}
                      onChange={(e) => setTakeProfitPrice(Number(e.target.value))}
                      className="w-full bg-[#2b313a] border border-[#0ecb81]/40 rounded-lg p-2 text-xs font-mono text-[#0ecb81] focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#848e9c] block mb-1">Stop Loss</span>
                    <input
                      type="number"
                      value={stopLossPrice}
                      onChange={(e) => setStopLossPrice(Number(e.target.value))}
                      className="w-full bg-[#2b313a] border border-[#f6465d]/40 rounded-lg p-2 text-xs font-mono text-[#f6465d] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* 👉 RIGHT: PRO TRADER ANALYTICS RESULTS */}
            <div className="lg:col-span-6 bg-[#0b0e11] border border-[#2b313a] rounded-xl p-4 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-bold text-[#f0b90b] uppercase tracking-wider mb-3">
                  📊 สรุปผลการคำนวณระดับสถาบัน
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#181a20] p-3 rounded-lg border border-[#2b313a]">
                    <span className="text-[10px] text-[#848e9c] block">Initial Margin (หลักประกัน)</span>
                    <span className="text-lg font-mono font-bold text-[#f0b90b]">
                      {marginUsed.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-[#848e9c] block">({percentSlider}% ของ Avbl)</span>
                  </div>

                  <div className="bg-[#181a20] p-3 rounded-lg border border-[#2b313a]">
                    <span className="text-[10px] text-[#848e9c] block">Position Value (มูลค่ารวม)</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {positionValue.toFixed(2)} USDT
                    </span>
                    <span className="text-[9px] text-[#848e9c] block">Leverage {leverage}x</span>
                  </div>
                </div>

                {/* Risk / Reward & PnL List */}
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-[#2b313a]">
                    <span className="text-[#848e9c]">Est. Profit (Take Profit):</span>
                    <span className="text-[#0ecb81] font-bold">
                      +{estimatedProfit.toFixed(2)} USDT (+{roeProfitPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[#2b313a]">
                    <span className="text-[#848e9c]">Est. Loss (Stop Loss):</span>
                    <span className="text-[#f6465d] font-bold">
                      -{estimatedLoss.toFixed(2)} USDT (-{roeLossPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-[#2b313a]">
                    <span className="text-[#848e9c]">Risk / Reward Ratio:</span>
                    <span className="text-[#f0b90b] font-bold">1 : {rrRatio}</span>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div className="bg-[#0ecb81]/10 border border-[#0ecb81]/30 rounded-lg p-3 text-xs text-[#0ecb81]">
                ✓ <strong>Binance Risk Approved:</strong> การบริหารเงินทุนอยู่ในสัดส่วนปลอดภัย สามารถกดส่งออเดอร์ตามแผนการเทรดได้ทันที
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
