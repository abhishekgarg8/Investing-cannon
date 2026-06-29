# Task queue — state machine for all hourly runs
Line format: - [STATUS] T#### | NNN-slug | TASKCODE | output-path
STATUS markers: [ ] todo · [~] claimed:<ISO8601> in progress · [x] done:<ISO8601> · [!] failed (explain in LOG)
Sections: ## QUEUE (never reorder) and ## BACKLOG (agent-discovered follow-ups, IDs B####, consumed only when QUEUE is empty).
Procedure: _admin/HOURLY_RUNBOOK.md. Templates and quality bar: _admin/RESEARCH_SPEC.md.

## QUEUE
- [x] done:2026-06-10T06:48:56Z T0001 | 001-warren-buffett | A-profile | investors/001-warren-buffett/profile.md
- [x] done:2026-06-10T07:26:04Z T0002 | 001-warren-buffett | B-philosophy | investors/001-warren-buffett/investment-philosophy.md
- [x] done:2026-06-10T08:31:21Z T0003 | 001-warren-buffett | C-greatest-trades | investors/001-warren-buffett/greatest-trades.md
