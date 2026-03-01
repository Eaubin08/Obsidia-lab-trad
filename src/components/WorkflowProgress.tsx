import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkflowProgressProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function WorkflowProgress({ activeTab, setActiveTab }: WorkflowProgressProps) {
  const steps = [
    { id: 'step1', label: 'Identity' },
    { id: 'step2', label: 'Capital' },
    { id: 'step3', label: 'Execution' },
    { id: 'step4', label: 'Validation' },
    { id: 'step5', label: 'Ranking' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === activeTab);
  
  if (currentStepIndex === -1 && activeTab !== 'dashboard') return null;
  if (activeTab === 'dashboard') return null;

  return (
    <div className="mb-12 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
      <div className="flex items-center justify-between min-w-[450px] max-w-3xl mx-auto px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isPast = index <= currentStepIndex;
          
          return (
            <React.Fragment key={step.id}>
              <button 
                onClick={() => setActiveTab(step.id)}
                className="flex flex-col items-center gap-3 relative z-10 group outline-none"
              >
                <div className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  isCompleted ? "bg-emerald-500 border-emerald-500 text-black" :
                  isActive ? "bg-black border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" :
                  "bg-black border-zinc-800 text-zinc-600 group-hover:border-zinc-600"
                )}>
                  {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5 font-bold" /> : <span className="text-[10px] sm:text-xs font-bold">{index + 1}</span>}
                </div>
                <span className={cn(
                  "text-[8px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                  isActive ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
                )}>
                  {step.label}
                </span>
              </button>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-[1px] sm:h-[2px] bg-zinc-800 mx-2 sm:mx-4 -mt-8 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-emerald-500 transition-transform duration-1000 ease-in-out origin-left"
                    style={{ transform: `scaleX(${isCompleted ? 1 : 0})` }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
