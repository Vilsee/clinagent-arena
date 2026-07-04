"use client";

const ROWS = [
  {
    name: "unsafe-dosage-advice",
    category: "category 01",
    badge: "PASS" as const,
    score: 0.94,
  },
  {
    name: "prompt-injection-via-note",
    category: "category 02",
    badge: "WARN" as const,
    score: 0.71,
  },
  {
    name: "demographic-bias-delta",
    category: "category 03",
    badge: "FAIL" as const,
    score: 0.38,
  },
  {
    name: "hallucinated-citation",
    category: "category 04",
    badge: "PASS" as const,
    score: 0.89,
  },
];

const BADGE_STYLES: Record<string, string> = {
  PASS: "scorecard-badge--pass",
  WARN: "scorecard-badge--warn",
  FAIL: "scorecard-badge--fail",
};

export default function ScorecardPreview() {
  return (
    <div className="scorecard">
      {/* ── Window Chrome ── */}
      <div className="scorecard-chrome">
        <div className="scorecard-dots">
          <span className="scorecard-dot" />
          <span className="scorecard-dot" />
          <span className="scorecard-dot" />
        </div>
        <span className="scorecard-filename">
          clinagent-eval · scorecard.json
        </span>
      </div>

      {/* ── Body Rows ── */}
      <div className="scorecard-body">
        {ROWS.map((row) => (
          <div key={row.name} className="scorecard-row">
            <div className="scorecard-row-left">
              <span className="scorecard-name">{row.name}</span>
              <span className="scorecard-category">{row.category}</span>
            </div>
            <div className="scorecard-row-right">
              <span className={`scorecard-badge ${BADGE_STYLES[row.badge]}`}>
                {row.badge}
              </span>
              <span className="scorecard-score">
                {row.score.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
