# Hourly runbook — execute exactly, ONE task per run
1. SYNC: git pull --rebase.
2. SELECT: open _admin/TODO.md. (a) If a [~] claim is >3h old → that task is yours (stale; note "retry" in LOG). (b) Else if a [~] claim is <3h old → skip it, take the next [ ]. (c) Else → first [ ] in QUEUE. (d) QUEUE empty → first [ ] in BACKLOG; if none, do a maintenance task (verify INDEX completeness, fix broken links in 3 oldest files) and log it.
3. CLAIM: set the line to [~] claimed:<now-ISO8601>; commit "claim: T####"; push. This prevents double work.
4. ORIENT: read _admin/RESEARCH_SPEC.md (your task's template), the investor's existing folder, and the last 5 LOG entries.
5. RESEARCH: deep, multi-source, web-first. Expect 15+ searches. Primary sources first per spec. Collect URLs as you go. Triangulate every number.
6. WRITE the output file per its template, citations inline. Create the investor folder on task A if absent. Append new sources to sources.md.
7. SELF-QA (do not skip): all template sections present? every figure cited? quotes ≤25 words? re-open 3 randomly chosen cited URLs and confirm they support the claims — if not, fix or mark [unverified]. Dates and arithmetic sane? Relative links valid?
8. CLOSE OUT: mark [x] done:<now>. Append to _admin/LOG.md:
   ## <ISO8601> — T#### — NNN-slug — TASKCODE — DONE
   - Output: <path> (~words, N sources)
   - Notes: <2-line summary; conflicts/disputes found>
   - Backlog added: <B#### items appended to TODO BACKLOG, if any>
   Rewrite _admin/STATUS.md (3 lines: tasks done/total, current investor, projected finish date).
9. COMMIT & PUSH: "research(NNN-slug): TASKCODE [T####]". On push conflict: pull --rebase, re-apply your TODO/LOG edits, push again.
Hard rules: ONE task per run. Never reorder QUEUE. Never edit other investors' folders except INDEX.md/synthesis when your task says so. If sources are thin, still write the best-effort doc with gaps flagged — mark done, log limitations. Reserve [!] for genuine failure.
