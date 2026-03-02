import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  BrainCircuit,
  ArrowLeft,
  Search,
  RefreshCw,
  Info
} from 'lucide-react';
import { calculateMetrics, makeDecision } from '../lib/banking/engine';
import { generateJustification } from '../lib/banking/gemini';
import { Transaction, BankingMetrics, OntologicalTests, BankingDecision } from '../types';

interface BankingModuleProps {
  setActiveTab: (tab: string) => void;
}

export function BankingModule({ setActiveTab }: BankingModuleProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [metrics, setMetrics] = useState<BankingMetrics | null>(null);
  const [decision, setDecision] = useState<{ decision: BankingDecision; confidence: number } | null>(null);
  const [justification, setJustification] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initial mock data
  useEffect(() => {
    const mockTxs: Transaction[] = [
      { id: 'TX-9021', amount: 45000, currency: 'USD', recipient: 'Unknown Corp', sender: 'Main Vault', timestamp: Date.now() - 10000, type: 'TRANSFER' },
      { id: 'TX-8842', amount: 1200, currency: 'EUR', recipient: 'Verified Supplier', sender: 'Operations', timestamp: Date.now() - 50000, type: 'PAYMENT' },
      { id: 'TX-7731', amount: 850000, currency: 'USDC', recipient: 'Offshore Entity', sender: 'Treasury', timestamp: Date.now() - 120000, type: 'TRANSFER' },
    ];
    setTransactions(mockTxs);
  }, []);

  const analyzeTransaction = async (tx: Transaction) => {
    setSelectedTx(tx);
    setIsAnalyzing(true);
    setJustification('');
    
    // 1. Calculate Metrics
    const m = calculateMetrics(tx);
    setMetrics(m);

    // 2. Run Ontological Tests (Mock)
    const tests: OntologicalTests = {
      identityVerified: tx.amount < 100000,
      intentClear: tx.type !== 'WITHDRAWAL' || tx.amount < 50000,
      sourceLegit: tx.sender === 'Main Vault' || tx.sender === 'Operations',
      destinationSafe: tx.recipient !== 'Offshore Entity' && tx.recipient !== 'Unknown Corp',
      velocityNormal: true,
      patternMatch: tx.amount % 1000 !== 0, // Suspicious if too round
      complianceCheck: true,
      riskThreshold: tx.amount < 500000,
      liquidityCheck: true,
    };

    // 3. Make Decision
    const d = makeDecision(m, tests);
    setDecision(d);

    // 4. Generate Gemini Justification
    const j = await generateJustification(d.decision, m);
    setJustification(j);
    
    setIsAnalyzing(false);
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
              <Landmark className="w-8 h-8 text-blue-400" />
              Bank Safety Lab
            </h2>
            <p className="text-zinc-500 text-sm">Robot décisionnel autonome pour la surveillance bancaire.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400">
            Ontological Engine Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Transaction List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Flux Transactions</h3>
            <RefreshCw className="w-4 h-4 text-zinc-700 cursor-pointer hover:text-zinc-500" />
          </div>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => analyzeTransaction(tx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedTx?.id === tx.id 
                    ? 'bg-blue-500/10 border-blue-500/50' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-zinc-500">{tx.id}</span>
                  <span className={`text-xs font-bold ${tx.amount > 50000 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {tx.amount.toLocaleString()} {tx.currency}
                  </span>
                </div>
                <div className="text-sm font-bold text-white truncate">{tx.recipient}</div>
                <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">{tx.type}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Analysis Dashboard */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!selectedTx ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center"
              >
                <Search className="w-12 h-12 text-zinc-800 mb-4" />
                <h3 className="text-xl font-bold text-zinc-600 mb-2">Sélectionnez une transaction</h3>
                <p className="text-zinc-700 text-sm max-w-xs">Cliquez sur une transaction dans le flux pour lancer l'analyse ontologique.</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedTx.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Decision Banner */}
                <div className={`p-6 rounded-3xl border-2 flex items-center justify-between ${
                  decision?.decision === 'AUTHORIZE' ? 'bg-emerald-500/10 border-emerald-500/50' :
                  decision?.decision === 'ANALYZE' ? 'bg-amber-500/10 border-amber-500/50' :
                  'bg-red-500/10 border-red-500/50'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      decision?.decision === 'AUTHORIZE' ? 'bg-emerald-500 text-black' :
                      decision?.decision === 'ANALYZE' ? 'bg-amber-500 text-black' :
                      'bg-red-500 text-white'
                    }`}>
                      {decision?.decision === 'AUTHORIZE' ? <CheckCircle2 /> :
                       decision?.decision === 'ANALYZE' ? <Activity /> :
                       <AlertTriangle />}
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Verdict Robot</div>
                      <div className="text-2xl font-black italic uppercase tracking-tighter">
                        {decision?.decision || 'ANALYZING...'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Confiance</div>
                    <div className="text-2xl font-black italic text-white">
                      {decision?.confidence.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'IR (Irreversibility)', value: metrics?.IR, color: 'text-blue-400' },
                    { label: 'CIZ (Conflict Zone)', value: metrics?.CIZ, color: 'text-purple-400' },
                    { label: 'DTS (Time Sensitivity)', value: metrics?.DTS, color: 'text-amber-400' },
                    { label: 'TSG (Total Guard)', value: metrics?.TSG, color: 'text-emerald-400' },
                  ].map((m) => (
                    <div key={m.label} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">{m.label}</div>
                      <div className={`text-xl font-black ${m.color}`}>{m.value?.toFixed(3)}</div>
                    </div>
                  ))}
                </div>

                {/* Gemini Justification */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <BrainCircuit className="w-6 h-6 text-blue-500/20" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-blue-400" />
                    Justification IA (Gemini)
                  </h4>
                  {isAnalyzing ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
                      <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
                      <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/6" />
                    </div>
                  ) : (
                    <p className="text-zinc-300 leading-relaxed italic font-light">
                      "{justification || 'En attente d\'analyse...'}"
                    </p>
                  )}
                </div>

                {/* Ontological Tests */}
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Tests Ontologiques (9/9)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6">
                    {[
                      { name: 'Vérification Identité', key: 'identityVerified' },
                      { name: 'Clarté de l\'Intention', key: 'intentClear' },
                      { name: 'Légitimité Source', key: 'sourceLegit' },
                      { name: 'Sécurité Destination', key: 'destinationSafe' },
                      { name: 'Normalité Vélocité', key: 'velocityNormal' },
                      { name: 'Correspondance Pattern', key: 'patternMatch' },
                      { name: 'Contrôle Conformité', key: 'complianceCheck' },
                      { name: 'Seuil de Risque', key: 'riskThreshold' },
                      { name: 'Vérification Liquidité', key: 'liquidityCheck' }
                    ].map((test) => {
                      // We need to re-run the logic or store the results. 
                      // For now, let's just use the logic from analyzeTransaction
                      const isPassed = 
                        test.key === 'identityVerified' ? selectedTx.amount < 100000 :
                        test.key === 'intentClear' ? (selectedTx.type !== 'WITHDRAWAL' || selectedTx.amount < 50000) :
                        test.key === 'sourceLegit' ? (selectedTx.sender === 'Main Vault' || selectedTx.sender === 'Operations') :
                        test.key === 'destinationSafe' ? (selectedTx.recipient !== 'Offshore Entity' && selectedTx.recipient !== 'Unknown Corp') :
                        test.key === 'velocityNormal' ? true :
                        test.key === 'patternMatch' ? (selectedTx.amount % 1000 !== 0) :
                        test.key === 'complianceCheck' ? true :
                        test.key === 'riskThreshold' ? (selectedTx.amount < 500000) :
                        true;

                      return (
                        <div key={test.key} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{test.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
