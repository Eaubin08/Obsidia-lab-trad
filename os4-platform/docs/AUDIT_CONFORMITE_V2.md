# Rapport d'audit de conformité — OS4 V2 vs Specs documents

**Date :** 11 mars 2026  
**Version auditée :** checkpoint `78c60722`  
**Référence :** pasted_content_1 à 6 (specs complètes)

---

## Score global : 68/100

La structure V2 est en place. Les 5 pages existent, les composants canoniques sont créés, les données réelles sont branchées. Mais plusieurs éléments critiques des specs sont absents ou incomplets.

---

## 1. Mission — Score : 55/100

### ✅ Conforme
- 3 WorldCards Trading / Bank / Ecom présentes
- Accès rapide vers Live / Future / Past / Control
- Filtre domaine via `useWorld()`
- Affichage : agents actifs, dernier verdict, gate, severity, ticket/attestation, proof status

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **Données 100% mock** | Les WorldCards doivent afficher les vraies données depuis `trpc.proof.guardStats` et `trpc.proof.allTickets` | Critique — les chiffres affichés sont faux |
| **Pas de `trpc` call** | 0 appel tRPC dans Mission.tsx | Critique |
| **Pas de "Last critical run"** | Spec : "accès rapide vers Last critical run / Last proof gap" | Moyen |

---

## 2. Future — Score : 75/100

### ✅ Conforme
- Layout 3 colonnes (Command / World+Flow / Decision+Proof)
- Constellation agentique 6 couches (Observation → Proof)
- `canonicalAgentRegistry` branché (vrais agents)
- `canonicalRun` branché (bouton Run → pipeline Python)
- Zone basse avec onglets (Agent Votes / Envelope JSON / Trace)
- Ordre de lecture respecté : paramètres → agents → agrégation → X-108 → preuve

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **`MOCK_ENVELOPE` encore présent** | L'enveloppe initiale (avant le premier run) est un mock statique | Moyen — confus avant le premier run |
| **`MOCK_PROOF` encore présent** | La proof chain initiale est mock | Moyen |
| **Pas d'Impact Preview** | Spec : "Impact Preview" dans colonne droite | Faible |
| **Pas de Candidate Intent** | Spec : "Candidate Intent" dans colonne gauche | Faible |

---

## 3. Live — Score : 70/100

### ✅ Conforme
- `trpc.proof.allTickets` branché avec polling 30s
- `trpc.engine.canonicalAgentRegistry` branché
- Feed de Decision Envelope Cards
- ProofChainView dans zone droite
- Onglets : Envelope / Proof Chain / Agents
- Filtre domaine propagé

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **Pas de "Top Contributors"** | Spec : "top contributors" dans colonne droite | Important — c'est un élément clé des specs |
| **Pas de zone basse** | Spec : "bas : constellation + aggregation + contradictions + proof chain + metrics + raw engine" | Important |
| **Pas d'AgentConstellationPanel** | Live doit afficher la constellation agentique en zone basse | Important |
| **Pas de "Proof Snapshot"** | Spec : "proof snapshot" dans colonne droite | Moyen |
| **Pas de "Watchlist"** | Spec : panneau watchlist pour épingler des Decision IDs | Faible |

---

## 4. Past — Score : 72/100

### ✅ Conforme
- `trpc.proof.simulationRuns` branché (données DB réelles)
- `trpc.proof.allTickets` branché
- Timeline + Run List (basculable)
- DecisionEnvelopeCard dans colonne droite
- ProofChainView dans zone basse
- ReplayPanel présent
- Onglet "Comparer" présent
- Incident Lens (filtres S3/S4/BLOCK/sans ticket)
- Proof Completeness Score (3/4 format)

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **Compare Runs Panel vide** | L'onglet "Comparer" existe mais n'affiche pas de diff côte à côte | Important |
| **Pas d'AgentConstellationPanel** | Spec : "constellation" dans zone basse | Moyen |
| **Pas de "Top Contributors"** | Spec : "top contributors" dans colonne droite | Moyen |
| **Proof chain non attachée au run** | Spec règle 5 : "toujours rattacher la preuve au run, jamais en abstraction" | Moyen |

---

## 5. Control — Score : 65/100

### ✅ Conforme
- `trpc.proof.guardStats` branché (données réelles)
- `trpc.proof.allTickets` branché
- `trpc.engine.canonicalAgentRegistry` branché
- 4 matrices santé (Infrastructure / Agent Fabric / Governance / Proof Health)
- Colonne gauche : Active Alerts + Open Incidents
- Colonne droite : Priority Actions + Domain Quick Links + Proof Recovery + Agent Recovery
- Bandeau haut : Global Command Status

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **Pas de zone basse** | Spec : "bas : Domains / Agents / Governance / Proof / Trends / Incident Detail" | Important |
| **Pas de Watchlist** | Spec : "colonne gauche : alerts / incidents / watchlist" | Important |
| **Incidents non cliquables** | Spec : "chaque alerte renvoie vers une action ou une vue dédiée" | Important |
| **Pas de "Contradiction spikes" lens** | Spec : lenses silent agents / missing links / contradiction spikes / proof gaps | Moyen |
| **Pas de "Silent Agents" lens** | Idem | Moyen |

---

