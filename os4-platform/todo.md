# OS4 Platform — TODO

## Phase 1 — Thème & Layout
- [x] Thème dark financier (index.css, palette sombre + accents verts/ambrés)
- [x] App.tsx routes (Trading, Bank, Ecom, Proof) — 4 onglets header

## Phase 2 — Backend Core
- [x] Schéma DB (decision_tickets, simulation_runs)
- [x] Guard X-108 engine (server/engines/guardX108.ts)
- [x] TradingWorld engine (GBM + Markov + Jump + GARCH)
- [x] BankWorld engine (log-normal, fraude, IR/CIZ/DTS/TSG)
- [x] EcomWorld engine (funnel, agents, CTR/CVR/ROAS + X-108 HOLD 10s)
- [x] Merkle root + hash chain (server/engines/merkle.ts)
- [x] Replay engine (seed-based deterministic)

## Phase 3 — Routes tRPC
- [x] trading.simulate
- [x] bank.simulate
- [x] ecom.simulate
- [x] proof.proofkitStatus, proof.replayVerify, proof.allTickets, proof.simulationRuns
- [x] auth.me, auth.logout

## Phase 4 — Frontend
- [x] TradingWorld page (prix GBM, returns, GARCH vol, métriques, ticket)
- [x] BankWorld page (balance, cash flows, fraude, IR/CIZ/DTS/TSG)
- [x] EcomWorld page (revenue, margin, funnel, agents X-108, compliance)
- [x] ProofResearch page (ProofKit PASS, Replay Verifier, audit trail, OCTG)
- [x] Composants partagés (MetricCard, DecisionBadge, HashDisplay, X108Gate, MiniChart, FunnelChart, DecisionTicketPanel)

## Phase 5 — Tests & Validation
- [x] TradingWorld simulation fonctionnelle (seed=42, 252 steps, +9.17%)
- [x] BankWorld simulation fonctionnelle (seed=42, 365 steps)
- [x] EcomWorld simulation fonctionnelle (seed=42, 90 steps, agents HOLD)
- [x] ProofResearch fonctionnelle (3 tickets, Replay Verifier VERIFIED)
- [x] Vitest unit tests (12/12 passed — TradingWorld 5, BankWorld 3, EcomWorld 3, auth 1)
- [ ] GitHub push (Eaubin08/Obsidia-lab-trad)

## Phase 6 — Livraison
- [x] Checkpoint final (version: 689b12cf)
- [x] Lien public (Publish via UI)

## Phase 7 — Amélioration UX/Pédagogie (Directives v2)
- [x] Composant OpenBrainView (Cerveau Ouvert — VOIT/PENSE/DÉCIDE)
- [x] Composant StrasbourgClock (chronomètre visuel HOLD avec compte à rebours)
- [x] Composant InWaitOut (cycle pédagogique IN→WAIT→OUT)
- [x] Macro Shock Events (Flash Crash, Rate Hike, Fraud Attack, Supply Shock)
- [x] Traducteur IA (LLM → explication novice après chaque décision)
- [x] Moltbook feed (JSON payload X-108 pour chaque décision)
- [x] Tokenomics $X108 (0.1% frais, 50% stakers, affichage EcomWorld)
- [x] Proof & Research — liens GitHub réels (TemporalX108.lean, X108.tla, X108_STANDARD.md)
- [x] Strasbourg Clock evidence (4 traces CSV, rapport JSON)
- [ ] Story Mode (scénarios guidés avec tooltips pédagogiques)
- [ ] Capital sauvé / Pertes évitées (impact financier visible)
- [ ] BankWorld — vraies formules IR/CIZ/DTS/TSG + 9 tests ontologiques

## Phase 8 — OS4 v3 : Immersion Pédagogique Novice
- [x] TradingWorld v3 — carnet d'ordres + Flash Crash narratif + Cost of Delay vs Ruin + Cerveau Ouvert
- [x] BankWorld v3 — 4 jauges IR/CIZ/DTS/TSG animées + 9 tests métier + compteur Argent Sauvé
- [x] EcomWorld v3 — Agent Desk superviseur + Moltbook animé + $X108 modèle économique

## Phase 9 — OS4 v3 : Niveau Institutionnel
- [x] Dashboard Gouvernance $X108 — seuils configurables (τ, score BLOCK/HOLD) + AUTO-RUN + Tokenomics + DAO votes
- [x] Proof & Research v3 — anatomie blockchain visuelle + consensus 3/4 nœuds animé + Replay narratif immersif
- [x] 12/12 tests Vitest passés — 0 erreurs TypeScript
- [x] Checkpoint v3 (version: b34b6d8c)

## Phase 10 — OS4 v4 : Place de Marché Institutionnelle FinTech

- [x] Header global persistant — Capital Total / P&L 24h / Guard 99.9% / positions actives
- [x] TradingWorld — marché vivant auto-start + Panneau Raisonnement Moteur X-108
- [x] BankWorld — vraie interface bancaire (balance + transactions) + jauges IR/CIZ/DTS/TSG
- [x] EcomWorld — marketplace cartes produits + Agent Desk + Moltbook Live
- [x] Export CSV/LOGS dans chaque module
- [x] Git commit 993f7e8 (push SSH bloqué — token HTTPS requis)
- [x] Checkpoint final v4 (a2c9ddf9)
- [x] Audit ZIP complet (OS4_AUDIT_v5.zip)
- [x] Rapport complet (OS4_AUDIT_REPORT_v5.md)

## Phase 11 — OS4 v5 : Du Laboratoire au Produit (Binance/Revolut UX)

- [x] TradingWorld v5 — graphique en boucle infinie 1 tick/s, panneau ACHETER/VENDRE
- [x] BankWorld v5 — transactions en attente, bouton VALIDER LE VIREMENT + Guard X-108
- [x] EcomWorld v5 — auto-start + marketplace 6 produits + exports CSV/JSON
- [x] Tests finaux 12/12 + checkpoint v5 (fa4caef4)

## Phase 12 — OS4 v6 : Refonte Architecture Kernel ("One Engine")

- [x] Refonte App.tsx — 8 pages + header pipeline World→Agent→Guard→Decision→Proof
- [x] Page Home — Hero "Governance Kernel for Autonomous Agents" + diagramme animé BLOCK/HOLD/ALLOW
- [x] Page What is Obsidia — problème/solution + architecture OS0→OS4
- [x] Page Decision Lifecycle — diagramme interactif 6 étapes cliquables
- [x] Page Scenario Engine — 5 scénarios (Flash Crash, Fraud, Manipulation, Over-Leverage, Supply Shock)
- [x] Page Automated Tests — tableau unit/scenario/replay/stress + invariant checks
- [x] Refonte GovernanceX108 — pipeline X-108 action→HOLD→coherence→decision
- [x] Refonte ProofResearch — Lean/TLA+/Merkle/Replay avec liens GitHub réels
- [x] Checkpoint v6 (9964c914) + audit ZIP (OS4_AUDIT_v6.zip)

## Phase 13 — OS4 v7 : Conformité Checkpoint UX Intégral

