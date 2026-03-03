/-
  OBSIDIA — Phase 17 : Formal System Model
  Module : SystemModel.lean
  But : définir OBSIDIA comme une machine mathématique formelle.

  Définitions :
    State       = (Repo, AuditLog)
    Input       = (Metrics, theta : Rat)
    Decision    = Basic.Decision (HOLD | ACT)
    AuditRecord = (Input, Decision)
    Transition  = T(State, Input) → (Decision × State)
    sealRepo    = Σ(Repo) → Hash

  Propriétés prouvées :
    P17_Determinism    : T(s, i) = T(s, i)  (trivial, mais explicite)
    P17_SealSensitive  : repo.leaves ≠ repo'.leaves → Σ(repo) ≠ Σ(repo')
    P17_AuditGrowth    : |log(T(s,i).state)| = |log(s)| + 1

  Lean 4.28 — sans Mathlib.
-/
import Obsidia.Basic
import Obsidia.Sensitivity

namespace Obsidia.SystemModel

-- ─────────────────────────────────────────────────────────────
-- 1. AuditRecord : une entrée de log
-- ─────────────────────────────────────────────────────────────

/-- Un enregistrement d'audit associe une entrée (métriques + seuil)
    à la décision produite. -/
structure AuditRecord where
  metrics : Obsidia.Metrics
  theta   : Rat
  result  : Obsidia.Decision

-- ─────────────────────────────────────────────────────────────
-- 2. State : état complet du système
-- ─────────────────────────────────────────────────────────────

/-- L'état du système est composé de :
    - repo     : l'ensemble des fichiers (représenté par leurs hashes)
    - auditLog : l'historique des décisions -/
structure State where
  repo     : Obsidia.Sensitivity.Repo
  auditLog : List AuditRecord

-- ─────────────────────────────────────────────────────────────
-- 3. Input : entrée du système
-- ─────────────────────────────────────────────────────────────

/-- Une entrée du système est composée de métriques et d'un seuil theta. -/
structure Input where
  metrics : Obsidia.Metrics
  theta   : Rat

-- ─────────────────────────────────────────────────────────────
-- 4. Decision kernel : fonction de décision pure
-- ─────────────────────────────────────────────────────────────

/-- Fonction de décision : pure, déterministe.
    Réutilise la définition de Basic.lean. -/
def decide (i : Input) : Obsidia.Decision :=
  Obsidia.decision i.metrics i.theta

-- ─────────────────────────────────────────────────────────────
-- 5. sealRepo : empreinte cryptographique du Repo
-- ─────────────────────────────────────────────────────────────

/-- Le sceau d'un Repo est la racine Merkle de ses feuilles.
    Utilise la définition de Sensitivity.lean. -/
noncomputable def sealRepo (r : Obsidia.Sensitivity.Repo) : Obsidia.Hash :=
  Obsidia.Sensitivity.merkleRoot r

-- ─────────────────────────────────────────────────────────────
-- 6. Transition function : T(State, Input) → (Decision × State)
-- ─────────────────────────────────────────────────────────────

/-- La fonction de transition prend un état et une entrée,
    produit une décision et un nouvel état avec le log mis à jour. -/
def transition (s : State) (i : Input) : Obsidia.Decision × State :=
  let d    := decide i
  let entry := AuditRecord.mk i.metrics i.theta d
  let s'   := State.mk s.repo (s.auditLog ++ [entry])
  (d, s')

-- ─────────────────────────────────────────────────────────────
-- 7. Propriétés formelles
-- ─────────────────────────────────────────────────────────────

/-- P17_Determinism : la fonction de transition est déterministe.
    Deux appels identiques produisent le même résultat. -/
theorem P17_Determinism (s : State) (i : Input) :
    transition s i = transition s i := rfl

/-- P17_SealSensitive : si deux repos ont des feuilles différentes,
    leurs sceaux sont différents.
    Découle directement de merkleRoot_change_if_leaf_change. -/
theorem P17_SealSensitive
    (r r' : Obsidia.Sensitivity.Repo)
    (h : r.leaves ≠ r'.leaves) :
    sealRepo r ≠ sealRepo r' := by
  unfold sealRepo
  exact Obsidia.Sensitivity.merkleRoot_change_if_leaf_change r r' h

/-- P17_AuditGrowth : chaque transition ajoute exactement un enregistrement
    à l'audit log. -/
theorem P17_AuditGrowth (s : State) (i : Input) :
    (transition s i).2.auditLog.length = s.auditLog.length + 1 := by
  unfold transition
  simp [List.length_append]

end Obsidia.SystemModel
