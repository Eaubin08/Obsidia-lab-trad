# AUDIT OS4 V2 — Rapport de conformité UI/UX/Fonctionnel

**Date :** 11 mars 2026  
**Version auditée :** checkpoint `9140af76`  
**Référence spec :** pasted_content 1–6 (architecture Monde × Temps × Run × Preuve)

---

## 1. Résumé exécutif

La refonte V2 a posé les **bonnes fondations** (navigation 5 surfaces, WorldContext, StatusRail, composants canoniques), mais **les 5 pages sont incomplètes** : elles affichent toutes des données mockées statiques au lieu de données réelles, et plusieurs blocs critiques spécifiés dans les documents sont absents ou vides. L'utilisateur ne peut pas voir les décisions des agents, la chaîne canonique INPUTS→OBSERVATION→INTERPRETATION→AGGREGATION→X-108→ENVELOPE, ni les runs réels en base.

**Score de conformité global : 38 / 100**

---

## 2. Tableau de conformité par page

| Page | Prévu (spec) | Implémenté | Manquant | Score |
|------|-------------|------------|----------|-------|
| **Mission** | 3 WorldCards avec état réel, accès rapide, dernier run, dernier incident | Structure présente, données mockées | Données réelles (trpc), dernier incident réel, état X-108 live | 40% |
| **Future** | Cockpit 3 colonnes + constellation 6 couches + agents nommés + run réel | Structure 3 colonnes, mutation canonicalRun branchée, constellation avec agents mock | Agents nommés réels du pack Python, colonne Command complète (World Setup params), zone basse dépliable avec votes agents / JSON brut | 45% |
| **Live** | Feed live d'enveloppes réelles, constellation active, top contributors, proof snapshot | Structure 3 colonnes, MOCK_FEED statique | **0 donnée réelle** — tout est mock, pas de trpc.engine.canonicalRun, pas d'auto-refresh, pas de constellation active | 20% |
| **Past** | Registre runs réels de la DB, timeline, proof chain, replay, compare | Structure 3 colonnes, MOCK_RUNS statiques | **0 donnée réelle** — trpc.proof.simulationRuns non branché, pas de timeline réelle, pas de replay fonctionnel | 15% |
| **Control** | 4 matrices santé réelles, incidents réels, deep links, proof coverage % | Structure présente, MOCK_HEALTH et MOCK_INCIDENTS statiques | **0 donnée réelle** — trpc.engine non branché, pas d'alertes réelles, pas de proof coverage calculé | 15% |

---

## 3. Problèmes critiques par catégorie

### 3.1 Données — Tout est mocké

Toutes les pages utilisent des constantes statiques (`MOCK_FEED`, `MOCK_RUNS`, `MOCK_HEALTH`, `MOCK_INCIDENTS`, `MOCK_AGENTS`, `MOCK_AGGREGATION`) au lieu d'appels tRPC réels. Le seul endpoint branché est `engine.canonicalRun` dans Future (bouton Run uniquement).

**Endpoints existants non utilisés dans l'UI V2 :**
- `trpc.proof.simulationRuns` → Past (liste des runs réels en DB)
- `trpc.proof.allTickets` → Past (tickets réels)
- `trpc.engine.canonicalAgentRegistry` → Future/Live (liste des 41 agents réels)
- `trpc.engine.canonicalScenarios` → Future (scénarios disponibles)
- `trpc.trading.simulate`, `trpc.bank.simulate`, `trpc.ecom.simulate` → Live/Future

### 3.2 Agents — Constellation non fonctionnelle

La spec (pasted_content_2) exige que la page Future affiche la **chaîne canonique complète** :
```
INPUTS → OBSERVATION → INTERPRETATION → CONTRADICTION → AGGREGATION → GOVERNANCE → PROOF
```
avec les **41 agents nommés** du pack Python (ex: `TrendAgent`, `VolatilityAgent`, `RegimeAgent`, `FraudDetector`, `LiquidityAgent`...) organisés par couche, avec leur claim, confidence, severity_hint, contradictions, evidence_count.

