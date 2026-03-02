'use client';

import React, { useState, useEffect } from 'react';
import { computeVolatility } from '../../lib/features/volatility';

export default function SignalsPanel() {
  const [signals, setSignals] = useState<{
    volatility: number;
    rsi: number;
    ma7: number;
    ma30: number;
    status: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/features', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => {
        setSignals({
          volatility: data.volatility,
          rsi: 28.5, // Mock RSI as it's not in the API yet
          ma7: 62450,
          ma30: 61800,
          status: 'READY'
        });
      })
      .catch(err => console.error('Error fetching features:', err));
  }, []);

  if (!signals) return <div className="animate-pulse text-gray-500">Extraction des signaux en cours...</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-blue-500/30 shadow-lg mt-4">
      <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        <span className="text-2xl">🎯</span> Intention de Trade (OS1)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-black/40 p-3 rounded border border-white/5 text-center">
          <div className="text-xs text-gray-400 uppercase mb-1">Action</div>
          <div className="text-lg font-bold text-green-400">ACHETER ETH</div>
        </div>
        <div className="bg-black/40 p-3 rounded border border-white/5 text-center">
          <div className="text-xs text-gray-400 uppercase mb-1">Montant</div>
          <div className="text-lg font-bold text-white">2 000 $ (20%)</div>
        </div>
        <div className="bg-black/40 p-3 rounded border border-white/5 text-center">
          <div className="text-xs text-gray-400 uppercase mb-1">Raison</div>
          <div className="text-lg font-bold text-blue-400">RSI &lt; 30</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Features Extraites</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-800/50 p-2 rounded border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase">Volatilité</div>
            <div className="text-sm font-mono text-white">{(signals.volatility * 100).toFixed(2)}%</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase">RSI (14)</div>
            <div className="text-sm font-mono text-green-400">{signals.rsi.toFixed(1)}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase">MA (7)</div>
            <div className="text-sm font-mono text-white">{signals.ma7.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded border border-white/10">
            <div className="text-[10px] text-gray-500 uppercase">MA (30)</div>
            <div className="text-sm font-mono text-white">{signals.ma30.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