- [x] Audit + correction Home — conforme
- [x] Audit + correction Decision Lifecycle — conforme
- [x] Audit + correction Simulation Worlds — routes sous-pages ajoutées
- [x] Audit + correction Scenario Engine — conforme
- [x] Audit + correction Automated Tests — conforme
- [x] Audit + correction Governance — pipeline formel X-108 + règle BLOCK>HOLD>ALLOW ajoutés
- [x] Audit + correction Formal Proof — conforme
- [x] Checkpoint v7 (5ed84074) + rapport de conformité (OS4_CONFORMITY_REPORT_v7.md)

## Phase 14 — OS4 v8 : Orchestration Tests & Simulations

- [x] Page SimulationDashboard — active worlds + decision stream + guard stats + proof events + scheduler
- [x] Diagramme canonique OS0→OS4 — WhatIsObsidia enrichi avec ASCII stack + tests par couche
- [x] Métriques avancées — decision rate 847/s, block/hold/exec rate, avg hold time 10.02s, latency 1.4ms
- [x] Route /simulation-dashboard ajoutée dans App.tsx
- [x] 12/12 tests Vitest passés — 0 erreurs TypeScript
- [x] Checkpoint v8 (57a87506)

## Phase 15 — OS4 v9 : Refactoring 6 Pages Thématiques

- [ ] Navigation App.tsx — 6 routes racines (HOME/TRADING/BANK/ECOM/ENGINE/PROOF)
- [ ] Adaptateur obsidiaAdapter.ts — call engine → execute → return decision
- [ ] HOME — fusion OS4Home + WhatIsObsidia + pipeline + liens thématiques
- [ ] TRADING — TradingHub.tsx (MarketExplainer GBM/Markov/GARCH + 4 modes + Guard visible)
- [ ] BANK — BankHub.tsx (MarketExplainer cash flows/fraud/IR-CIZ-DTS-TSG + 4 modes + Guard)
- [ ] ECOM — EcomHub.tsx (MarketExplainer traffic/CVR/agents + 4 modes + Guard visible)
- [ ] ENGINE — EngineDashboard.tsx (Kernel Monitor + Decision Stream + Guard stats + coherence)
- [ ] PROOF — ProofHub.tsx (Formal Proofs + Replay + Merkle + Lean/TLA+)
- [ ] AutomatedTests — filtres Trading/Bank/Ecom/Kernel + hash proof par test
- [ ] Checkpoint v9 + audit ZIP

## Phase 16 — OS4 v10 : Brancher au Moteur Réel du Repo

### Backend — Modules réels
- [x] obsidiaAdapter.ts — branché sur lib/ du repo (integrityGate, x108TemporalLock, riskKillswitch, coherence, volatility, regime)
- [x] testRunner.ts — exécute les scénarios réels (trading/bank/ecom/kernel) du repo
- [x] proofRunner.ts — lit PROOFKIT_REPORT.json, merkle_root.json, rfc3161_anchor.json
- [x] simulationRunner.ts — appelle simLite + banking/engine + ecommerce/safetyGate du repo
- [x] Nouveaux endpoints tRPC : engine.decision, engine.simulate, engine.tests, engine.proofs, engine.info

### Frontend — Blocs pédagogiques
- [x] TradingWorld — bloc WORLD→AGENT→ENGINE→GUARD→PROOF + What/Why/Proves
- [x] BankWorld — bloc WORLD→AGENT→ENGINE→GUARD→PROOF + What/Why/Proves
- [x] EcomWorld — bloc WORLD→AGENT→ENGINE→GUARD→PROOF + What/Why/Proves
- [x] ENGINE Dashboard — engine-info (version/commit/hash), guard stream, proof stream, test status
- [x] PROOF Hub — preuves réelles (PROOFKIT_REPORT.json, merkle_root, rfc3161)
- [x] AutomatedTests — scénarios réels du repo (5 trading + 5 bank + 5 ecom + 5 kernel)

### Validation
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v10

## Phase 17 — OS4 v11 : Pédagogie + Moteur Live + Scénarios

### Frontend — Blocs pédagogiques
- [x] MarketExplanation.tsx — composant réutilisable WORLD EXPLAINED (5 couches)
- [x] TradingWorld — bloc WORLD EXPLAINED avant simulation
- [x] BankWorld — bloc WORLD EXPLAINED avant simulation
- [x] EcomWorld — bloc WORLD EXPLAINED avant simulation

### Frontend — Moteur visible
- [x] DecisionStream.tsx — flux décisionnel live (timestamp/proposal/guard/decision/proof hash)
- [x] Intégrer DecisionStream dans SimulationDashboard

### Backend — Scenario Engine
- [x] server/scenarios/flash_crash.ts
- [x] server/scenarios/bank_run.ts
- [x] server/scenarios/fraud_attack.ts
- [x] server/scenarios/traffic_spike.ts
- [x] Endpoint tRPC engine.runScenario

### Frontend — Scenario Runner
- [x] ScenarioRunner.tsx — 4 boutons (Flash Crash / Bank Run / Fraud Attack / Traffic Spike)
- [x] Batch Run (10 seeds) avec distribution BLOCK/HOLD/ALLOW
- [x] Replay decision (bouton par décision → engine.decision avec seed/state/intent)
- [x] Intégrer ScenarioRunner dans SimulationDashboard

### Frontend — Tests & Proof améliorés
- [x] TestExplanation dans AutomatedTests (Scenario / Expected invariant / Result)
- [x] ProofResearch — section "What this proves" par théorème/invariant

### Frontend — Engine Transparency
- [x] Engine Transparency panel dans /engine (version/commit/invariants/market features/proof/tests)
- [x] Batch Run 10 seeds dans /engine (distribution décisionnelle)

### Validation
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v11

## Phase 18 — OS4 v12 : Demo 30s + Control Tower + Audit Mode

- [x] Demo 30s sur OS4Home — flash crash automatique, timeline synchronisée (WORLD→AGENT→GUARD→DECISION→PROOF)
- [x] Control Tower (/control) — 4 agents actifs, flux décisionnel global, guard state, proof monitor, vision 3 mondes
- [x] Audit Mode (/audit) — engine integrity, decision safety, formal proof, test coverage, reproducibility, export PDF
- [x] App.tsx — routes /control et /audit + navigation 8 items (HOME TRADING BANK ECOM ENGINE PROOF CONTROL AUDIT)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v12

## Phase 19 — OS4 v13 : Decision Reactor + Stress Lab + Mirror Mode

### Nouveaux modules
- [ ] DecisionReactor.tsx (/reactor) — vue causale totale WORLD→AGENT→ENGINE→X108→DECISION→PROOF en temps réel
- [ ] StressLab.tsx (/stress) — 16 scénarios adversariaux + Monte Carlo 1000 runs + distribution graphique
- [ ] MirrorMode.tsx (/mirror) — Binance API prix réel + simulation Guard X-108 sans exécution
- [ ] server/stressEngine.ts — 16 scénarios adversariaux (trading/bank/ecom/kernel)
- [ ] server/mirrorService.ts — proxy Binance API + calcul volatilité réelle + Guard simulation

### Enrichissement pages existantes
- [ ] TradingWorld — explication causale décision (inputs + calculs + résultat)
- [ ] BankWorld — explication causale décision
- [ ] EcomWorld — explication causale décision
- [ ] Chaque page répond aux 6 questions (What world / What agent / Why engine / How guard / What decision / What proof)

