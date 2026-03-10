import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initDecisionStream } from "../decisionStream";
import { streamProofPackage } from "../proofExport";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Python Engine proxy — tente de joindre le serveur Obsidia-lab-trad (port 3001)
  // En prod, retourne une réponse JSON claire si le serveur Python est indisponible
  app.post("/api/python-engine/decision", async (req, res) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      const upstream = await fetch("http://localhost:3001/decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await upstream.json();
      res.json(data);
    } catch {
      // Serveur Python indisponible — retourner une réponse JSON structurée
      res.status(503).json({
        available: false,
        decision: "UNAVAILABLE",
        reasons: ["Le serveur Obsidia-lab-trad (port 3001) n'est pas démarré dans cet environnement."],
        message: "Moteur Python OS0/OS1/OS2 non disponible en production. Utilisez le moteur TypeScript (OS4).",
      });
    }
  });

  // Proof Package export endpoint
  app.get("/api/proof/export", async (_req, res) => {
    try {
      await streamProofPackage(res);
    } catch (err) {
      console.error("[proof/export] error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Export failed" });
      }
    }
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  // Initialize WebSocket decision stream at /ws/decisions
  initDecisionStream(server);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
