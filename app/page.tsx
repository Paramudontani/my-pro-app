import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, RefreshCw, Layers, Zap, 
  ArrowUpRight, ArrowDownRight, ShieldAlert, BarChart2 
} from 'lucide-react';

export default function FuturisticTradingDashboard() {
  const [tradeType, setTradeType] = useState('long'); // 'long' or 'short'
  const [leverage, setLeverage] = useState(20);
  const [entryPrice, setEntryPrice] = useState(65000);
  const [targetPrice, setTargetPrice] = useState(72000);
  const [positionSize, setPositionSize] = useState(1000);

  // Math Calculations
  const positionVal = positionSize * leverage;
  const priceDiff = tradeType === 'long' ? targetPrice - entryPrice : entryPrice - targetPrice;
  const pnlPct = (priceDiff / entryPrice) * 100 * leverage;
  const estimatedPnl = (positionVal * (priceDiff / entryPrice));

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cyan-500/20 pb-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
              CYBERX TRADING ENGINE
            </h1>
            <p className="text-xs text-slate-400 tracking-wider">BINANCE FUTURES / NEON CORE EDITION</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs">BTC/USDT SPOT</span>
            <span className="font-mono text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]">
              $65,240.50
            </span>
          </div>
          <div className="h-8 w-[1px] bg-cyan-500/20" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs">24H HIGH</span>
            <span className="font-mono text-cyan-300">$66,800.00</span>
          </div>
          <div className="h-8 w-[1px] bg-cyan-500/20" />
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs">24H LOW</span>
            <span className="font-mono text-slate-400">$63,120.00</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b121e]/80 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.05)]">
            
            {/* Long / Short Toggle */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#05080e] rounded-xl border border-cyan-500/10 mb-6">
              <button
                onClick={() => setTradeType('long')}
                className={`py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  tradeType === 'long'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-[0_0_20px_rgba(0,255,102,0.5)] scale-[1.02]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" /> LONG (BUY)
              </button>
              <button
                onClick={() => setTradeType('short')}
                className={`py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  tradeType === 'short'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,102,255,0.5)] scale-[1.02]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" /> SHORT (SELL)
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              {/* Leverage Slider */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">LEVERAGE MULTIPLIER</span>
                  <span className="font-mono text-cyan-400 font-bold">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="125"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full h-2 bg-[#05080e] rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-cyan-500/20"
                />
              </div>

              {/* Entry Price */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">ENTRY PRICE (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full bg-[#05080e] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white transition-all"
                  />
                  <span className="absolute right-4 top-3 text-xs text-slate-500 font-mono">USDT</span>
                </div>
              </div>

              {/* Target Price */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">TARGET PRICE (EXIT)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full bg-[#05080e] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white transition-all"
                  />
                  <span className="absolute right-4 top-3 text-xs text-slate-500 font-mono">USDT</span>
                </div>
              </div>

              {/* Position Size */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">MARGIN SIZE (USDT)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={positionSize}
                    onChange={(e) => setPositionSize(Number(e.target.value))}
                    className="w-full bg-[#05080e] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white transition-all"
                  />
                  <span className="absolute right-4 top-3 text-xs text-slate-500 font-mono">USDT</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:opacity-90 shadow-[0_0_25px_rgba(0,255,102,0.4)] transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-black" /> EXECUTE FUTURES ORDER
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Analytics & PnL Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main PnL Card */}
          <div className="relative bg-[#0b121e]/80 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl overflow-hidden shadow-[0_0_20px_rgba(0,102,255,0.05)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-bl-full pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs tracking-wider text-slate-400 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" /> ESTIMATED PROJECTIONS
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                {leverage}X CROSS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[#05080e]/60 border border-cyan-500/10">
                <span className="text-xs text-slate-400 block mb-1">PROFIT / LOSS (ROE)</span>
                <span className={`text-3xl font-mono font-bold ${
                  pnlPct >= 0 
                    ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,102,0.5)]' 
                    : 'text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                }`}>
                  {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#05080e]/60 border border-cyan-500/10">
                <span className="text-xs text-slate-400 block mb-1">ESTIMATED PnL ($)</span>
                <span className={`text-3xl font-mono font-bold ${
                  estimatedPnl >= 0 
                    ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,102,0.5)]' 
                    : 'text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                }`}>
                  {estimatedPnl >= 0 ? '+' : ''}${estimatedPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Position Summary Table */}
            <div className="space-y-3 border-t border-cyan-500/10 pt-4 text-sm font-mono">
              <div className="flex justify-between text-slate-400">
                <span>TOTAL POSITION VALUE</span>
                <span className="text-white">${positionVal.toLocaleString()} USDT</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EST. LIQUIDATION PRICE</span>
                <span className="text-amber-400">
                  ${(tradeType === 'long' ? entryPrice * (1 - 1/leverage) : entryPrice * (1 + 1/leverage)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>MAINTENANCE MARGIN</span>
                <span className="text-cyan-300">0.50%</span>
              </div>
            </div>
          </div>

          {/* Bottom Info Banner */}
          <div className="bg-gradient-to-r from-cyan-950/30 to-emerald-950/30 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-4 text-xs text-slate-300">
            <ShieldAlert className="w-6 h-6 text-cyan-400 shrink-0" />
            <p>
              <strong className="text-cyan-300">NEON RISK CONTROL:</strong> High leverage increases liquidation probability. Ensure your stop-loss parameters align with your risk management framework.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
