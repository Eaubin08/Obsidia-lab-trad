import { Transaction, BankingMetrics, OntologicalTests, BankingDecision } from '../../types';

export function calculateMetrics(transaction: Transaction): BankingMetrics {
  // Simulation of metrics calculation
  return {
    IR: Math.random() * 0.5, // Irreversibility
    CIZ: Math.random() * 0.4, // Conflict Zone
    DTS: Math.random() * 0.3, // Time Sensitivity
    TSG: Math.random() * 0.2, // Total Guard
  };
}

export function makeDecision(
  metrics: BankingMetrics,
  tests: OntologicalTests
): { decision: BankingDecision; confidence: number } {
  const passedTests = Object.values(tests).filter(Boolean).length;
  const precision = (passedTests / 9) * 100;

  if (precision >= 94 && metrics.TSG < 0.3) {
    return { decision: 'AUTHORIZE', confidence: precision };
  }
  if (precision >= 85 || metrics.TSG < 0.6) {
    return { decision: 'ANALYZE', confidence: precision };
  }
  return { decision: 'BLOCK', confidence: precision };
}
