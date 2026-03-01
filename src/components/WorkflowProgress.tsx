import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkflowProgressProps {
  activeTab: string;
}

export function WorkflowProgress({ activeTab }: WorkflowProgressProps) {
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
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  isCompleted ? "bg-emerald-500 border-emerald-500 text-black" :
                  isActive ? "bg-black border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" :
                  "bg-black border-zinc-800 text-zinc-600"
                )}>
                  {isCompleted ? <Check className="w-5 h-5 font-bold" /> : <span className="text-xs font-bold">{index + 1}</span>}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                  isActive ? "text-emerald-400" : "text-zinc-600"
                )}>
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-zinc-800 mx-4 -mt-8 relative overflow-hidden">
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
