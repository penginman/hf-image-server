# History

## Description
- Record each Git change or local file change summary.
- Each entry includes reason, impact scope, and related links (put links in Notes when applicable).
- If owner is not specified, default to `<project-name>-agent-1`.
- Use datetime format `YYYY-MM-DD HH:MM` (24h).

## Mandatory Action
- MUST: When this table reaches 50 entries, compress the records into shorter and more general summaries, keeping stable and reusable change points.

## Record Template
| Date Time | Type | Summary | Reason | Impact Scope | Owner Id | Notes |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 2026-03-08 09:48 | code | Added realtime preset-to-dimension binding and wired width/height into generation payloads | Ensure advanced settings resolution controls directly drive request dimensions with enforced constraints | front ControlPanel, app store, creation flow, provider service payloads | 01KK5GJG19EGWT6WF5J6R9FDN0 | Task: sync preset and width/height inputs; enforce min/max/step; use bound values in request |
| 2026-03-08 10:31 | code | Hardened `/api/v1/models` config-read chain and provider availability checks; added ModelsLab credential support to unified token logic | Prevent malformed/missing config branches from bubbling into 500 and keep returned model list aligned with available credentials | backend model route, provider registry filtering, token manager provider parsing/stats | 01KK5HRQGJHWY51XM6GPZQZEPQ | Evidence: `/api/v1/models` returns 200 on local server (PORT 3011/3012); malformed env token type path returns 200 in `app.fetch` validation |
| 2026-03-08 17:45 | code | Implemented z-image-turbo multi-channel routing (A/B/C) with auto/manual strategy, retry-triggered channel cooldown, and azure99 endpoint support | Add service-layer failover across channels while preserving SSE progress callback behavior and existing API shape | front hfService z-image-turbo generation path and routing helpers | 01KK5GJG1903817T9XYK8D377X | Task01: A/B/C list includes `https://azure99-z-image-turbo.hf.space`; cooldown configurable 120-600s (default 300s); build passed |