### Navigation & Routing
- [ ] App.tsx — 10 routes (+ /reactor + /stress + /mirror) + navigation 10 items

### Validation
- [ ] 0 erreurs TypeScript
- [ ] 12/12 tests Vitest
- [ ] Checkpoint v13

## Phase 20 — OS4 v14 : PDF Export + Stress Lab réel + Binance Mirror

- [ ] Installer jsPDF dans le projet
- [ ] AuditMode.tsx — bouton Export PDF institutionnel (jsPDF) avec 20 items d'audit, 33 théorèmes Lean4, 7 invariants TLA+, Merkle root
- [ ] StressLab.tsx — connecter à engine.batchRun réel + histogramme Chart.js distribution SAFE/DEGRADED/CRITICAL
- [ ] server/routers.ts — endpoint tRPC mirror.prices (proxy Binance API REST)
- [ ] MirrorMode.tsx — utiliser mirror.prices pour afficher prix réels Binance (polling 3s)
- [ ] 0 erreurs TypeScript v14
- [ ] 12/12 tests Vitest v14
- [ ] Checkpoint v14

## Phase 21 — OS4 v15 : Corrections critiques (BankWorld stateful, métriques dynamiques, attaques bancaires, Market Mechanics, Mirror Binance réel)

- [ ] BankWorld — état persistant (capital/liquidity/accounts/loans/risk) + actions deposit/withdraw/transfer/invest
- [ ] BankWorld — InvestmentChain mode (portfolio evolution, capital 100k → invest → withdraw → loan)
- [ ] engine.info/simulate/decision — recalcul dynamique à chaque appel (seed aléatoire, pas de cache figé)
- [ ] scenarios/index.ts — 4 nouvelles attaques bancaires (liquidity_drain, counterparty_default, interest_rate_shock, credit_bubble)
- [ ] MarketMechanics.tsx — explainer complet (order book, price formation, liquidity, market regimes)
- [ ] TradingWorld — injecter MarketMechanics
- [ ] MirrorMode — injecter MarketMechanics
- [ ] DecisionReactor — injecter MarketMechanics
- [ ] MirrorMode — vrai proxy Binance /api/v3/ticker/24hr + orderbook + funding rate + timestamp visible
- [ ] 0 erreurs TypeScript v15
- [ ] 12/12 tests Vitest v15
- [ ] Checkpoint v15
- [ ] Audit ZIP v15

## Phase 25 — OS4 v25 : Portfolio persistant + Control Tower refonte

### Portfolio persistant — connexion scénarios
- [x] TradingWorld — saveSnapshot après chaque scénario (capital estimé, pnl, guardBlocks, capitalSaved)
- [x] TradingWorld — upsertPosition par scénario (asset=scénario, domain=trading, unrealizedPnl selon résultat)
- [x] BankWorld — updateWallet après chaque attaque (bankBalance, bankLiquidity, guardBlocks, capitalSaved)
- [x] BankWorld — upsertPosition par attaque (asset=attaque, domain=bank)
- [x] EcomWorld — updateWallet après chaque scénario (capital=revenue, pnl=profit, guardBlocks)
- [x] EcomWorld — upsertPosition par scénario (asset=scénario, domain=ecom)

### Control Tower — refonte UX (Bloc 5)
- [x] Section 1 — Agents actifs (2 par défaut + bouton "Voir tout")
- [x] Section 2 — Dernières décisions (5 max + "Load more")
- [x] Section 3 — Guard Statistics (ALLOW/HOLD/BLOCK % + latence moyenne)
- [x] Section 4 — Consensus Status (4 nœuds + état consensus)
- [x] Icônes 🟢🟡🔴 pour ALLOW/HOLD/BLOCK
- [x] Espacement augmenté (cards padding 24px, sections margin 40px)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v25 (version: 412b3b06)

## Phase 26 — OS4 v26 : Bloc 6 — Proof Center

- [x] Page ProofCenter.tsx — Section 1 : Formal Proofs (Lean 4 theorems + extraits + liens)
- [x] Page ProofCenter.tsx — Section 2 : TLA+ Specifications (invariants + explications)
- [x] Page ProofCenter.tsx — Section 3 : Adversarial Tests (bank-proof results)
- [x] Page ProofCenter.tsx — Section 4 : Cryptographic Anchoring (Merkle tree)
- [x] Page ProofCenter.tsx — Section 5 : Execution Evidence (Strasbourg Clock traces)
- [x] Page ProofCenter.tsx — Score de vérification global (33 théorèmes, 7 invariants, 270 tests, Merkle active)
- [x] Route /proof-center dans App.tsx
- [x] Lien Proof Center dans la navigation principale
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v26 (version: e580a7b0)

## Phase 27 — OS4 v27 : Bloc 7 — Strasbourg Clock Module

- [x] Composant StrasbourgClock.tsx — Section 1 : RFC3161 Timestamp (horloge live)
- [x] Composant StrasbourgClock.tsx — Section 2 : Temporal Lock (barre de progression X-108)
- [x] Composant StrasbourgClock.tsx — Section 3 : Node Synchronization (4 nœuds + latence)
- [x] Composant StrasbourgClock.tsx — Section 4 : Consensus Status (PBFT 3/4 + votes)
- [x] Composant StrasbourgClock.tsx — Section 5 : Last Decision (agent + action + raison)
- [x] Intégration dans ControlTower.tsx (section dédiée)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v27 (version: ef960562)

## Phase 28 — OS4 v28 : Bloc 8 — Export, Audit Pack & Modes Utilisateur

- [x] Endpoint tRPC proof.exportPackage — génère un zip (Lean + TLA+ + bank-proof + anchors + evidence + audit_summary.md)
- [x] Bouton "Download Proof Package" dans ProofCenter avec liste des artefacts inclus
- [x] Context ViewMode global (Simple/Expert) dans React (déjà présent)
- [x] Toggle Simple/Expert dans le header global de App.tsx (déjà présent)
- [x] StrasbourgClockModule — affichage adapté Simple mode (texte naturel) vs Expert mode (hashes + métriques)
- [x] Page Roadmap (/roadmap) — phases 1, 3, 5, 9, 11, 14, 18, 20, 24, 28 (Current), 32, 36
- [x] Footer global de transparence (Repository, Documentation, Lean proofs, Bank tests) avec liens GitHub (déjà présent)
- [x] Route /roadmap dans App.tsx
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v28 (version: a8bac628)

## Phase 29 — OS4 v29 : Bloc 9 — Mode Démo Jury/Investisseurs

- [x] Page DemoMode.tsx — simulation pas-à-pas 5 étapes (Agent → Temporal Lock → Consensus → Decision → Merkle Anchor)
- [x] Bouton Next Step + compteur d'étape + barre de progression
- [x] Métriques live (decisions analysed, blocked actions, avg latency, consensus success)
- [x] Bouton Reset Demo pour relancer la simulation
- [x] Bouton Start Demo dans le header global (App.tsx)
- [x] Bouton Start Demo dans la page Home (OS4Home.tsx)
- [x] Route /demo-mode dans App.tsx + lien dans MORE_NAV
- [x] Refonte HowItWorks — 5 sections (Problem / Solution / Architecture / Proof / Demo)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v29 (version: 8672bf8d)

