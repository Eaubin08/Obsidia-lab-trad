import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  ShieldAlert, 
  Clock, 
  Zap, 
  Activity, 
  Coins,
  ArrowLeft,
  History,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';
import { evaluateAction, calculateFees } from '../lib/ecommerce/safetyGate';
import { AgentAction, SafetyGateResult, TokenomicsModel } from '../types';

interface EcommerceModuleProps {
  setActiveTab: (tab: string) => void;
}

export function EcommerceModule({ setActiveTab }: EcommerceModuleProps) {
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [lastAction, setLastAction] = useState<AgentAction | null>(null);
  const [currentResult, setCurrentResult] = useState<SafetyGateResult | null>(null);
  const [tokenomics, setTokenomics] = useState({
    totalFee: 0,
    stakerReward: 0,
    treasuryAmount: 0,
    buybackAmount: 0
  });

  const model: TokenomicsModel = {
    fee_rate: 0.001, // 0.1%
    staker_share: 0.5,
    treasury_share: 0.3,
    buyback_share: 0.2
  };

  const triggerAction = (type: 'PURCHASE' | 'BID' | 'LIST') => {
    const newAction: AgentAction = {
      id: `ACT-${Math.floor(Math.random() * 10000)}`,
      agent_id: 'AGENT-X108',
      type,
      amount: Math.floor(Math.random() * 5000) + 100,
      recipient: 'Marketplace V3',
      timestamp: Date.now(),
      coherence: Math.random() * 0.4 + 0.6 // 0.6 to 1.0
    };

    const result = evaluateAction(newAction, lastAction);
    setCurrentResult(result);

    if (result.decision === 'ALLOW') {
      setLastAction(newAction);
      setActions(prev => [newAction, ...prev].slice(0, 5));
      
      const fees = calculateFees(newAction.amount, model);
      setTokenomics(prev => ({
        totalFee: prev.totalFee + fees.totalFee,
        stakerReward: prev.stakerReward + fees.stakerReward,
        treasuryAmount: prev.treasuryAmount + fees.treasuryAmount,
        buybackAmount: prev.buybackAmount + fees.buybackAmount
      }));

      // Simulate Moltbook Publication
      console.log('Publishing to Moltbook...', {
        timestamp: new Date().toISOString(),
        decision: result.decision,
        coherence: result.coherence,
        temporal_delta: result.temporal_delta,
        amount: newAction.amount,
        recipient: newAction.recipient,
        agent_id: newAction.agent_id
      });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('home')}
            className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-orange-400" />
              X-108 Safety Gate
            </h2>
            <p className="text-zinc-500 text-sm">Sécurité structurelle et verrouillage temporel pour l'e-commerce agentique.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black uppercase tracking-widest text-orange-400">
            Temporal Lock Active (10s)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              Simulateur d'Action Agent
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => triggerAction('PURCHASE')}
                className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-between px-6 transition-all"
              >
                <span>Achat Direct</span>
                <ShoppingCart className="w-5 h-5 opacity-50" />
              </button>
              <button 
                onClick={() => triggerAction('BID')}
                className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-between px-6 transition-all"
              >
                <span>Placer une Enchère</span>
                <Activity className="w-5 h-5 opacity-50" />
              </button>
              <button 
                onClick={() => triggerAction('LIST')}
                className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-between px-6 transition-all"
              >
                <span>Mettre en Vente</span>
                <Coins className="w-5 h-5 opacity-50" />
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-zinc-950 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-zinc-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contrainte Temporelle</span>
              </div>
              <div className="text-sm text-zinc-400">
                Un délai de <span className="text-orange-400 font-bold">10 secondes</span> est requis entre chaque action pour prévenir les attaques de vélocité.
              </div>
            </div>
          </div>

          {/* Tokenomics Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              Tokenomics $X108
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm text-zinc-500">Frais Totaux Collectés</span>
                <span className="text-2xl font-black text-white">{tokenomics.totalFee.toFixed(4)} $X108</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="text-[8px] font-black uppercase text-zinc-600 mb-1">Stakers</div>
                  <div className="text-xs font-bold text-emerald-400">{tokenomics.stakerReward.toFixed(4)}</div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="text-[8px] font-black uppercase text-zinc-600 mb-1">Treasury</div>
                  <div className="text-xs font-bold text-blue-400">{tokenomics.treasuryAmount.toFixed(4)}</div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="text-[8px] font-black uppercase text-zinc-600 mb-1">Buyback</div>
                  <div className="text-xs font-bold text-purple-400">{tokenomics.buybackAmount.toFixed(4)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Feed & Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Last Result */}
          <AnimatePresence mode="wait">
            {currentResult && (
              <motion.div
                key={Date.now()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl border-2 ${
                  currentResult.decision === 'ALLOW' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-red-500/10 border-red-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {currentResult.decision === 'ALLOW' ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                        <Unlock className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Verdict X-108</div>
                      <div className="text-xl font-black italic uppercase tracking-tighter">
                        {currentResult.decision === 'ALLOW' ? 'ACTION AUTORISÉE' : 'ACTION BLOQUÉE'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Cohérence</div>
                    <div className="text-xl font-black text-white">{(currentResult.coherence * 100).toFixed(1)}%</div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 italic">
                  "{currentResult.reason}" — Delta Temporel: {currentResult.temporal_delta.toFixed(1)}s
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feed */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <History className="w-4 h-4" />
                Moltbook Feed (X-108)
              </h3>
              <ExternalLink className="w-4 h-4 text-zinc-700 cursor-pointer hover:text-zinc-500" />
            </div>
            <div className="space-y-4">
              {actions.length === 0 ? (
                <div className="text-center py-12 text-zinc-700 italic text-sm">
                  Aucune action enregistrée dans le feed.
                </div>
              ) : (
                actions.map((action, i) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-800/50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500">
                      {action.type === 'PURCHASE' ? <ShoppingCart className="w-5 h-5" /> : 
                       action.type === 'BID' ? <Activity className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-white">{action.type}</span>
                        <span className="text-[10px] font-mono text-zinc-600">{new Date(action.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {action.amount} $X108 → {action.recipient}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
