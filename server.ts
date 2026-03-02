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
let marketData: MarketData[] = [];
try {
  const rawData = fs.readFileSync(marketDataPath, "utf-8");
  marketData = JSON.parse(rawData);
} catch (e) {
  console.error("Failed to load market data:", e);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/features", (req, res) => {
    // OS1: Feature extraction
    const volatility = computeVolatility(marketData);
    const coherence = computeCoherence(marketData);
    const friction = computeFriction(marketData);
    const regime = detectRegime(marketData);

    res.json({
      volatility,
      coherence,
      friction,
      regime
    });
  });

  app.post("/api/simulation", async (req, res) => {
    // OS2: Monte Carlo simulation
    const { asset, amount, action } = req.body;
    const result = await runSimulation(
      { asset: asset || "ETH", amount: amount || 1000, action: action || "BUY" },
      marketData
    );
    res.json(result);
  });

  app.post("/api/gates", async (req, res) => {
    // OS3: Validation gates
    const volatility = computeVolatility(marketData);
    const coherence = computeCoherence(marketData);
    
    // Simulate some state for the gates
    const lastExecutionTime = Date.now() - 60000; // 1 minute ago
    const currentDrawdown = 0.02;

    const results = [
      { name: "Integrity Gate", ...(await integrityGate(coherence)) },
      { name: "Temporal Lock", ...(await x108TemporalLock(lastExecutionTime)) },
      { name: "Risk Killswitch", ...(await riskKillswitch(currentDrawdown, INVARIANTS.MAX_DRAWDOWN)) }
    ];

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
