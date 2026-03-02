import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Domain {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  status: 'active' | 'coming-soon';
  bgGradient: string;
  route: string;
}

const DOMAINS: Domain[] = [
  {
    id: 'trading',
    name: 'Trading',
    icon: '📈',
    description: 'Agent de trading avec gouvernance ERC-8004',
    features: [
      'Pipeline OS0→OS4 complet',
      'Simulation Monte Carlo',
      'Validation Gates (Integrity, X-108, Risk)',
      'Export artifacts ERC-8004'
    ],
    status: 'active',
    bgGradient: 'from-emerald-900 to-emerald-700',
    route: 'dashboard'
  },
  {
    id: 'banking',
    name: 'Banking',
    icon: '🏦',
    description: 'Robot décisionnel bancaire autonome',
    features: [
      'Métriques IR, CIZ, DTS, TSG',
      '9 Tests ontologiques (96% précision)',
      'Gemini AI justifications',
      'ROI temps réel'
    ],
    status: 'coming-soon',
    bgGradient: 'from-blue-900 to-blue-700',
    route: 'banking'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    description: 'Sécurité structurelle X-108',
    features: [
      'Temporal Lock (10s HOLD)',
      'Coherence Scoring (min 0.6)',
      'Tokenomics $X108',
      'Moltbook Integration'
    ],
    status: 'coming-soon',
    bgGradient: 'from-purple-900 to-purple-700',
    route: 'ecommerce'
  }
];

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export function HomeDashboard({ setActiveTab }: HomeDashboardProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleDomainClick = (domain: Domain) => {
    if (domain.status === 'active') {
      setSelectedDomain(domain.id);
      setActiveTab(domain.route);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Plateforme de Gouvernance IA
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Sélectionnez un domaine pour accéder aux outils de gouvernance autonome
          avec validation on-chain et audit complet.
        </motion.p>
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {DOMAINS.map((domain, i) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleDomainClick(domain)}
            className={`
              relative group rounded-3xl overflow-hidden
              border-2 transition-all duration-300
              ${domain.status === 'active' 
                ? 'border-zinc-800 hover:border-emerald-500 cursor-pointer hover:scale-[1.02]' 
                : 'border-zinc-900 opacity-60 cursor-not-allowed'
              }
              ${selectedDomain === domain.id ? 'ring-4 ring-emerald-500' : ''}
              bg-zinc-950
            `}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${domain.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
            
            {/* Content */}
            <div className="relative p-8 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="text-6xl filter drop-shadow-lg">{domain.icon}</div>
                {domain.status === 'coming-soon' && (
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700">
                    Bientôt
                  </span>
                )}
                {domain.status === 'active' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white uppercase tracking-tight italic mb-2">{domain.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{domain.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {domain.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span className="text-zinc-400 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              {domain.status === 'active' ? (
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-900/20">
                  Accéder au module →
                </button>
              ) : (
                <button disabled className="w-full py-4 rounded-xl bg-zinc-900 text-zinc-700 font-black uppercase tracking-widest text-xs cursor-not-allowed border border-zinc-800">
                  En développement
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { label: 'Domaines actifs', value: '1 / 3', color: 'text-emerald-400' },
          { label: 'Agents enregistrés', value: '142', color: 'text-white' },
          { label: 'Transactions validées', value: '8.4K', color: 'text-white' },
          { label: 'Score moyen', value: '94.2', color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="bg-zinc-900/30 rounded-2xl p-6 border border-zinc-800/50 text-center"
          >
            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</div>
            <div className={`text-3xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center space-y-4 pt-8">
        <p className="text-zinc-500 text-xs font-medium tracking-wide">
          🏛️ Plateforme développée pour les hackathons Akaton, Launch Fund AI & Arc + Circle
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-700 uppercase tracking-[0.2em]">
          <span>ERC-8004</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <span>EIP-712</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <span>X-108</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <span>Monte Carlo</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <span>Gemini AI</span>
        </div>
      </div>
    </div>
  );
}
