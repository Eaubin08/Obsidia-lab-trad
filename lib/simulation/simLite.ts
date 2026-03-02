// lib/simulation/simLite.ts
import { MarketData } from '../features/volatility';

export interface SimulationResult {
  maxDrawdown: number;
  ruinProbability: number;
  expectedReturn: number;
  paths: number[][];
}

export interface TradeIntent {
  asset: string;
  amount: number;
  action: 'BUY' | 'SELL';
}

export async function runSimulation(
  intent: TradeIntent,
  marketData: MarketData[],
  numPaths = 100
): Promise<SimulationResult> {
  // Simulation Monte Carlo simplifiée pour le hackathon
  const paths: number[][] = [];
  let ruinCount = 0;
  let totalReturn = 0;
  let maxDD = 0;

  for (let i = 0; i < numPaths; i++) {
    const path: number[] = [10000]; // Capital initial
    let currentCapital = 10000;
    
    for (let t = 0; t < 30; t++) { // Simulation sur 30 jours
      const dailyReturn = (Math.random() - 0.48) * 0.05; // Biais légèrement positif
      currentCapital *= (1 + dailyReturn);
      path.push(currentCapital);
      
      if (currentCapital < 5000) ruinCount++; // Seuil de ruine à 50%
    }
    
    paths.push(path);
    totalReturn += (currentCapital - 10000) / 10000;
    
    const peak = Math.max(...path);
    const dd = (peak - currentCapital) / peak;
    if (dd > maxDD) maxDD = dd;
  }

  return {
    maxDrawdown: maxDD,
    ruinProbability: ruinCount / (numPaths * 30),
    expectedReturn: totalReturn / numPaths,
    paths: paths.slice(0, 5) // On ne renvoie que quelques chemins pour l'UI
  };
}
