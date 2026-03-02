import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Landmark, 
  ShoppingCart, 
  Shield, 
  Activity, 
  Users, 
  Zap,
  ArrowRight,
  Globe,
  Lock,
  BarChart3
} from 'lucide-react';
import { DOMAINS } from '../config/domains';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export function HomeDashboard({ setActiveTab }: HomeDashboardProps) {
  const stats = [
    { label: 'Domaines Actifs', value: '3', icon: Globe, color: 'text-blue-400' },
    { label: 'Agents Déployés', value: '1,284', icon: Users, color: 'text-emerald-400' },
    { label: 'Transactions 24h', value: '42.8k', icon: Activity, color: 'text-purple-400' },
    { label: 'Score de Sécurité', value: '98.2%', icon: Shield, color: 'text-amber-400' },
  ];

  const handleDomainClick = (id: string) => {
    if (id === 'trading') {
      setActiveTab('dashboard');
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
            OBSIDIA MISSION CONTROL
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Gouvernance décentralisée et sécurité structurelle pour les agents autonomes à travers les domaines critiques.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Domain Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(Object.keys(DOMAINS) as Array<keyof typeof DOMAINS>).map((id, index) => {
          const domain = DOMAINS[id];
          const Icon = id === 'trading' ? TrendingUp : id === 'banking' ? Landmark : ShoppingCart;
          
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => handleDomainClick(id)}
              className="group relative cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${
                id === 'trading' ? 'from-emerald-500/20 to-transparent' : 
                id === 'banking' ? 'from-blue-500/20 to-transparent' : 
                'from-orange-500/20 to-transparent'
              } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl h-full flex flex-col transition-all duration-300 group-hover:border-zinc-700">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${
                  id === 'trading' ? 'bg-emerald-500/10 text-emerald-400' : 
                  id === 'banking' ? 'bg-blue-500/10 text-blue-400' : 
                  'bg-orange-500/10 text-orange-400'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform uppercase italic tracking-tighter">
                  {domain.name}
                </h3>
                <p className="text-zinc-400 mb-8 flex-grow leading-relaxed text-sm">
                  {domain.description}
                </p>

                <div className="space-y-3 mb-8">
                  {domain.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                      <Zap className="w-3 h-3 text-zinc-700" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    ACCÉDER AU MODULE
                  </span>
                  <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-800 pt-12">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-zinc-500" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1 text-sm uppercase tracking-tight">Sécurité Structurelle</h4>
            <p className="text-xs text-zinc-500">Protocoles de protection multi-couches pour chaque domaine d'intervention.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-zinc-500" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1 text-sm uppercase tracking-tight">Analyse Temps Réel</h4>
            <p className="text-xs text-zinc-500">Surveillance continue des métriques de risque et de performance.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-zinc-500" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1 text-sm uppercase tracking-tight">Conformité ERC-8004</h4>
            <p className="text-xs text-zinc-500">Standardisation de la gouvernance pour les agents autonomes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