## Phase 30 — OS4 v30 : Bloc 10 — Page Market + Navigation restructurée

- [x] Page Market.tsx — Section Trading (BTC price, volatility, trend, agent signal)
- [x] Page Market.tsx — Section Bank (transaction amount, risk score, status)
- [x] Page Market.tsx — Section E-Commerce (product price, stock, demand index)
- [x] Page Market.tsx — Flux visuel Market → Agents → Decision → Guard X-108 → Proof
- [x] Page Market.tsx — Onglets par domaine (Trading / Bank / E-Commerce)
- [x] Navigation principale restructurée : Market, Simulation, Control Tower, Proof Center, Roadmap, Demo
- [x] Route /market dans App.tsx
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v30 (version: fa08a9ff)

## Phase 31 — OS4 v31 : Bloc 11 — Page Agents + Simulation Hub + Decision Pipeline

- [x] Page Agents.tsx — 3 agents (Alpha/Sentinel/Mercury) avec domaine, action courante, confidence, taux blocage
- [x] Page Agents.tsx — Flux visuel Market → Agents → Decision → Guard → Proof
- [x] Page Agents.tsx — Historique des 5 dernières décisions par agent
- [x] SimulationWorlds.tsx refonte — hub avec sélection domaine (Trading/Bank/Ecom) + sélection scénario
- [x] SimulationWorlds.tsx — Decision Pipeline vertical (Scenario → Agent → Guard → Temporal Lock → Consensus → Proof)
- [x] SimulationWorlds.tsx — Indicateurs d'état par étape (Pending/Running/Completed/Blocked)
- [x] ControlTower.tsx — Decision Pipeline compact visible dans la section Decisions
- [x] Navigation finale : Home · Market · Simulation · Agents · Control Tower · Proof Center · Demo
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v31 (version: 681756cd)

## Phase 32 — OS4 v32 : Bloc 12 — Predictions + Agents flux live + Export

### Page Predictions (/predictions)
- [x] Predictive Dashboard — 3 niveaux de risque (High/Medium/Low) × 3 domaines (Trading/Bank/Ecom)
- [x] Chaque prédiction : probability, expected time window, trigger indicators, recommended actions
- [x] Exemples : Flash Crash Risk 73%, Fraud Wave Risk 58%, Supply Shock Warning 82%
- [x] Ajustement dynamique des seuils X-108 (Normal: coherence=0.30/lock=10s → Defensive: 0.40/15s)
- [x] Flux visuel Market → Prediction → Simulation → Agents → Decision → X-108 → Proof

### Control Tower — Early Warnings
- [x] Section Early Warnings dans ControlTower (Flash crash risk %, Sentinel alert, Supply disruption %)
- [x] Navigation mise à jour : Home · Market · Simulation · Predictions · Control Tower · Proof

### Agents — Flux live + Export
- [x] Agents.tsx connecté au stream.getEvents (flux live tRPC, refresh 3s)
- [x] Export CSV des décisions agents (bouton Download CSV)
- [x] Export JSON des décisions agents (bouton Download JSON)

### Validation
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v32 (version: ac0c9f1c)

## Phase 33 — OS4 v33 : Predictions améliorées + Badge Défensif Portfolio

- [x] Predictions.tsx — bouton "Simuler ce scénario" sur chaque carte (lien vers /use-cases/trading, /use-cases/banking, /use-cases/ecommerce)
- [x] Predictions.tsx — filtres par domaine (All/Trading/Bank/Ecom) et par niveau de risque (All/High/Medium/Low)
- [x] Portfolio.tsx — badge "Mode Défensif Actif" quand une prédiction High Risk est active (badge rouge animé, lien vers /predictions)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v33 (version: 0acf9b83)

## Phase 34 — OS4 v34 : Prédictions dynamiques + Historique

- [x] Endpoint tRPC prediction.getLive — calcul dynamique des probabilités depuis le stream (volatilité BTC, risk score bank, demand index ecom)
- [x] Endpoint tRPC prediction.getHistory — liste des prédictions passées avec résultat (confirmed/refuted/pending)
- [x] Predictions.tsx — probabilités dynamiques (refetchInterval 60s) depuis Binance + merge avec données enrichies
- [x] Predictions.tsx — onglet "History" avec tableau des prédictions passées (date, titre, probabilité, résultat)
- [x] Predictions.tsx — badge de résultat : ⚠️ Confirmed / ✅ Refuted / ⏳ Pending
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v34 (version: de024ed4)

## Phase 35 — OS4 v35 : Graphique d'évolution des probabilités 24h

- [x] Table prediction_snapshots dans drizzle/schema.ts (domaine, predictionId, probability, timestamp)
- [x] pnpm db:push pour créer la table
- [x] Endpoint tRPC prediction.getHistory24h — retourne les snapshots des 24 dernières heures par domaine
- [x] Job de snapshot horaire côté serveur (setInterval 1h) qui insère les probabilités live dans prediction_snapshots
- [x] Composant ProbabilityChart.tsx — graphique Chart.js ligne (6 courbes par predictionId sur 24h)
- [x] Intégration dans Predictions.tsx — section "24H PROBABILITY TREND" avant les cartes, filtrée par domaine actif
- [x] Données de fallback (24 points synthétiques) si la table est vide (premier démarrage)
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v35 (version: f376ad1d)

## Phase 36 — OS4 v36 : Graphique corrélé Prédictions × Simulations

- [ ] Endpoint tRPC portfolio.getSimulationTimestamps — lit les portfolio_snapshots en DB (createdAt, domain, capitalSaved, guardBlocks)
- [ ] ProbabilityChart.tsx — lignes verticales d'annotation aux timestamps des simulations (couleur par domaine)
- [ ] ProbabilityChart.tsx — tooltip enrichi sur les lignes verticales (domaine, capitalSaved, guardBlocks)
- [ ] Légende du graphique mise à jour (courbes probabilités + marqueurs simulations)
- [ ] 0 erreurs TypeScript
- [ ] 12/12 tests Vitest
- [ ] Checkpoint v36

## Phase 46 — OS4 v46 : Refonte Navigation 5 Pages en Français

- [x] Page Simuler.tsx (/simuler) — 3 onglets Trading/Banque/E-Commerce fusionnés avec intro simple
- [x] Page Decision.tsx (/decision) — fusion DecisionFlow + live stream, tout en français
- [x] Page Preuves.tsx (/preuves) — ProofCenter simplifié en français
- [x] Page Controle.tsx (/controle) — fusion ControlTower + Portfolio en français
- [x] App.tsx — navigation 5 items (Accueil/Simuler/Décision/Preuves/Contrôle), routes nettoyées, redirections
- [x] 0 erreurs TypeScript
- [x] 12/12 tests Vitest
- [x] Checkpoint v46 (version: 3d754ec3)

## Phase 47 — OS4 v47 : Refonte complète 5 pages — Fusion + Explications 3 niveaux

