import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowLeft, ShieldAlert } from 'lucide-react';

interface EcommercePlaceholderProps {
  setActiveTab: (tab: string) => void;
}

export function EcommercePlaceholder({ setActiveTab }: EcommercePlaceholderProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 pb-20">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 shadow-2xl shadow-purple-500/10"
      >
        <ShoppingCart className="w-12 h-12 text-purple-400" />
      </motion.div>
      
      <div className="space-y-4 max-w-xl">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black text-white uppercase tracking-tighter italic"
        >
          🛒 Module E-commerce
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          La sécurité structurelle X-108 est en cours de déploiement. 
          Il intégrera bientôt le Temporal Lock (10s HOLD) et le Coherence Scoring (min 0.6).
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-mono uppercase tracking-widest"
      >
        <ShieldAlert className="w-4 h-4 text-purple-400" />
        Phase 3: Structural Security X-108
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
