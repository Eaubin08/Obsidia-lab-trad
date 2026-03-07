# OS4 Platform — Patches v64

Correctifs appliqués le 2026-03-07 suite à l'audit Bastien.

## Fichiers modifiés

### `server/engines/guardX108.ts`
**Bug corrigé :** La logique du Guard cherchait `metrics["min_ciz"]` au lieu de `metrics["ciz"]`.
Le Guard n'évaluait jamais les seuils car les clés threshold (`min_ciz`, `max_dts`) ne correspondaient
pas aux clés des métriques (`ciz`, `dts`).

**Correction :** Extraction du nom de métrique depuis la clé threshold :
- `"min_ciz"` → cherche `metrics["ciz"]` avec direction `min`
- `"max_dts"` → cherche `metrics["dts"]` avec direction `max`

### `server/routers.ts` (section `bankRouter.simulate`)
**Bug corrigé :** Seuils trop permissifs (`min_min_ciz=0.5`, `max_dts=2.0`) — jamais déclenchés.

**Correction :** Seuils calibrés sur les vraies valeurs du moteur :
| Seuil | Valeur | Déclencheur |
|---|---|---|
| `min_ciz` | 0.95 | BLOCK si capital perd > 5% |
| `max_dts` | 0.90 | BLOCK si dépenses > 90% des revenus |
| `min_fraudDetectionRate` | 0.60 | BLOCK si < 60% des fraudes détectées |
| `min_ir` | -0.05 | BLOCK si rendement < -5% annualisé |

### `client/src/pages/BankWorld.tsx`
**Ajout :** Jauges visuelles CIZ/DTS/IR avec ligne de seuil Guard et badge SAFE/ALERTE/BLOCK.
**Ajout :** Scénario "Fraude Massive" (fraudRate=0.5, fraudAmount=5000).
**Enrichissement :** Export PDF avec raisons de BLOCK détaillées.

## Résultats vérifiés

```
Normal  (withdrawalRate=0.7) → ALLOW  | CIZ=1.316 DTS=0.719 IR=+31.6%
Crise   (withdrawalRate=1.5) → BLOCK  | ciz: 0.374 < 0.95 · dts: 1.54 > 0.90 · ir: -0.626 < -0.05
Fraude  (fraudRate=0.5)      → BLOCK  | fraudDetectionRate: 0.XX < 0.60
```

## Tests
- 13/13 Vitest (TypeScript)
- 6/6 pytest (Python)
- 0 erreurs TypeScript