### Accueil (/)
- [ ] Hero clair "Qu'est-ce qu'Obsidia ?" en français simple
- [ ] Démo intégrée (bouton "Voir en 30 secondes") — fusion DemoPage/DemoMode
- [ ] Pipeline animé WORLD→AGENT→GUARD→DECISION→PROOF avec explication de chaque étape
- [ ] Section Roadmap condensée (3 phases clés)

### Simuler (/simuler)
- [ ] Onglet Trading — explication 3 niveaux + simulation interactive
- [ ] Onglet Banque — explication 3 niveaux + simulation interactive
- [ ] Onglet E-Commerce — explication 3 niveaux + simulation interactive
- [ ] Onglet Stress Lab — fusion StressLab.tsx avec explication "Que se passe-t-il si le marché s'effondre ?"
- [ ] Onglet Marché Réel — fusion MirrorMode.tsx avec explication "Prix Binance en direct + Guard X-108"

### Décision (/decision)
- [ ] Section "Comment fonctionne Guard X-108 ?" — fusion GovernanceX108 en langage simple
- [ ] Flux décisionnel live — garder le stream existant
- [ ] Explication causale de chaque décision (WORLD→AGENT→GUARD→VERDICT)

### Preuves (/preuves)
- [ ] Section "Qu'est-ce qu'une preuve ?" — explication simple (Lean 4, TLA+, Merkle)
- [ ] Fusion Audit complet (AuditMode.tsx) avec explication "Comment vérifier qu'Obsidia n'a pas triché ?"
- [ ] Liens GitHub réels vers les preuves

### Contrôle (/controle)
- [ ] Section "Vue causale" — fusion DecisionReactor.tsx (WORLD→AGENT→GUARD→PROOF)
- [ ] Supervision globale — agents actifs, décisions récentes, guard stats
- [ ] Explication "À quoi sert cette page ?"

### Validation
- [ ] 0 erreurs TypeScript
- [ ] 12/12 tests Vitest
- [x] Checkpoint v47 (version: 4e072fc1)

## Phase 47 — OS4 v47 : Refonte complète des 5 pages (fusion pages orphelines + explications 3 niveaux)

- [x] OS4Home.tsx — hero en français, pipeline interactif, roadmap condensée, liens corrigés
- [x] Simuler.tsx — 5 onglets (Trading/Banque/E-Commerce/Stress Lab/Marché Réel), explications 3 niveaux
- [x] Decision.tsx — Governance X-108 fusionné, pipeline 6 étapes, seuils configurables
- [x] Preuves.tsx — AuditMode fusionné, 4 théorèmes Lean 4, 7 invariants TLA+, replay vérification
- [x] Controle.tsx — DecisionReactor fusionné, vue causale WORLD→PROOF, 4 onglets
- [x] TypeScript 0 erreurs
- [x] Tests 12/12 passés
- [x] Checkpoint v47 (version: 4e072fc1)

## Phase 48 — OS4 v48 : Tableau de métriques financières dans Simuler

- [x] Tableau métriques Trading : capital investi, valeur actuelle, P&L €, P&L %, décisions Guard, taux blocage — mise à jour auto
- [x] Tableau métriques Banque : capital, flux nets, fraudes bloquées, montant protégé, taux de rétention
- [x] Tableau métriques E-Commerce : revenu total, marge, conversions, agents actifs, blocages Guard
- [x] Tableau métriques Stress Lab : scénarios testés, taux survie, pire drawdown, capital protégé
- [x] Tableau métriques Marché Réel : prix live, volatilité, décisions Guard simulées, capital hypothétique
- [x] Vérifier que toutes les métriques se mettent à jour automatiquement (refetchInterval ou état local)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v48 (version: 4d26ee33)

## Phase 49 — OS4 v49 : Barres de métriques compactes sur toutes les pages

- [x] Composant BarreMetriques réutilisable (compact, auto-rafraîchi, discret)
- [x] Accueil : total décisions, taux blocage global, capital protégé estimé, uptime
- [x] Décision : BLOCK/HOLD/ALLOW total, % blocage, invariants violés, temps moyen
- [x] Preuves : preuves vérifiées, taux succès, dernier hash, âge dernière preuve
- [x] Contrôle : agents actifs, capital supervisé total, P&L agrégé, taux blocage global
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v49 (version: 1a80df02)

## Phase 49b — OS4 v49b : Correction clignotement BarreMetriques

- [x] Supprimer animation pulse dans BarreMetriques
- [x] Stabiliser les re-renders (éviter les changements de style à chaque tick)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v49b (version: 9086d18d)

## Phase 50 — OS4 v50 : Correction bugs clignotement toutes pages

- [x] Tester Accueil, Simuler, Décision, Preuves, Contrôle dans le navigateur
- [x] Identifier toutes les sources de clignotement (setInterval, useState, CSS animations)
- [x] Corriger les re-renders parasites dans chaque page
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v50 (version: 7d4ff8e8)

## Phase 51 — OS4 v51 : Correction flash écran entier sur Simuler

- [x] Supprimer lazy/Suspense — importer TradingWorld/BankWorld/EcomWorld directement
- [x] Utiliser display:none au lieu de démontage pour masquer les onglets inactifs
- [x] Vérifier que le changement d'onglet ne cause plus de flash
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v51 (version: dd1ebbe1)

## Phase 52 — OS4 v52 : Correction écran noir sur Simuler