## 6. World Pages (Trading / Bank / Ecom) — Score : 40/100

### ✅ Conforme
- TradingWorld, BankWorld, EcomWorld existent et fonctionnent
- Données réelles (prix, simulations, guard stats)
- Redirects vers `/future` depuis les anciennes routes

### ❌ Non conforme — CRITIQUE
| Manque | Spec | Impact |
|--------|------|--------|
| **0 composant canonique utilisé** | Spec étape 8 : "mêmes composants, mêmes patterns" — aucune des 3 pages n'utilise `AgentConstellationPanel`, `DecisionEnvelopeCard`, `ProofChainView` | Critique |
| **Pas de template 5 blocs** | Spec : "Situation / Constellation / Agrégation / Souveraineté / Preuve" | Critique |
| **Hiérarchie de lecture non respectée** | Spec règle : Niveau 1 (verdict/gate/severity) → Niveau 2 (reason_code/contradictions) → Niveau 3 (agents) → Niveau 4 (preuve) → Niveau 5 (debug) | Critique |
| **Agents affichés en liste brute** | Spec règle 4 : "toujours organiser les agents par rôle, jamais par liste brute" | Critique |

---

## 7. Composants canoniques — Score : 80/100

### ✅ Conforme
- `DecisionEnvelopeCard` : tous les champs specs présents (domain, market_verdict, confidence, x108_gate, reason_code, severity, decision_id, ticket_id, attestation_ref, source, contradictions, unknowns)
- `AgentConstellationPanel` : 6 couches (Observation → Proof) avec questions
- `ProofChainView` : chaîne Decision → Trace → Ticket → Attestation
- `HealthMatrix` : grille générique
- `IncidentCard` : carte alerte avec actions
- `ReplayPanel` : replay d'un run passé

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **`risk_flags` absent de `DecisionEnvelopeCard`** | Spec : "risk_flags" dans l'objet canonique central | Moyen |
| **`metrics` absent de `DecisionEnvelopeCard`** | Spec : "metrics" dans l'objet canonique central | Moyen |
| **`raw_engine` absent** | Spec : niveau 5 debug, seulement dans couches basses repliables | Faible |
| **Tableaux sans "phrase d'interprétation"** | Spec règle 8 : "aucun tableau sans titre métier + phrase d'interprétation + statut + action" | Moyen |

---

## 8. StatusRail — Score : 85/100

### ✅ Conforme
- Monde (Trading/Bank/Ecom) — filtre cliquable
- Mode (LIVE/SIMU/FALLBACK/MIXED/DEMO)
- Source
- X-108 Gate
- Last Decision ID
- Proof Status

### ❌ Non conforme
| Manque | Spec | Impact |
|--------|------|--------|
| **Mode toujours "DEMO"** | Le mode n'est mis à jour que par Future après un run. Les autres pages ne le mettent jamais à jour | Moyen |
| **X-108 Gate toujours null** | Idem — ne se met à jour que depuis Future | Moyen |

---

## 9. Règles UX absolues — Conformité

| Règle | Statut | Note |
|-------|--------|------|
| Ne jamais faire croire que le frontend décide | ✅ | Respecté |
| Toujours afficher le mode réel (LIVE/SIMU/FALLBACK/MIXED/DEMO) | ⚠️ | StatusRail présent mais mode toujours DEMO |
| Toujours montrer la chaîne agents → agrégation → X-108 → preuve | ⚠️ | Seulement dans Future. Live/Past/Control incomplets |
| Toujours organiser les agents par rôle | ⚠️ | Respecté dans Future. Pas dans World Pages |
| Toujours rattacher la preuve au run | ⚠️ | Partiellement respecté |
| Toujours permettre la navigation croisée | ✅ | Live↔Past, Future↔Past, Control→Live/Past présents |
| Chaque tableau : titre métier + phrase interprétation + statut + action | ❌ | Absent dans la majorité des tableaux |
| Debug/raw engine seulement dans couches basses repliables | ✅ | Respecté |

---

## Priorités de correction

### P0 — Bloquant (à corriger immédiatement)
1. **Mission** : brancher `trpc.proof.guardStats` + `trpc.proof.allTickets` (0 trpc call actuellement)
2. **World Pages** : intégrer les composants canoniques (AgentConstellationPanel, DecisionEnvelopeCard, ProofChainView) dans les 3 pages

### P1 — Important
3. **Live** : ajouter Top Contributors + zone basse (constellation + aggregation + proof chain)
4. **Control** : ajouter zone basse (Domains/Agents/Governance/Proof/Trends/Incident Detail) + Watchlist + incidents cliquables
5. **Past** : compléter Compare Runs Panel + AgentConstellationPanel en zone basse

### P2 — Moyen
6. **DecisionEnvelopeCard** : ajouter `risk_flags` et `metrics`
7. **StatusRail** : propager les mises à jour de mode/gate depuis Live et Past (pas seulement Future)
8. **Future** : remplacer `MOCK_ENVELOPE` et `MOCK_PROOF` par des états vides propres

### P3 — Faible
9. **Control** : ajouter lenses (silent agents, missing links, contradiction spikes, proof gaps)
10. **Mission** : ajouter "Last critical run" et "Last proof gap" dans les quick entries
