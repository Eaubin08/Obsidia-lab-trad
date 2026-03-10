import React, { useState, createContext, useContext } from "react";
import { Route, Switch, Link, useLocation, Redirect } from "wouter";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import ErrorBoundary from "@/components/ErrorBoundary";

// ─── Pages principales (5 routes) ────────────────────────────────────────────
import OS4Home    from "@/pages/OS4Home";
import Simuler    from "@/pages/Simuler";
import Decision   from "@/pages/Decision";
import Preuves    from "@/pages/Preuves";
import Controle   from "@/pages/Controle";

// ─── Pages orphelines (gardées mais hors navigation) ─────────────────────────
import TradingWorld      from "@/pages/TradingWorld";
import BankWorld         from "@/pages/BankWorld";
import EcomWorld         from "@/pages/EcomWorld";
import DecisionFlow      from "@/pages/DecisionFlow";
import ProofCenter       from "@/pages/ProofCenter";
import ControlTower      from "@/pages/ControlTower";
import Portfolio         from "@/pages/Portfolio";
import DemoPage          from "@/pages/DemoPage";
import Agents            from "@/pages/Agents";
import Market            from "@/pages/Market";
import Predictions       from "@/pages/Predictions";
import HowItWorks        from "@/pages/HowItWorks";
import SimulationDashboard from "@/pages/SimulationDashboard";
import StressLab         from "@/pages/StressLab";
import AuditMode         from "@/pages/AuditMode";
import MirrorMode        from "@/pages/MirrorMode";
import DecisionReactor   from "@/pages/DecisionReactor";
import ScenarioEngine    from "@/pages/ScenarioEngine";
import GovernanceX108    from "@/pages/GovernanceX108";
import Roadmap           from "@/pages/Roadmap";
import DemoMode          from "@/pages/DemoMode";
import AutomatedTests    from "@/pages/AutomatedTests";
import DecisionLifecycle from "@/pages/DecisionLifecycle";
import SimulationWorlds  from "@/pages/SimulationWorlds";
import WhatIsObsidia     from "@/pages/WhatIsObsidia";
import ProofResearch     from "@/pages/ProofResearch";
import SourceVerification from "@/pages/SourceVerification";
import Evidence          from "@/pages/Evidence";
import UseCases          from "@/pages/UseCases";
import Technology        from "@/pages/Technology";
import Docs              from "@/pages/Docs";
import DecisionStreamPage from "@/pages/DecisionStream";

// ─── Portfolio Context ────────────────────────────────────────────────────────

export interface PortfolioState {
  capital: number;
  pnl24h: number;
  pnl24hPct: number;
  guardBlocks: number;
  capitalSaved: number;
  onTradingUpdate: (d: { pnl?: number; capital?: number }) => void;
  onBankUpdate: (d: { balance?: number }) => void;
  onGuardBlock: () => void;
}

export const PortfolioContext = createContext<PortfolioState>({
  capital: 125000,
  pnl24h: 0,
  pnl24hPct: 0,
  guardBlocks: 0,
  capitalSaved: 0,
  onTradingUpdate: () => {},
  onBankUpdate: () => {},
  onGuardBlock: () => {},
});

export const usePortfolio = () => useContext(PortfolioContext);

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
});

