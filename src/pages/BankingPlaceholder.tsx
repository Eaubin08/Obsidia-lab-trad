import React from 'react';
import { motion } from 'motion/react';
import { Landmark, ArrowLeft, ShieldAlert } from 'lucide-react';

interface BankingPlaceholderProps {
  setActiveTab: (tab: string) => void;
}

export function BankingPlaceholder({ setActiveTab }: BankingPlaceholderProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 pb-20">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/10"
      >
        <Landmark className="w-12 h-12 text-blue-400" />
      </motion.div>
      
      <div className="space-y-4 max-w-xl">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black text-white uppercase tracking-tighter italic"
        >
          🏦 Module Banking
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          Le robot décisionnel bancaire autonome est en cours de développement. 
          Il intégrera bientôt les métriques IR, CIZ, DTS et TSG avec une précision ontologique de 96%.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-mono uppercase tracking-widest"
      >
        <ShieldAlert className="w-4 h-4 text-blue-400" />
        Phase 2: Ontological Decision Engine
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all border border-zinc-800"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour au Dashboard
      </motion.button>
    </div>
  );
}
