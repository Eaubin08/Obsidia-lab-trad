import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { OS4Reports } from './pages/OS4Reports';
import { WorkflowProgress } from './components/WorkflowProgress';
import { Dashboard } from './pages/Dashboard';
import { AgentRegistry } from './pages/AgentRegistry';
import { CapitalVault } from './pages/CapitalVault';
import { RiskRouter } from './pages/RiskRouter';
import { TrustSignals } from './pages/TrustSignals';
import { Leaderboard } from './pages/Leaderboard';
import { Menu, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from './components/Terminal';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('obsidia_active_tab') || 'dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mode, setMode] = useState<'FIX' | 'AUTO'>(() => (localStorage.getItem('obsidia_mode') as 'FIX' | 'AUTO') || 'AUTO');
  const [testType, setTestType] = useState<'AUTONOMOUS' | 'FIXED'>('FIXED');
  const [selectedScenario, setSelectedScenario] = useState(3);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [testStatus, setTestStatus] = useState<'IDLE' | 'RUNNING' | 'COMPLETED'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [currentGate, setCurrentGate] = useState(0);
  const [outcome, setOutcome] = useState<any>(null);
  const [confidenceScore, setConfidenceScore] = useState(0);

  useEffect(() => {
    localStorage.setItem('obsidia_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('obsidia_mode', mode);
  }, [mode]);

  const addLog = (msg: string, isCommand: boolean = false) => {
    if (isCommand || msg.startsWith(' ') || msg.includes('PASS') || msg.includes('✓') || msg.includes('VERDICT')) {
      setLogs(prev => [...prev, msg]);
    } else {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    }
  };

  const runTest = () => {
    setTestStatus('RUNNING');
    setCurrentGate(0);
    setOutcome(null);
    setConfidenceScore(0);
    setIsTerminalOpen(true);
    
    // Add the test header
    addLog(` `, true);
    addLog(`> obsidia-governance-os@1.0.4 test`, true);
    addLog(`Running ERC-8004 governance validation suite...`, true);
    
    if (testType === 'AUTONOMOUS') {
      addLog('  [AI] Initializing Akaton Autonomous Audit Agent...');
      addLog('  [AI] Scanning for ERC-8004 Invariant Breaches...');
    } else {
      addLog('  [FIX] Loading Akaton Deterministic Validation Rules...');
      addLog('  [FIX] Verifying Akaton Compliance Gates...');
    }
  };

  useEffect(() => {
    if (testStatus === 'RUNNING') {
      const isAuto = testType === 'AUTONOMOUS';
      const steps = [
        { 
          gate: 0, 
          confidence: 32,
          logs: isAuto ? [
            '  [AI] Analyzing Akaton attack vectors in OS0 layer...',
            '  [AI] Heuristic evaluation of Akaton model weights: STABLE',
            '  ✓ Identity Registry (ERC-721) — PASS',
            '  PASS  src/gates/akaton/Integrity.gate.ts'
          ] : [
            '  ✓ Identity Registry (ERC-721) — PASS',
            '  PASS  src/gates/akaton/Integrity.gate.ts'
          ]
        },
        { 
          gate: 1, 
          confidence: 64,
          logs: isAuto ? [
            '  [AI] Simulating Akaton adversarial prompt injection...',
            '  [AI] Cross-referencing with Akaton ERC-8004 compliance matrix...',
            '  ✓ Capital Vault (x402) — PASS',
            '  PASS  src/gates/akaton/Temporal.gate.ts'
          ] : [
            '  ✓ Capital Vault (x402) — PASS',
            '  PASS  src/gates/akaton/Temporal.gate.ts'
          ]
        },
        { 
          gate: 2, 
          confidence: 89,
          logs: isAuto ? [
            '  [AI] Validating Akaton zero-knowledge proofs for state transitions...',
            '  [AI] Stress testing Akaton governance invariants...',
            '  ✓ Risk Router (EIP-712) — PASS',
            '  ✓ Trust Signals — PASS',
            '  PASS  src/gates/akaton/Risk.gate.ts'
          ] : [
            '  ✓ Risk Router (EIP-712) — PASS',
            '  ✓ Trust Signals — PASS',
            '  PASS  src/gates/akaton/Risk.gate.ts'
          ]
        },
        { 
          gate: 3, 
          confidence: 100,
          logs: [
            ' ', 
            'Test Files  3 passed (3)', 
            'Tests       4 passed (4)', 
            'Time        1.2s', 
            ' ', 
            'Finalizing Akaton ERC-8004 Artifact...'
          ] 
        }
      ];

      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < steps.length) {
          const step = steps[stepIdx];
          if (step.gate < 3) setCurrentGate(step.gate);
          setConfidenceScore(step.confidence);
          
          step.logs.forEach((log, i) => {
            setTimeout(() => {
              addLog(log);
            }, i * 100);
          });

          stepIdx++;
        } else {
          clearInterval(interval);
          setTestStatus('COMPLETED');
          setConfidenceScore(100);
          
          const scenarios = [
            { id: 1, outcome: 'BLOCK', reason: 'G1 Integrity Failure' },
            { id: 2, outcome: 'HOLD', reason: 'G2 Temporal Lock Active' },
            { id: 3, outcome: 'EXECUTE', reason: 'All Gates Verified' },
            { id: 4, outcome: 'BLOCK', reason: 'G3 Risk Threshold Exceeded' },
            { id: 5, outcome: 'EXECUTE', reason: 'All Gates Verified' },
          ];

          if (mode === 'FIX') {
            const s = scenarios.find(sc => sc.id === selectedScenario);
            setOutcome(s || scenarios[2]);
            addLog(` `);
            addLog(`VERDICT: ${s?.outcome || 'EXECUTE'}`);
          } else {
            const random = Math.random();
            let res = random > 0.7 ? scenarios[0] : random > 0.5 ? scenarios[1] : scenarios[2];
            setOutcome(res);
            addLog(` `);
            addLog(`VERDICT: ${res.outcome}`);
          }
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [testStatus, mode, selectedScenario, testType]);


  const renderContent = () => {
    const props = { 
      mode, 
      testType,
      setTestType,
      selectedScenario,
      testStatus,
      logs,
      currentGate,
      confidenceScore,
      outcome,
      onRunTest: runTest,
      onReset: () => {
        setTestStatus('IDLE');
        setConfidenceScore(0);
      }
    };
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {(() => {
            switch (activeTab) {
              case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
              case 'step1': return <AgentRegistry onNext={() => setActiveTab('step2')} />;
              case 'step2': return <CapitalVault onNext={() => setActiveTab('step3')} />;
              case 'step3': return <RiskRouter onNext={() => setActiveTab('step4')} />;
              case 'step4': return <TrustSignals onNext={() => setActiveTab('step5')} />;
              case 'step5': return <Leaderboard onNext={() => setActiveTab('dashboard')} />;
              case 'os4': return <OS4Reports {...props} />;
              default: return <Dashboard setActiveTab={setActiveTab} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mode={mode}
        setMode={setMode}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
        isTerminalOpen={isTerminalOpen}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <span className="text-emerald-400 font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-white tracking-tight">Obsidia</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Header (Optional, for better circulation) */}
        <div className="hidden lg:flex items-center justify-between px-12 py-4 border-b border-zinc-800/30 bg-black/50 backdrop-blur-sm z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={cn(
                "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors",
                activeTab === 'dashboard' ? "text-emerald-400" : "text-zinc-500 hover:text-white"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AKATON_HACKATHON_V1.0
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-500">
              0x742d...44e
            </div>
          </div>
        </div>

        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 transition-all duration-300",
          isTerminalOpen ? (isTerminalMaximized ? "pb-[90vh]" : "pb-[400px]") : "pb-12"
        )}>
          <div className="max-w-6xl mx-auto">
            <WorkflowProgress activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderContent()}
          </div>
        </main>

        <Terminal 
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)}
          isMaximized={isTerminalMaximized}
          onToggleMaximize={() => setIsTerminalMaximized(!isTerminalMaximized)}
          onRunTest={runTest}
          onAddLog={(msg) => addLog(msg, msg.startsWith('$'))}
          logs={logs}
          testStatus={testStatus}
        />
      </div>
    </div>
  );
}
