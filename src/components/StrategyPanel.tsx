'use client';

import React from 'react';
import { STRATEGY_CONFIG } from '../config/strategy';

export default function StrategyPanel() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-green-500/30 shadow-lg mt-4">
      <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
        <span className="text-2xl">📊</span> Stratégie : {STRATEGY_CONFIG.name}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 p-4 rounded border border-white/5">
          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            💰 Allocation
          </h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p className="flex justify-between">
              <span>Capital sandbox :</span>
              <span className="text-white font-mono">{STRATEGY_CONFIG.capital.toLocaleString()} $</span>
            </p>
            <p className="flex justify-between">
              <span>Actifs autorisés :</span>
              <span className="text-white font-mono">{STRATEGY_CONFIG.assets.join(', ')}</span>
            </p>
          </div>
        </div>
        
        <div className="bg-black/40 p-4 rounded border border-white/5">
          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            🛡️ Règles de Gouvernance
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li className="flex justify-between">
              <span>Max drawdown :</span>
              <span className="text-white font-mono">{STRATEGY_CONFIG.rules.maxDrawdown * 100}%</span>
            </li>
            <li className="flex justify-between">
              <span>Position max :</span>
              <span className="text-white font-mono">{STRATEGY_CONFIG.rules.maxPositionSize * 100}%</span>
            </li>
            <li className="flex justify-between">
              <span>Stop-loss :</span>
              <span className="text-white font-mono">{STRATEGY_CONFIG.rules.stopLoss * 100}%</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-black/40 p-4 rounded border border-white/5">
        <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
          🎯 Signaux de Trading
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STRATEGY_CONFIG.signals.map((signal, idx) => (
            <div key={idx} className="bg-gray-800/50 p-2 rounded border border-white/10 text-xs">
              <div className="font-bold text-white mb-1">{signal.name}</div>
              <div className="text-gray-400 font-mono">{signal.condition}</div>
              <div className="text-green-500 mt-1 font-bold">→ {signal.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
