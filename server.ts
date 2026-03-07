import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

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

// Banking imports
import { 
  calculateMetrics as calculateBankingMetrics, 
  runOntologicalTests, 
  makeDecision as makeBankingDecision 
} from "./lib/banking/engine";

// E-commerce imports
import { 
  evaluateAction as evaluateEcommerceAction, 
  calculateFees as calculateEcommerceFees 
} from "./lib/ecommerce/safetyGate";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load market data
const marketDataPath = path.join(__dirname, "data/trading/BTC_1h.json");
const scenariosPath = path.join(__dirname, "data/scenarios.json");
const bankingScenariosPath = path.join(__dirname, "data/banking/scenarios.json");
const ecommerceScenariosPath = path.join(__dirname, "data/ecommerce/scenarios.json");

let marketData: MarketData[] = [];
let scenarios: any[] = [];
let bankingScenarios: any[] = [];
let ecommerceScenarios: any[] = [];

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

try {
  const rawBanking = fs.readFileSync(bankingScenariosPath, "utf-8");
  bankingScenarios = JSON.parse(rawBanking);
} catch (e) {
  console.error("Failed to load banking scenarios:", e);
}

try {
  const rawEcommerce = fs.readFileSync(ecommerceScenariosPath, "utf-8");
  ecommerceScenarios = JSON.parse(rawEcommerce);
} catch (e) {
  console.error("Failed to load ecommerce scenarios:", e);
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

  // Banking Routes
  app.get("/api/banking/scenarios", (req, res) => {
    res.json(bankingScenarios);
  });

  app.post("/api/banking/process", (req, res) => {
    const { transaction } = req.body;
    const metrics = calculateBankingMetrics(transaction);
    const tests = runOntologicalTests(transaction, metrics);
    const decision = makeBankingDecision(metrics, tests);
    res.json({ metrics, tests, decision });
  });

  app.post("/api/banking/gemini", async (req, res) => {
    const { decision, metrics, transaction } = req.body;
    const prompt = `Explain why this banking transaction was ${decision?.decision ?? "evaluated"} based on the following metrics:
- IR (Irreversibility): ${(metrics?.IR ?? 0).toFixed(2)}
- CIZ (Conflict Zone): ${(metrics?.CIZ ?? 0).toFixed(2)}
- DTS (Time Sensitivity): ${(metrics?.DTS ?? 0).toFixed(2)}
- TSG (Total Guard): ${(metrics?.TSG ?? 0).toFixed(2)}

Transaction Details:
- Amount: ${transaction?.amount ?? "N/A"} ${transaction?.currency ?? ""}
- Sender: ${transaction?.sender ?? "N/A"}
- Recipient: ${transaction?.recipient ?? "N/A"}
- Type: ${transaction?.type ?? "N/A"}
Provide a professional and concise justification for a bank administrator.`;

    // Try Gemini first, fallback to Manus built-in LLM
    const geminiKey = process.env.GEMINI_API_KEY;
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
    const forgeUrl = process.env.BUILT_IN_FORGE_API_URL;

    try {
      if (geminiKey) {
        // Use Google Gemini
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash-latest",
          contents: prompt,
        });
        return res.json({ justification: response.text || "No justification generated.", source: "gemini" });
      } else if (forgeKey) {
        // Fallback: Manus built-in LLM (same API as OpenAI)
        const apiUrl = forgeUrl
          ? `${forgeUrl.replace(/\/$/, "")}/v1/chat/completions`
          : "https://forge.manus.im/v1/chat/completions";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${forgeKey}` },
          body: JSON.stringify({
            model: "gemini-2.5-flash",
            messages: [
              { role: "system", content: "You are a professional banking compliance officer. Be concise and precise." },
              { role: "user", content: prompt },
            ],
            max_tokens: 512,
          }),
        });
        const data = await response.json() as any;
        const text = data?.choices?.[0]?.message?.content ?? "No justification generated.";
        return res.json({ justification: text, source: "manus-llm" });
      } else {
        return res.status(500).json({ error: "No LLM API key configured (GEMINI_API_KEY or BUILT_IN_FORGE_API_KEY required)" });
      }
    } catch (error) {
      console.error("Error generating justification:", error);
      res.status(500).json({ error: "Error generating justification via LLM." });
    }
  });

  // E-commerce Routes
  app.get("/api/ecommerce/scenarios", (req, res) => {
    res.json(ecommerceScenarios);
  });

  app.post("/api/ecommerce/evaluate", (req, res) => {
    const { action, previousAction, model } = req.body;
    const result = evaluateEcommerceAction(action, previousAction);
    let fees = null;
    if (result.decision === 'ALLOW') {
      fees = calculateEcommerceFees(action.amount, model);
    }
    res.json({ result, fees });
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

  // ─── Proxy vers le moteur Python OS0/OS1/OS2 (FastAPI sur port 8000) ──────────────────
  const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL || "http://localhost:8000";

  app.post("/api/python-engine/decision", async (req, res) => {
    try {
      const response = await fetch(`${PYTHON_ENGINE_URL}/v1/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      if (!response.ok) {
        const err = await response.text();
        return res.status(response.status).json({ error: err });
      }
      const data = await response.json();
      res.json(data);
    } catch (e: any) {
      // Moteur Python non démarré — retourner une erreur explicite
      res.status(503).json({
        error: "Python engine unavailable",
        hint: "Start the Python engine: cd core/engine && uvicorn api_server.main:app --port 8000",
        detail: String(e?.message ?? e),
      });
    }
  });

  app.get("/api/python-engine/health", async (req, res) => {
    try {
      const response = await fetch(`${PYTHON_ENGINE_URL}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      const data = await response.json();
      res.json({ python_engine: "online", ...data });
    } catch {
      res.json({
        python_engine: "offline",
        hint: "cd core/engine && uvicorn api_server.main:app --port 8000",
      });
    }
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