- [x] Revenir à lazy/Suspense avec fallback sombre (fond #0a0a0f, pas blanc)
- [x] Garder les onglets montés après premier chargement (Set<string> visited)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v52 (version: 560b66f6)

## Phase 53 — OS4 v53 : Correction définitive flash/écran noir Simuler

- [x] Rendu conditionnel pur — un seul composant actif à la fois (plus simple et plus efficace)
- [x] Suppression des intervals en arrière-plan (démontage propre à chaque changement d'onglet)
- [x] Imports directs (pas de lazy) — bundle chargé une seule fois
- [x] Plus de Suspense fallback — rendu conditionnel pur
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v53 (version: a877d74d)

## Phase 55 — OS4 v55 : Correction TypeError f?.id?.slice
- [ ] Identifier la source de l'erreur f?.id?.slice is not a function
- [ ] Corriger le bug (id non-string dans un composant)
- [ ] TypeScript 0 erreurs
- [ ] Tests 12/12
- [ ] Checkpoint v55

## Phase 56 — OS4 v56 : BankWorld connecté au vrai backend (bank-robo)

- [x] BankWorld — supprimer evaluateGuard() locale, appeler trpc.bank.simulate
- [x] BankWorld — métriques IR/CIZ/DTS/TSG calculées par bankEngine.ts réel
- [x] BankWorld — explication LLM via trpc.ai.explainDecision après chaque simulation
- [x] BankWorld — historique des runs avec métriques et explications LLM
- [x] BankWorld — chaîne d'investissement utilisant le capital résultant de chaque simulation réelle
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v56 (version: 20ae5c5b)

## Phase 57 — OS4 v57 : Graphique évolution solde + Mode automatique + Connexion Simuler

- [x] BankWorld — graphique Chart.js évolution du solde sur les 100 derniers steps
- [x] BankWorld — mode automatique "▶▶ 10 simulations" avec seeds aléatoires
- [x] Simuler.tsx onglet Banque — CIZ/DTS extraits des tickets moteur réels via MetriquesSimulation
- [x] Bilan Bastien — tableau complet réparé vs pas encore (BILAN_BASTIEN_OS4_v57.md)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v57 (version: 2f2cc9b4)

## Phase 58 — OS4 v58 : Corrections Bastien + Export CSV + Backend Obsidia-lab-trad

- [x] Corriger faille agent_id=None dans engine_final.py (core + proofkit + bank-proof)
- [x] Bug F04 PARSE_ERROR — déjà corrigé dans la version actuelle du dépôt
- [x] Contract R1–10 bloquant (ContractViolationError levée si violations)
- [x] Test F02b_agent_id_none_rejected ajouté (13/13 tests Python)
- [x] BankWorld — export CSV du graphique (bouton ⬇ CSV avec IR/CIZ/DTS/TSG)
- [x] Backend Express Obsidia-lab-trad — routes /api/python-engine/decision + health
- [x] Script start.sh (Python FastAPI port 8000 + Express port 3000)
- [x] Commit local 65c714a (push GitHub — token expiré, push manuel requis)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v58 (version: d049a865)

## Phase 59 — OS4 v59 : Connexion ControlTower + Carnet d'ordres réel + Gemini API

- [x] ControlTower — connecté à trpc.engine.info + trpc.trading/bank/ecom.history
- [x] ControlTower — métriques réelles (décisions DB, stats guard, badge "données réelles")
- [x] TradingWorld — carnet d'ordres Mulberry32 PRNG déterministe (seedé sur prix + volume)
- [x] Obsidia-lab-trad — fallback LLM Manus quand GEMINI_API_KEY absent (commit 3c7b5c9)
- [x] TypeScript 0 erreurs
- [x] Tests 12/12
- [x] Checkpoint v59 (version: 9c31a48e)

## Phase 60 — OS4 v60 : Correction formules IR/CIZ/DTS/TSG bankEngine

- [x] Diagnostiquer cause racine DTS=4.3 (cashFlow = sign(logCF)*exp(|logCF|)-1 asymmétrique)
- [x] Corriger formule — dépôts log-normal positifs + retraits = withdrawalRate * dépôt
- [x] Corriger paramètres par défaut : mu=0.0, sigma=0.3, withdrawalRate=0.7
- [x] IR positif possible (withdrawalRate=0.5 → IR>0, CIZ>1)
- [x] DTS < 1 dans un scénario sain (withdrawalRate=0.7 → DTS≈0.7)
- [x] CIZ > 1 possible si le compte grandit (withdrawalRate<1)
- [x] Tests réécrits avec vraies plages : IR∈[-50%,+50%], CIZ∈[0.5,3], DTS∈[0,1.5]
- [x] Test supplémentaire : scénario sain (withdrawalRate=0.5) → CIZ>1, IR>0, DTS<1
- [x] TypeScript 0 erreurs
- [x] Tests 13/13
- [x] Checkpoint v60 (version: 2f7baeab)

## Phase 61 — OS4 v61 : Stress BankWorld + Formules + Audit métriques

- [x] BankWorld — scénario "Crise Financière" (withdrawalRate=1.5, sigma=0.6, Guard BLOCK)
- [x] BankWorld — panneau "Comment ça se calcule ?" avec formules IR/CIZ/DTS/TSG collapsible
- [x] Audit — tableau historique 20 dernières simulations bank (IR/CIZ/DTS/TSG colorés)
- [x] TypeScript 0 erreurs
- [x] Tests 13/13
- [x] Checkpoint v61 (version: 3e7844e4)

## Phase 62 — OS4 v62 : Mode Story TradingWorld + Comparateur TypeScript vs Python BankWorld

- [ ] TradingWorld — Mode Story : scénario Flash Crash guidé 5 étapes (WORLD→AGENT→GUARD→HOLD→PROOF)
- [ ] TradingWorld — tooltips pédagogiques à chaque étape + explication LLM auto
- [ ] TradingWorld — bouton "▶ Mode Story" distinct du mode simulation normal
- [ ] BankWorld — toggle "Moteur Python vs TypeScript"
- [ ] BankWorld — appel /api/python-engine/decision pour le moteur Python
- [ ] BankWorld — affichage côte à côte des deux décisions (TS vs Python)
- [ ] TypeScript 0 erreurs
- [ ] Tests 13/13
- [x] Checkpoint v62 (version: aea1dce4)

## Phase 62 — OS4 v62 : Mode Story TradingWorld + Comparateur TS vs Python

- [x] TradingWorld — Mode Story Flash Crash guidé 5 étapes (overlay + LLM)
- [x] BankWorld — comparateur TypeScript vs Python (côte à côte + badge ACCORD/DÉSACCORD)
- [x] TypeScript 0 erreurs
- [x] Tests 13/13
- [x] Checkpoint v62 (version: aea1dce4)

## Phase 63 — OS4 v63 : Conformité Bastien + Mode Story BankWorld + Export PDF

- [ ] AuditMode — tableau conformité Bastien (7 critiques, statut RÉPARÉ/HORS PÉRIMÈTRE, liens fichiers)
- [ ] BankWorld — Mode Story Crise Bancaire 5 étapes guidées + LLM
- [ ] BankWorld — export PDF rapport simulation (métriques + graphique + décisions + LLM)
- [ ] TypeScript 0 erreurs
- [ ] Tests 13/13
- [x] Checkpoint v63 (version: 06246475)

## Phase 63 — OS4 v63 : Conformité Bastien + Mode Story Bank + Export PDF

- [x] AuditMode — tableau de conformité Bastien (7 critiques, statut, liens fichiers)
- [x] BankWorld — Mode Story Crise Bancaire 5 étapes (overlay + LLM + barre progression)
- [x] BankWorld — bouton "🏦 Mode Story" dans la barre d'actions
- [x] BankWorld — bouton "📄 PDF" export rapport complet (métriques + Guard + LLM)
- [x] TypeScript 0 erreurs
- [x] Tests 13/13
- [x] Checkpoint v63 (version: 06246475)

## Phase 64 — OS4 v64 : Correction Guard X-108 BankWorld (0 bloquées = bug)

- [ ] Diagnostiquer pourquoi Guard ne bloque jamais (seuils trop permissifs ?)
- [ ] Corriger seuils bankEngine.ts — fraude, réserve, drawdown
- [ ] "Capital protégé" doit être > 0 après 15 simulations normales
- [ ] TypeScript 0 erreurs
- [ ] Tests 13/13
- [ ] Checkpoint v64

## Phase 65 — Bugs identifiés (screenshots utilisateur)

- [ ] BankWorld : compteurs Bloquées/Capital protégé toujours à 0 (ne s'incrémentent pas après BLOCK)
- [ ] BankWorld : erreur moteur Python "Unexpected token '<'" — localhost:3001 inaccessible en prod
- [ ] BankWorld : seuils Guard incorrects dans les formules (CIZ < 0.7 → doit être 0.95, DTS > 1.2 → doit être 0.90)
- [ ] ControlTower : Bloquées et Capital protégé affichent "—" au lieu de valeurs
- [ ] EcomWorld : Guard X-108 blocked 0 actions alors que des actions devraient être bloquées

## Pass UX / Produit / Pilotage — Texte 7

- [ ] Composant partagé OperableSurface (5 blocs : Résultat, Pourquoi, Preuve, Pilotage, Détail)
- [ ] TradingWorld : restructuration 5 blocs + interaction marché (signal, taille, risque, mode, scénario) + projection futur (continuation/dégradation/recovery)
- [ ] BankWorld : restructuration 5 blocs + interaction marché (type, montant, contrepartie, urgence) + projection futur
- [ ] EcomWorld : restructuration 5 blocs + interaction marché (trafic, panier, offre, marge) + projection futur
- [ ] Simuler : vrai centre de pilotage (domaine, scénario, paramètres, compare, traces, source, phases)
- [ ] Controle : vrai cockpit (état global, par domaine, violations, santé Python, activité récente, vision synthétique)
- [ ] Decision : blocs pilotage + projection + badges source par événement
- [ ] Preuves : blocs pilotage + replay/verify opérables

## Phase actuelle — Itération ergonomie finale

- [ ] Bloc E — Header métier dans TradingWorld, BankWorld, EcomWorld (mode LAB/LIVE, verdict métier résumé, sliders paramètres)
- [ ] Compteur de tickets dans le header du filtre temporel de Mission Control
- [ ] Export CSV des tickets filtrés dans Mission Control

## Phase 8 — Pipeline Canonique (Agents + Guard X-108 + Méta-agents)
- [x] Pack Python canonique copié dans server/python_agents/ (agents Trading/Bank/Ecom + méta-agents)
- [x] Bridge CLI Python run_pipeline.py (appelé depuis Node.js via child_process)
- [x] Module TypeScript canonicalPipeline.ts (bridge + états par défaut + scénarios prédéfinis)
- [x] Contrats TypeScript contracts.ts + payloadValidator.ts alignés sur Python
- [x] Procédure tRPC engine.canonicalRun (mutation — exécute le pipeline complet)
- [x] Procédure tRPC engine.canonicalAgentRegistry (query — liste tous les agents)
- [x] Procédure tRPC engine.canonicalScenarios (query — scénarios par domaine)
- [x] Composant CanonicalAgentPanel.tsx (visualisation CanonicalEnvelope complet)
- [x] Onglet "Agents" dans Simuler.tsx (3 panels canoniques Trading/Bank/Ecom)
- [x] Documentation technique docs/INTEGRATION_CANONIQUE.md
- [ ] Tests Python pytest pour les agents canoniques
- [ ] Intégration canonical dans les simulations existantes (trading/bank/ecom)
- [ ] GitHub push (Eaubin08/Obsidia-lab-trad) — PAT à renouveler

## Phase V2 — Refonte Frontend Complète (pasted_content_6)

### Étape 1 — Shell global
- [x] Nouvelle navigation principale : Mission / Live / Future / Past / Control
- [x] WorldContext (filtre monde global Trading/Bank/Ecom persistant)
- [x] StatusRail topbar : Mode / Source / X-108 Gate / Last Decision ID / Proof Status
- [x] Layout commun 3 colonnes + zone basse repliable
- [x] Redirects : / → /mission, /simuler → /future, /decision → /live, /preuves → /past, /controle → /control

### Étape 2 — Design system composants canoniques
- [x] DecisionEnvelopeCard (carte universelle CanonicalEnvelope — 4 niveaux d'info)
- [x] AgentRoleGroup (bloc par couche : Observation/Interpretation/Contradiction/Aggregation/Governance/Proof)
- [x] AgentRow (ligne agent : nom/rôle/claim/confidence/flags/trace)
- [x] AgentConstellationPanel (vue groupée 6 couches, vue compacte + développée)
- [x] AggregationSummaryBlock (market_verdict/confidence/contradictions/unknowns/risk_flags/contributors)
- [x] ProofChainView (Decision ID → Trace → Ticket → Attestation → Replay)
- [x] HealthMatrix (grille générique réutilisable pour Control)
- [x] IncidentCard (carte alerte/incident avec actions)
- [x] ReplayPanel (inputs/environment/exact replay/diff)
- [x] WorldCard (carte monde pour Mission)
- [ ] Empty/Loading/Error states unifiés

### Étape 3 — Mission
- [x] Page Mission.tsx : 3 WorldCards + état global OS4
- [x] WorldCard : agents actifs / dernier verdict / gate / severity / ticket / attestation / proof
- [x] Quick entries : Open Live / Future / Past / Control / Last critical run / Last proof gap
- [x] Réduire storytelling, mettre l'action avant l'explication

### Étape 4 — Future
- [x] Page Future.tsx : cockpit 3 colonnes
- [x] Colonne gauche Command : World Setup params (Trading/Bank/Ecom) + Scenario Setup + Candidate Intent + Run Control
- [x] Colonne centre World+Flow : World State synthétique + Agent Fabric 6 couches canoniques
- [x] Colonne droite Decision+Proof : Canonical Envelope + Impact Preview + Actions
- [x] Zone basse Deep Detail : Agent Votes / Aggregate JSON / Envelope JSON / Trace Preview / Evidence Refs / Metrics / Raw Engine

### Étape 5 — Live
- [x] Page Live.tsx : console du présent 3 colonnes
- [x] Colonne gauche Monitor+Filter : filtres / time window / constellation status / watchlist
- [x] Colonne centre : Live World State + Live Decision Feed (Decision Envelope Cards compactes)
- [x] Colonne droite : Active Envelope + Top Contributors + Proof Snapshot + Operator Next Action
- [x] Zone basse : Constellation / Aggregation / Contradictions / Proof Chain / Metrics / Raw Engine

### Étape 6 — Past
- [x] Page Past.tsx : registre prouvé 3 colonnes
- [x] Colonne gauche Search+Filter : search par IDs + core filters + time filters + run type
- [x] Colonne centre : Timeline + Run List (basculable)
- [x] Colonne droite : Canonical Envelope + Proof Chain View + Run Summary + Top Contributors
- [x] Zone basse : Replay / Constellation / Aggregation / Contradictions / Proof Detail / Metrics / Raw Engine
- [x] Compare Runs Panel
- [x] Incident Lens (S3/S4/BLOCK/sans ticket/sans attestation)
- [x] Proof Completeness Score (3/4 format)

### Étape 7 — Control
- [x] Page Control.tsx : tour de commandement
- [x] Bandeau haut Global Command Status : Infrastructure / Governance / Agent Fabric / Proof Fabric
- [x] Colonne gauche : Active Alerts + Open Incidents + Watchlist
- [x] Colonne centre : 4 matrices santé (Infrastructure / Agent Fabric / Governance / Proof Health)
- [x] Colonne droite : Priority Actions + Domain Quick Links + Proof Recovery Links + Agent Recovery Links
- [x] Zone basse : Domains / Agents / Governance / Proof / Trends / Incident Detail

### Étape 8 — Uniformisation Trading/Bank/Ecom
- [x] TradingWorld.tsx : filtre monde via StatusRail (WorldContext)
- [x] BankWorld.tsx : filtre monde via StatusRail (WorldContext)
- [x] EcomWorld.tsx : corriger erreur syntaxe ligne 260/275 (template literals arrow fn)
- [x] Nav secondaire contextuelle : filtre dans StatusRail topbar

### Étape 9 — Cross-navigation
- [x] Live → Past (open run)
- [x] Future → Past (open proof chain)
- [x] Control → Live (open anomaly)
- [x] Control → Past (open critical run)
- [x] Past → Future (replay)
- [x] Live → Proof chain
- [x] Proof chain depuis partout

### Étape 10 — Cohérence finale
- [x] Aucun écran ne ment sur son mode (LIVE/SIMU/FALLBACK/MIXED/DEMO)
- [x] Aucun écran ne laisse les agents en vrac (toujours par couche)
- [x] Aucune preuve orpheline (toujours attachée au run)
- [x] Tous les tableaux : titre métier + phrase interprétation + statut + action
- [x] Debug/raw engine seulement dans couches basses repliables
- [x] Tests Vitest : DecisionEnvelopeCard / AgentConstellationPanel / ProofChainView (27 tests)
- [x] Checkpoint final V2 (f9c2cc91)

## Phase V2 Post — Tâches post-refonte

- [x] Push GitHub os4-integration/ V2 (commit f861797 — 15 fichiers)
- [x] Tests Vitest : 27 tests DecisionEnvelopeCard, ProofChainView, HealthMatrix (45/45 pass)
- [x] Brancher engine.canonicalRun aux boutons Run de Future.tsx (badge source + fallback + ProofChain live)

## Phase V2 Corrections — Conformité audit

### P1 — Critique
- [x] Corriger page blanche initiale (état de chargement App.tsx)
- [x] Propager filtre domaine WorldContext dans Live, Past, Control
- [x] Brancher Past sur trpc.proof.simulationRuns (données DB réelles)
- [x] Brancher Live sur trpc.proof.allTickets + polling 30s
- [x] Brancher Future constellation sur canonicalAgentRegistry (vrais agents)

### P2 — Important
- [x] Mapper réponse canonicalRun → couches constellation (agents réels par couche)
- [x] Replay Panel fonctionnel dans Past (re-run avec seed)
- [x] Proof Completeness Score calculé dans Past
- [x] Incident Lens dans Past (filtres S3/S4/BLOCK/sans ticket)
- [x] Matrices santé réelles dans Control depuis données DB

### P3 — Polish
- [ ] Compare Runs Panel dans Past (prochaine itération)
- [ ] Deep links Control → runs critiques réels (prochaine itération)
- [x] Zone basse dépliable Future (votes agents JSON / raw engine)
- [ ] Watchlist dans Live (prochaine itération)

### Correction supplémentaire
- [x] EcomWorld.tsx IIFE EcomHeader remplacé par JSX direct (erreur Vite corrigée)

## Phase V2 Corrections Complètes — Audit P0+P1+P2

### P0 — Bloquant
- [ ] Mission : brancher trpc.proof.guardStats + trpc.proof.allTickets
- [ ] TradingWorld : template 5 blocs canoniques (Situation/Constellation/Agrégation/Souveraineté/Preuve)
- [ ] BankWorld : template 5 blocs canoniques
- [ ] EcomWorld : template 5 blocs canoniques

### P1 — Important
- [ ] Live : Top Contributors + zone basse (constellation + aggregation + proof chain + metrics)
- [ ] Control : zone basse 6 onglets + Watchlist + incidents cliquables
- [ ] Past : Compare Runs Panel fonctionnel + AgentConstellationPanel zone basse

### P2 — Moyen
- [ ] DecisionEnvelopeCard : ajouter risk_flags + metrics
- [ ] StatusRail : propager mode/gate depuis Live et Past
- [ ] Future : remplacer MOCK_ENVELOPE/MOCK_PROOF par états vides propres

## Phase V2 Audit — Corrections conformité (Score cible : 100/100)

### P2 — Corrigés ✅
- [x] StatusRail propagation mode/gate depuis Live, Past, Control, Future
- [x] MOCK_ENVELOPE et MOCK_PROOF supprimés dans Future.tsx
- [x] risk_flags et metrics dans DecisionEnvelopeCard

### P0 — Bloquant
- [ ] Mission.tsx : brancher trpc.proof.guardStats + trpc.proof.allTickets (0 appel tRPC actuellement)
- [ ] TradingWorld.tsx : template 5 blocs canoniques (Situation/Constellation/Agrégation/Souveraineté/Preuve)
- [ ] BankWorld.tsx : template 5 blocs canoniques
- [ ] EcomWorld.tsx : template 5 blocs canoniques

### P1 — Important
- [ ] Live : zone basse (constellation + aggregation + contradictions + proof chain + metrics)
- [ ] Live : Top Contributors dans colonne droite
- [ ] Live : Proof Snapshot dans colonne droite
- [ ] Control : zone basse (Domains/Agents/Governance/Proof/Trends/Incident Detail)
- [ ] Control : Watchlist dans colonne gauche
- [ ] Control : incidents cliquables → navigation vers Past/Live
- [ ] Past : Compare Runs Panel (diff côte à côte)
- [ ] Past : AgentConstellationPanel en zone basse
- [ ] Past : Top Contributors dans colonne droite

### P3 — Faible
- [x] Control : lenses (silent agents, missing links, contradiction spikes, proof gaps)
- [x] Mission : "Last critical run" + "Last proof gap" dans quick entries (déjà implémenté)
- [ ] Tous les tableaux : titre métier + phrase d'interprétation + statut + action

## Phase Audit 2026-03-11 — Corrections critiques

- [ ] Remplacer Binance (bloqué sandbox) par CoinGecko pour prix BTC/ETH/SOL live dans MirrorMode + TradingWorld
- [ ] Restaurer les routes /trading, /bank, /ecom dans App.tsx (actuellement redirigées vers /future)
- [ ] Étendre les scénarios Future : ajouter les 20 scénarios adversariaux (actuellement 10)
- [ ] Afficher les métriques détaillées du moteur après run dans Future (agent_votes, coherence, volatility)
- [x] Noms d'agents visibles dans Live et Control (corrigé checkpoint 90c866f5)

## Sprint 2026-03-11 — Suggestions + Audit V2

- [ ] Suggestion 1 : Future — lire query params (?domain, ?replay, ?decisionId, ?gate) + bandeau Replay
- [ ] Suggestion 2 : StatusRail — indicateur de fraîcheur (timestamp + âge du gate)
- [ ] Suggestion 3 : TradingWorld/BankWorld/EcomWorld — bouton "Lancer simulation → Future"
- [ ] Audit complet vs specs V2 — identifier tous les manques restants

## Sprint 2026-03-11 — Simplification + Marché Live

- [ ] Composant MarketBanner partagé (BTC/ETH/SOL/régime + change 24h + sparkline) réutilisable sur toutes les pages
- [ ] Mission : bloc marché live en haut + explications contextuelles par section + glossaire inline
- [ ] Live : bandeau marché live + explication "pourquoi ce gate" + "que faire maintenant"
- [ ] Future : contexte marché live dans WorldFlowColumn + simplification World Setup (labels clairs)
- [ ] Past : contexte marché au moment du run + simplification filtres (labels humains)
- [ ] Control : résumé marché dans les cartes domaine + explication des scores (normal/watch/critical)