// ─── Navigation 5 items ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { path: "/",        label: "Accueil",  icone: "🏠" },
  { path: "/simuler", label: "Simuler",  icone: "🎮" },
  { path: "/decision",label: "Décision", icone: "⚖️" },
  { path: "/preuves", label: "Preuves",  icone: "🔐" },
  { path: "/controle",label: "Contrôle", icone: "🛡️" },
];

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ portfolio }: { portfolio: PortfolioState }) {
  const [location] = useLocation();
  const [menuMobile, setMenuMobile] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location === "/" : location === path || location.startsWith(path + "/");

  return (
    <header style={{ background: "oklch(0.10 0.01 240)", borderBottom: "1px solid oklch(0.20 0.01 240)" }}>
      {/* Barre principale */}
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid oklch(0.16 0.01 240)" }}>
        {/* Logo */}
        <Link href="/">
          <span className="font-mono font-bold text-sm tracking-widest cursor-pointer" style={{ color: "oklch(0.72 0.18 145)" }}>
            OBSIDIA
          </span>
        </Link>

        {/* Pipeline indicateur — desktop */}
        <div className="hidden lg:flex items-center gap-1 text-[9px] font-mono">
          {["Marché", "Agent", "Guard X-108", "Verdict", "Preuve"].map((step, i) => (
            <React.Fragment key={step}>
              <span className="px-1.5 py-0.5 rounded" style={{
                background: "oklch(0.14 0.01 240)",
                color: step === "Guard X-108" ? "oklch(0.72 0.18 145)" : step === "Verdict" ? "#a78bfa" : "oklch(0.50 0.01 240)",
                border: step === "Guard X-108" ? "1px solid oklch(0.72 0.18 145 / 0.4)" : "none",
              }}>{step}</span>
              {i < 4 && <span style={{ color: "oklch(0.30 0.01 240)" }}>→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="hidden md:flex items-center gap-1.5">
            <span style={{ color: "oklch(0.45 0.01 240)" }}>Capital</span>
            <span className="font-bold text-foreground">{portfolio.capital.toLocaleString("fr-FR")} €</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span style={{ color: "oklch(0.45 0.01 240)" }}>Protégé</span>
            <span className="font-bold" style={{ color: "oklch(0.72 0.18 145)" }}>+{portfolio.capitalSaved.toLocaleString("fr-FR")} €</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: "oklch(0.14 0.04 145)", border: "1px solid oklch(0.72 0.18 145 / 0.3)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.72 0.18 145)" }} />
            <span style={{ color: "oklch(0.72 0.18 145)" }}>LIVE</span>
          </div>
          <Link href="/demo">
            <button className="px-3 py-1 rounded font-mono text-[9px] font-bold" style={{ background: "oklch(0.72 0.18 145 / 0.15)", border: "1px solid oklch(0.72 0.18 145 / 0.5)", color: "oklch(0.72 0.18 145)" }}>
              ▶ Démo
            </button>
          </Link>
          {/* Bouton menu mobile */}
          <button
            className="md:hidden px-2 py-1 font-mono text-[10px]"
            style={{ color: "oklch(0.55 0.01 240)" }}
            onClick={() => setMenuMobile(v => !v)}
          >
            {menuMobile ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Navigation principale — 5 items */}
      <nav className={`flex items-center px-4 gap-1 ${menuMobile ? "flex-col items-start py-2" : "hidden md:flex"}`}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setMenuMobile(false)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-mono font-bold whitespace-nowrap transition-colors border-b-2"
            style={{
              color: isActive(item.path) ? "oklch(0.72 0.18 145)" : "oklch(0.55 0.01 240)",
              borderBottomColor: isActive(item.path) ? "oklch(0.72 0.18 145)" : "transparent",
              background: isActive(item.path) ? "oklch(0.13 0.02 145 / 0.3)" : "transparent",
              letterSpacing: "0.06em",
            }}
          >
            <span>{item.icone}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function AppContent() {
  const [portfolio, setPortfolio] = useState<Omit<PortfolioState, "onTradingUpdate" | "onBankUpdate" | "onGuardBlock">>({
    capital: 125000,
    pnl24h: 1245,
    pnl24hPct: 1.0,
    guardBlocks: 0,
    capitalSaved: 0,
  });

  const portfolioCtx: PortfolioState = {
    ...portfolio,
    onTradingUpdate: (d) => setPortfolio((p) => ({ ...p, capital: d.capital ?? p.capital, pnl24h: d.pnl ?? p.pnl24h })),
    onBankUpdate: (d) => setPortfolio((p) => ({ ...p, capital: d.balance ?? p.capital })),
    onGuardBlock: () => setPortfolio((p) => ({ ...p, guardBlocks: p.guardBlocks + 1, capitalSaved: p.capitalSaved + 15000 })),
  };

  return (
    <PortfolioContext.Provider value={portfolioCtx}>
      <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.09 0.01 240)", color: "oklch(0.90 0.01 240)" }}>
        <Header portfolio={portfolioCtx} />
        <main className="flex-1 overflow-auto">
          <Switch>
            {/* ─── 5 routes principales ─────────────────────────────────── */}
            <Route path="/"><ErrorBoundary><OS4Home /></ErrorBoundary></Route>
            <Route path="/simuler"><ErrorBoundary><Simuler /></ErrorBoundary></Route>
            <Route path="/decision"><ErrorBoundary><Decision /></ErrorBoundary></Route>
            <Route path="/preuves"><ErrorBoundary><Preuves /></ErrorBoundary></Route>
            <Route path="/controle"><ErrorBoundary><Controle /></ErrorBoundary></Route>

            {/* ─── Démo ─────────────────────────────────────────────────── */}
            <Route path="/demo"     component={DemoPage} />

            {/* ─── Redirections vers les nouvelles routes ───────────────── */}
            <Route path="/market">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/market/trading">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/market/banking">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/market/ecommerce">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/use-cases">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/use-cases/trading">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/use-cases/banking">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/use-cases/ecommerce">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/simulation-worlds">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/trading">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/bank">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/ecom">
              <Redirect to="/simuler" />
            </Route>
            <Route path="/decision-flow">
              <Redirect to="/decision" />
            </Route>
            <Route path="/decisions">
              <Redirect to="/decision" />
            </Route>
            <Route path="/stream">
              <Redirect to="/decision" />
            </Route>
            <Route path="/proof-center">
              <Redirect to="/preuves" />
            </Route>
            <Route path="/proof">
              <Redirect to="/preuves" />
            </Route>
            <Route path="/formal-proof">
              <Redirect to="/preuves" />
            </Route>
            <Route path="/evidence">
              <Redirect to="/preuves" />
            </Route>
            <Route path="/source">
              <Redirect to="/preuves" />
            </Route>
            <Route path="/control">
              <Redirect to="/controle" />
            </Route>
            <Route path="/portfolio">
              <Redirect to="/controle" />
            </Route>
            <Route path="/agents">
              <Redirect to="/controle" />
            </Route>
            <Route path="/predictions">
              <Redirect to="/controle" />
            </Route>

            {/* ─── Pages orphelines (hors nav, accessibles directement) ─── */}
            <Route path="/engine"            component={SimulationDashboard} />
            <Route path="/stress"            component={StressLab} />
            <Route path="/audit"             component={AuditMode} />
            <Route path="/mirror"            component={MirrorMode} />
            <Route path="/reactor"           component={DecisionReactor} />
            <Route path="/scenario-engine"   component={ScenarioEngine} />
            <Route path="/governance"        component={GovernanceX108} />
            <Route path="/demo-mode"         component={DemoMode} />
            <Route path="/roadmap"           component={Roadmap} />
            <Route path="/decision-lifecycle" component={DecisionLifecycle} />
            <Route path="/automated-tests"   component={AutomatedTests} />
            <Route path="/how-it-works"      component={HowItWorks} />
            <Route path="/technology"        component={Technology} />
            <Route path="/docs"              component={Docs} />
            <Route path="/what-is-obsidia"   component={WhatIsObsidia} />

            {/* ─── 404 ──────────────────────────────────────────────────── */}
            <Route>
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="text-2xl font-mono" style={{ color: "oklch(0.45 0.01 240)" }}>404</div>
                <p className="text-sm font-mono" style={{ color: "oklch(0.40 0.01 240)" }}>Page introuvable</p>
                <Link href="/">
                  <span className="text-sm font-mono" style={{ color: "oklch(0.72 0.18 145)" }}>← Retour à l'accueil</span>
                </Link>
              </div>
            </Route>
          </Switch>
        </main>

        {/* Footer */}
        <footer style={{ background: "oklch(0.085 0.01 240)", borderTop: "1px solid oklch(0.16 0.01 240)" }}>
          <div className="flex flex-wrap items-center justify-between px-6 py-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: "oklch(0.72 0.18 145)" }}>OBSIDIA</span>
              <span className="font-mono text-[9px]" style={{ color: "oklch(0.40 0.01 240)" }}>OS4 — Gouvernance pour agents autonomes</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-[9px]" style={{ color: "oklch(0.40 0.01 240)" }}>Code source :</span>
              {[
                { label: "Repository",     url: "https://github.com/Eaubin08/Obsidia-lab-trad" },
                { label: "Preuves Lean 4", url: "https://github.com/Eaubin08/Obsidia-lab-trad/tree/main/lean" },
                { label: "Documentation",  url: "https://github.com/Eaubin08/Obsidia-lab-trad/tree/main/docs" },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[9px] transition-colors"
                  style={{ color: "oklch(0.50 0.01 240)" }}
                  onMouseOver={e => (e.currentTarget.style.color = "oklch(0.72 0.18 145)")}
                  onMouseOut={e => (e.currentTarget.style.color = "oklch(0.50 0.01 240)")}>
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </PortfolioContext.Provider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <ViewModeProvider>
          <AppContent />
        </ViewModeProvider>
      </trpc.Provider>
    </QueryClientProvider>
  );
}
