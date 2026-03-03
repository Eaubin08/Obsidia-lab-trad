# Phase 5 — /v1/decision API (minimal)

## Install
```bash
pip install -r core/api/requirements.txt
```

## Run
```bash
uvicorn core.api.app:APP --host 0.0.0.0 --port 8000
```

## Request (metrics direct)
POST /v1/decision
```json
{
  "metrics": {"T_mean": 0.2, "H_score": 0.3, "A_score": 0.1, "S": 0.25},
  "theta_S": 0.25,
  "request_id": "demo-001",
  "client_time": "2026-03-03T10:00:00Z",
  "tags": {"mode": "bank"}
}
```

## Request (matrix -> metrics)
```json
{
  "W_full": [[0,1,0.5],[1,0,0.2],[0.5,0.2,0]],
  "core_nodes": [0,1,2],
  "alpha": 1.0, "beta": 1.0, "gamma": 0.5,
  "theta_S": 0.25
}
```

Audit log: `core/api/audit_log.jsonl` (hash-chained).