**Ce qui existe :** `AgentConstellationPanel` est créé et fonctionnel, mais alimenté par `MOCK_AGENTS` (3 agents fictifs).  
**Ce qui manque :** brancher `trpc.engine.canonicalAgentRegistry` pour charger les vrais agents, et mapper la réponse `canonicalRun` vers les couches de la constellation.

### 3.3 Live — Page vide fonctionnellement

La spec (pasted_content_3) exige :
- **Bloc A (gauche) :** filtres Live (domaine, gate, severity, time window), statut constellation (agents actifs/silencieux/anomalous), watchlist
- **Bloc B (centre) :** Live World State (métriques du monde en temps réel), Live Decision Feed (cartes compactes auto-rafraîchies)
- **Bloc C (droite) :** Active Envelope (dernière décision), Top Contributors (agents dominants), Proof Snapshot, Operator Next Action
- **Zone basse :** Constellation / Agrégation / Contradictions / Proof Chain / Métriques / Raw Engine

**Ce qui existe :** structure HTML avec `MOCK_FEED` statique (3 enveloppes fictives).  
**Ce qui manque :** auto-refresh via `trpc.engine.canonicalRun` (polling 30s), constellation active, proof snapshot réel.

### 3.4 Past — Registre déconnecté de la DB

La spec (pasted_content_4) exige :
- Liste des runs depuis `trpc.proof.simulationRuns` (DB réelle)
- Timeline avec distribution temporelle réelle
- Proof Chain View avec `decision_id` → `trace_id` → `ticket_id` → `attestation_ref` réels
- Replay Panel fonctionnel (re-exécuter un run avec le même seed)
- Compare Runs (2 runs côte à côte)
- Incident Lens (filtrer S3/S4/BLOCK/sans ticket/sans attestation)
- Proof Completeness Score calculé (ex: 3/4 éléments prouvés)

**Ce qui existe :** `MOCK_RUNS` (4 runs fictifs), structure UI correcte.  
**Ce qui manque :** tout le branchement DB, le replay réel, le compare fonctionnel.

### 3.5 Control — Tour de commandement sans données

La spec (pasted_content_5) exige :
- Bandeau haut : état global `OK / WATCH / DEGRADED / CRITICAL` calculé depuis les métriques réelles
- 4 matrices santé calculées depuis les runs réels (Infrastructure, Agent Fabric, Governance, Proof Health)
- Incidents réels (depuis DB ou pipeline)
- Proof Coverage % calculé
- Deep links vers runs critiques réels

**Ce qui existe :** `MOCK_HEALTH` et `MOCK_INCIDENTS` statiques.  
**Ce qui manque :** tout le calcul depuis données réelles.

### 3.6 StatusRail — Filtre monde non propagé aux pages

Le `WorldContext` et le `StatusRail` existent et permettent de changer de domaine (Trading/Bank/Ecom). Mais les pages **Live**, **Past** et **Control** ne réagissent pas au changement de domaine — elles affichent toujours les mêmes données mockées quel que soit le domaine sélectionné.

**Future** réagit partiellement (le label change) mais les agents mockés ne changent pas.

### 3.7 Page blanche au chargement

La page s'affiche blanche au premier chargement (screenshot checkpoint). Cause probable : le `WorldProvider` ou le `PortfolioContext` n'est pas encore résolu quand le composant tente de rendre. Nécessite un état de chargement initial.

---

## 4. Éléments présents et conformes

Les éléments suivants sont **correctement implémentés** et conformes aux specs :

