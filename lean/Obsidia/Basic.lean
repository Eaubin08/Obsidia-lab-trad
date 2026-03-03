namespace Obsidia

structure Metrics where
  T_mean : ℝ
  H_score : ℝ
  A_score : ℝ
  S : ℝ

inductive Decision
| HOLD
| ACT
deriving Repr, DecidableEq

def decision (m : Metrics) (theta : ℝ) : Decision :=
  if m.S ≥ theta then Decision.ACT else Decision.HOLD

end Obsidia
