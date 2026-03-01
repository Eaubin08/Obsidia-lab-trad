import React from 'react';
import { 
  Shield, 
  Eye, 
  Activity, 
  Gavel, 
  FileText, 
  Menu,
  X,
  Settings,
  Database,
  Lock,
  Terminal as TerminalIcon,
  UserPlus,
  Wallet,
  Zap,
  Award,
  Trophy,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mode: 'FIX' | 'AUTO';
  setMode: (mode: 'FIX' | 'AUTO') => void;
  selectedScenario: number;
  setSelectedScenario: (id: number) => void;
  isTerminalOpen: boolean;
  onToggleTerminal: () => void;
}

const scenarios = [
  { id: 1, label: 'BLOCK: Low Coherence', outcome: 'BLOCK' },
  { id: 2, label: 'HOLD: X-108 Timer', outcome: 'HOLD' },
  { id: 3, label: 'EXECUTE: All Pass', outcome: 'EXECUTE' },
  { id: 4, label: 'BLOCK: Destructive Sim', outcome: 'BLOCK' },
  { id: 5, label: 'EXECUTE: Reversible', outcome: 'EXECUTE' },
];

const hackathonSteps = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'step1', label: '1. Agent Registry', icon: UserPlus },
  { id: 'step2', label: '2. Capital Vault', icon: Wallet },
  { id: 'step3', label: '3. Risk Router', icon: Zap },
  { id: 'step4', label: '4. Trust Signals', icon: Award },
  { id: 'step5', label: '5. Leaderboard', icon: Trophy },
];

const auditTools = [
  { id: 'os4', label: 'AI Audit Reports', icon: FileText },
];

export function Sidebar({ 
  isOpen, 
  setIsOpen, 
  activeTab, 
  setActiveTab,
  mode,
  setMode,
  selectedScenario,
  setSelectedScenario,
  isTerminalOpen,
  onToggleTerminal
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800/50 text-zinc-300 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0 lg:static lg:h-screen flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">Obsidia</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {/* Mode Switcher */}
          <div className="space-y-2">
            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-3">Operation Mode</div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <button 
                onClick={() => setMode('FIX')}
                className={cn(
                  "py-1.5 text-[10px] font-bold rounded-md transition-all duration-300",
                  mode === 'FIX' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                FIX
              </button>
              <button 
                onClick={() => setMode('AUTO')}
                className={cn(
                  "py-1.5 text-[10px] font-bold rounded-md transition-all duration-300",
                  mode === 'AUTO' ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                AUTO
              </button>
            </div>
          </div>

          {/* Scenarios (Only in FIX mode) */}
          {mode === 'FIX' && (
            <div className="space-y-3">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-3">Proof Scenarios</div>
              <div className="space-y-1.5">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenario(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 border",
                      selectedScenario === s.id 
                        ? "bg-zinc-800/50 border-zinc-700 text-white" 
                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    )}
                  >
                    <span className="text-xs font-medium">{s.label}</span>
                    <span className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                      s.outcome === 'BLOCK' ? "text-red-400 border-red-500/20 bg-red-500/5" :
                      s.outcome === 'HOLD' ? "text-amber-400 border-amber-500/20 bg-amber-500/5" :
                      "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                    )}>
                      {s.outcome}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-3">Hackathon Workflow</div>
            <div className="space-y-1">
              {hackathonSteps.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group border",
                      isActive 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 border-transparent"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", isActive ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400")} />
                    <div>
                      <div className={cn("text-xs font-bold tracking-tight", isActive ? "text-emerald-400" : "text-zinc-300")}>
                        {item.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-3">Akaton Validation</div>
            <div className="space-y-1">
              {auditTools.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group border",
                      isActive 
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                        : "hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 border-transparent"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", isActive ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400")} />
                    <div>
                      <div className={cn("text-xs font-bold tracking-tight", isActive ? "text-blue-400" : "text-zinc-300")}>
                        {item.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-zinc-800/30 space-y-4">
          <button 
            onClick={onToggleTerminal}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border",
              isTerminalOpen ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700"
            )}
          >
            <TerminalIcon className="w-4 h-4" />
            Terminal
          </button>
          <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-[10px] font-bold text-white mb-4 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Akaton Node Status
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 tracking-wider">
                <span>REPUTATION SCORE</span>
                <span className="text-emerald-400">96.4</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[96%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 mt-1">
                <span>L2_SYNC_ACTIVE</span>
                <span>0x8F3A...9C2B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