| Élément | Statut |
|---------|--------|
| Navigation 5 surfaces (Mission/Live/Future/Past/Control) | ✅ Conforme |
| WorldContext + filtre domaine persistant | ✅ Conforme |
| StatusRail topbar (Mode/Source/X-108/LastDecision/Proof) | ✅ Conforme |
| DecisionEnvelopeCard (4 niveaux, 3 variants) | ✅ Conforme |
| AgentConstellationPanel (6 couches, AgentRow, AgentRoleGroup) | ✅ Conforme (structure) |
| ProofChainView (Decision→Trace→Ticket→Attestation) | ✅ Conforme (structure) |
| HealthMatrix (grille générique) | ✅ Conforme (structure) |
| IncidentCard + ReplayPanel | ✅ Conforme (structure) |
| Future.tsx — mutation canonicalRun branchée | ✅ Partiellement conforme |
| Redirects anciens URLs → nouvelles routes | ✅ Conforme |
| 45/45 tests Vitest | ✅ Conforme |
| 0 erreur TypeScript | ✅ Conforme |

---

## 5. Plan de correction priorisé

### Priorité 1 — CRITIQUE (bloquant pour la démo)

| # | Correction | Page | Effort |
|---|-----------|------|--------|
| P1.1 | Brancher `trpc.proof.simulationRuns` dans Past (liste réelle) | Past | 2h |
| P1.2 | Brancher `trpc.engine.canonicalAgentRegistry` dans Future + Live (agents réels) | Future, Live | 3h |
| P1.3 | Auto-refresh Live via `canonicalRun` polling 30s | Live | 1h |
| P1.4 | Propager le filtre domaine WorldContext dans Live, Past, Control | Tous | 2h |
| P1.5 | Corriger la page blanche initiale (état de chargement) | App.tsx | 30min |

### Priorité 2 — IMPORTANT (conformité spec)

| # | Correction | Page | Effort |
|---|-----------|------|--------|
| P2.1 | Mapper la réponse `canonicalRun` vers les couches de la constellation (agents réels par couche) | Future | 3h |
| P2.2 | Replay Panel fonctionnel (re-run avec seed depuis Past) | Past | 2h |
| P2.3 | Proof Completeness Score calculé (decision_id + trace + ticket + attestation) | Past | 1h |
| P2.4 | Calcul des 4 matrices santé depuis données réelles | Control | 3h |
| P2.5 | Incident Lens dans Past (filtres S3/S4/BLOCK/sans ticket) | Past | 1h |

### Priorité 3 — AMÉLIORATION (polish)

| # | Correction | Page | Effort |
|---|-----------|------|--------|
| P3.1 | Compare Runs Panel (2 runs côte à côte) | Past | 2h |
| P3.2 | Watchlist dans Live (agents à surveiller) | Live | 1h |
| P3.3 | Deep links Control → runs critiques réels | Control | 1h |
| P3.4 | Zone basse dépliable Future (votes agents JSON / raw engine) | Future | 1h |

---

## 6. Diagnostic de la confusion UX

La confusion signalée ("je comprends plus rien du tout à l'app") vient de **3 causes combinées** :

**Cause 1 — Page blanche.** L'app s'affiche blanche au premier chargement. L'utilisateur ne sait pas si l'app fonctionne.

**Cause 2 — Données mockées invisibles.** Les pages affichent des données qui semblent réelles (IDs, timestamps, verdicts) mais sont toutes statiques. Quand on change de domaine dans le StatusRail, rien ne change dans les pages. L'utilisateur ne comprend pas le lien entre le filtre et le contenu.

**Cause 3 — Agents absents.** La promesse centrale de l'app ("voir les agents décider") n'est pas visible. La constellation agentique est présente dans Future mais avec 3 agents fictifs. Dans Live et Past, elle est absente. L'utilisateur ne voit jamais "qui a décidé quoi et pourquoi".

---

## 7. Conclusion

La V2 a correctement restructuré la navigation et créé tous les composants du design system. **La coquille est bonne, le contenu est vide.** Les 3 corrections les plus urgentes sont : (1) brancher Past sur la DB réelle, (2) brancher Live sur le pipeline canonique avec auto-refresh, (3) afficher les vrais agents nommés dans la constellation de Future.

Ces 3 corrections représentent environ **8 heures de travail** et transformeraient l'app d'une maquette fonctionnelle en un produit opérationnel.
