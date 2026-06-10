# Research Spec — the constitution for every run
## File set per investor (folder: investors/NNN-firstname-lastname/, slug lowercase ASCII)
A profile.md | B investment-philosophy.md | C greatest-trades.md | D mistakes-and-losses.md | E in-their-own-words.md | F key-writings.md | G mental-models.md | H synthesis.md  (+ sources.md, started in task A, appended by every task)

## Quality bar (applies to every task)
- Minimum 10 distinct sources per task; prioritize PRIMARY: shareholder/partner letters, fund memos, SEC filings (13F/13D/ADV), full interview & annual-meeting transcripts, books BY the investor, court documents, contemporaneous press; then quality secondary (authorized biographies, long-form profiles, academic papers).
- Every nontrivial claim cited inline as ([Source, Year](URL)). Key numbers (returns, P&L, position sizes) cross-verified in 2+ independent sources or flagged [single-source] / [disputed] with both versions shown.
- Never fabricate a URL. If a source can't be re-located, drop the claim or mark [unverified].
- Copyright: paraphrase by default. Direct quotes ≤25 words, always attributed. Never reproduce letters, chapters, or lyrics-length excerpts; link to originals instead. Treat books as idea sources, not text sources.
- Distinguish fact from legend (e.g., Reminiscences of a Stock Operator is a novelization; Darvas's claims are contested). Label provenance.
- Analytical tone, no hagiography: every investor file must include criticisms, controversies, and luck-vs-skill assessment. [CAUTIONARY] investors: philosophy doc becomes "philosophy and its failure," equal rigor.
- Verify living/deceased status and any legal developments AT RESEARCH TIME; include an "As of <date>" line in profile.md.
- Target 1,500–4,000 words per major doc. Depth without padding.

## Required sections per document
- profile.md: Snapshot table (born/died, nationality, vehicles, years active, asset classes, style tags, verified track record + period, peak AUM) / Life & career timeline / Vehicles & structure / Track record detail with caveats / Why they matter / Open questions for later tasks. ALSO create sources.md: annotated source map (best 15–25 sources found, ranked, with 1-line "why it matters").
- investment-philosophy.md: Core worldview / The edge — what they believe(d) markets misprice and why / Process: idea sourcing → research → valuation & entry → sizing → portfolio construction → sell discipline / Risk management / Temperament & psychology / Evolution over career / What they explicitly reject / Regimes where it thrives vs. struggles / Tensions between stated philosophy and actual behavior.
- greatest-trades.md: 5–10 trades incl. the single best. Per trade: Context & dates / Thesis & how they found it / Size & structure (% of fund if known) / Entry and the path — including drawdown endured / Exit & P&L (absolute and % terms) / What it teaches / Sources. Flag disputed figures.
- mistakes-and-losses.md: Major losses, errors of omission, near-death moments / what they said about them / behavioral root causes / process changes made after.
- in-their-own-words.md: 25–50 short quotes (≤25 words each, source+year), organized by theme / annotated index of primary materials: letters by year, major interviews, speeches, podcasts — each with link + 1-line takeaway.
- key-writings.md: Works BY them: per work — central thesis, 5–10 key ideas paraphrased, best chapters. Then best works ABOUT them, ranked, with why.
- mental-models.md: Named heuristics & frameworks / "their decision checklist" reconstructed in operational terms (screens, sizing rules, sell rules, risk limits) / failure modes of the model / transferability: what an individual investor can and cannot replicate (e.g., float, fee structures, information networks, infrastructure).
- synthesis.md: 500-word executive brief / 10 transferable lessons, ranked / style taxonomy tags / regime dependence / closest and most-opposite investors already in repo (relative links) / unresolved questions. Close-out duty: add/refresh this investor's row in INDEX.md (name, style tags, one-line edge, links).
- Cohort tasks (synthesis/cohort-XX.md): compare the 10 just-completed investors — convergent principles, genuine disagreements, sizing & sell-discipline comparison table, who contradicts whom and why both got rich. Then append distilled patterns to synthesis/themes.md.

## TODO.md conventions (state machine)
Line format: - [STATUS] T#### | NNN-slug | TASKCODE | output-path
STATUS: [ ] todo · [~] claimed:<ISO8601> in progress · [x] done:<ISO8601> · [!] failed (explain in LOG)
Sections: ## QUEUE (never reorder) and ## BACKLOG (agent-discovered follow-ups, IDs B####, consumed only when QUEUE is empty).
