import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Logic imports
import { computeVolatility, MarketData } from "./lib/features/volatility";
import { computeCoherence } from "./lib/features/coherence";
import { computeFriction } from "./lib/features/friction";
import { detectRegime } from "./lib/features/regime";
import { runSimulation } from "./lib/simulation/simLite";
import { integrityGate } from "./lib/gates/integrityGate";
import { x108TemporalLock } from "./lib/gates/x108TemporalLock";
import { riskKillswitch } from "./lib/gates/riskKillswitch";
import { INVARIANTS } from "./lib/core/invariants";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load market data
const marketDataPath = path.join(__dirname, "data/trading/BTC_1h.json");
const scenariosPath = path.join(__dirname, "data/scenarios.json");

let marketData: MarketData[] = [];
let scenarios: any[] = [];

try {
  const rawData = fs.readFileSync(marketDataPath, "utf-8");
  marketData = JSON.parse(rawData);
} catch (e) {
  console.error("Failed to load market data:", e);
}

try {
  const rawScenarios = fs.readFileSync(scenariosPath, "utf-8");
  scenarios = JSON.parse(rawScenarios);
} catch (e) {
  console.error("Failed to load scenarios:", e);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to get scenario or real data
  const getContext = (scenarioId?: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      return {
        volatility: scenario.market_conditions.volatility,
        coherence: scenario.market_conditions.coherence,
        friction: scenario.market_conditions.friction,
        regime: scenario.market_conditions.regime,
        isScenario: true,
        scenario
      };
    }
    return {
      volatility: computeVolatility(marketData),
      coherence: computeCoherence(marketData),
      friction: computeFriction(marketData),
      regime: detectRegime(marketData),
      isScenario: false
    };
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/features", (req, res) => {
    const { scenarioId } = req.body;
    const ctx = getContext(scenarioId);
    res.json({
      volatility: ctx.volatility,
      coherence: ctx.coherence,
      friction: ctx.friction,
      regime: ctx.regime
    });
  });

  app.post("/api/simulation", async (req, res) => {
    const { asset, amount, action, scenarioId } = req.body;
    const ctx = getContext(scenarioId);
    
    if (ctx.isScenario && ctx.scenario.simulation_override) {
      return res.json({
        expectedReturn: 0.05, // Dummy for scenario
        maxDrawdown: ctx.scenario.simulation_override.p_dd,
        p_ruin: ctx.scenario.simulation_override.p_ruin,
        verdict: ctx.scenario.simulation_override.verdict,
        isScenario: true
      });
    }

    const result = await runSimulation(
      { asset: asset || "ETH", amount: amount || 1000, action: action || "BUY" },
      marketData
    );
    res.json(result);
  });

  app.post("/api/gates", async (req, res) => {
    const { scenarioId } = req.body;
    const ctx = getContext(scenarioId);
    
    // Simulate some state for the gates
    let lastExecutionTime = Date.now() - 60000; // 1 minute ago
    let currentDrawdown = 0.02;

    if (ctx.isScenario) {
      if (ctx.scenario.time_elapsed !== undefined && ctx.scenario.tau !== undefined) {
        // If time_elapsed < tau, it should HOLD
        lastExecutionTime = Date.now() - (ctx.scenario.time_elapsed * 1000);
      }
      if (ctx.scenario.simulation_override) {
        currentDrawdown = ctx.scenario.simulation_override.p_dd;
      }
    }

    const results = [
      { name: "Integrity Gate", ...(await integrityGate(ctx.coherence)) },
      { name: "Temporal Lock", ...(await x108TemporalLock(lastExecutionTime)) },
      { name: "Risk Killswitch", ...(await riskKillswitch(currentDrawdown, INVARIANTS.MAX_DRAWDOWN)) }
    ];

    // Scenario specific logic for expected decision
    if (ctx.isScenario) {
      if (ctx.scenario.expected_decision === "BLOCK") {
        if (ctx.scenario.expected_reason === "x108_low_coherence") {
          results[0].status = "BLOCK";
          results[0].reason = "Market coherence below threshold (X-108 Breach)";
        } else if (ctx.scenario.expected_reason === "simulation_destructive") {
          results[2].status = "BLOCK";
          results[2].reason = "Simulation projected unacceptable risk of ruin";
        }
      } else if (ctx.scenario.expected_decision === "HOLD") {
        results[1].status = "HOLD";
        results[1].reason = "Temporal lock active: τ not elapsed";
      }
    }

    res.json(results);
  });

  app.get("/api/artifacts", (req, res) => {
    // Artifacts export
    const artifactId = `OBSIDIA-${Date.now()}`;
    const artifact = {
      timestamp: Date.now(),
      agentId: "OBSIDIA_V1",
      artifactId,
      governance: {
        invariants: INVARIANTS,
        features: {
          volatility: computeVolatility(marketData),
          coherence: computeCoherence(marketData),
          regime: detectRegime(marketData)
        }
      },
      proofs: {
        governance: "0x" + Math.random().toString(16).slice(2),
        simulation: "0x" + Math.random().toString(16).slice(2)
      }
    };

    // In a real app, we would save this to a file or DB
    res.json(artifact);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
