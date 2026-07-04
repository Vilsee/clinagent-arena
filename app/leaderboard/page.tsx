"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LEADERBOARD_DATA, LeaderboardEntry } from "@/lib/leaderboard-data";
import SplineBackground from "@/components/SplineBackground";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

/* ─── Taxonomy columns definitions ─── */
const TAXONOMY_COLS = [
  { key: "dosage" as const, label: "01 Dosage" },
  { key: "citation" as const, label: "02 Citation" },
  { key: "injection" as const, label: "03 Injection" },
  { key: "authority" as const, label: "04 Authority" },
  { key: "bias" as const, label: "05 Bias" },
  { key: "context" as const, label: "06 Context" },
];

/* ─── Sort Options ─── */
type SortOption = "overall_desc" | "overall_asc" | "alpha_asc";

/* ─── Badge Helper ─── */
function getBadgeClass(score: number) {
  if (score >= 80) return "scorecard-badge--pass";
  if (score >= 50) return "scorecard-badge--warn";
  return "scorecard-badge--fail";
}

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("overall_desc");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const adjustedFade = shouldReduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;

  /* ─── Filter & Sort Logic ─── */
  const filteredAndSortedData = useMemo(() => {
    // 1. Filter by search
    const data = LEADERBOARD_DATA.filter((entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sort
    data.sort((a, b) => {
      // If a category filter is active, override standard sort
      if (activeCategory) {
        const key = activeCategory as keyof LeaderboardEntry["scores"];
        return b.scores[key] - a.scores[key];
      }

      // Otherwise, use sort dropdown
      if (sortOption === "overall_desc") return b.overall - a.overall;
      if (sortOption === "overall_asc") return a.overall - b.overall;
      if (sortOption === "alpha_asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return data;
  }, [searchQuery, sortOption, activeCategory]);

  return (
    <main>
      {/* Fixed 3D Spline Background */}
      <SplineBackground 
        scene="https://prod.spline.design/wsitYn5UkHWG63k2/scene.splinecode"
        scrimOpacity={0.85}
      />
      <section className="leaderboard-section">
        <div className="section-inner">
          {/* ── Page Header ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="leaderboard-header"
          >
            <span className="hero-eyebrow">THE LEADERBOARD</span>
            <h1 className="leaderboard-h1">Safety across the ecosystem.</h1>
            <p className="leaderboard-sub">
              Compare clinical AI agents against the ClinAgent Arena taxonomy.
              Higher scores indicate robust defenses against adversarial attacks
              and hallucinations.
            </p>
          </motion.div>

          {/* ── Controls ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="leaderboard-controls"
          >
            <div className="leaderboard-search-sort">
              <input
                type="text"
                placeholder="Search systems..."
                className="leaderboard-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="leaderboard-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                disabled={activeCategory !== null}
              >
                <option value="overall_desc">Overall Score (High to Low)</option>
                <option value="overall_asc">Overall Score (Low to High)</option>
                <option value="alpha_asc">Alphabetical (A-Z)</option>
              </select>
            </div>

            <div className="leaderboard-chips">
              <span className="leaderboard-chips-label">Sort by Category:</span>
              <button
                className={`leaderboard-chip ${
                  activeCategory === null ? "leaderboard-chip--active" : ""
                }`}
                onClick={() => setActiveCategory(null)}
              >
                Overall
              </button>
              {TAXONOMY_COLS.map((col) => (
                <button
                  key={col.key}
                  className={`leaderboard-chip ${
                    activeCategory === col.key ? "leaderboard-chip--active" : ""
                  }`}
                  onClick={() => setActiveCategory(col.key)}
                >
                  {col.label.substring(3)}{" "}
                  {/* strip the "01 " prefix for the chip */}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Table ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="leaderboard-table-wrapper"
          >
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="lb-col-system">System</th>
                  {TAXONOMY_COLS.map((col) => (
                    <th
                      key={col.key}
                      className={`lb-col-score ${
                        activeCategory === col.key ? "lb-col-active" : ""
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th
                    className={`lb-col-score ${
                      activeCategory === null ? "lb-col-active" : ""
                    }`}
                  >
                    OVERALL
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((sys) => (
                  <tr key={sys.id}>
                    <td className="lb-cell-system">
                      <div className="lb-sys-name">{sys.name}</div>
                      <div className="lb-sys-meta">
                        <span className="lb-sys-cat">{sys.category}</span>
                        <span className="lb-sys-date">
                          Eval: {sys.lastEvaluated}
                        </span>
                      </div>
                    </td>
                    {TAXONOMY_COLS.map((col) => (
                      <td
                        key={col.key}
                        className={`lb-cell-score ${
                          activeCategory === col.key ? "lb-col-active" : ""
                        }`}
                      >
                        <span
                          className={`scorecard-badge ${getBadgeClass(
                            sys.scores[col.key]
                          )}`}
                        >
                          {sys.scores[col.key]}
                        </span>
                      </td>
                    ))}
                    <td
                      className={`lb-cell-score ${
                        activeCategory === null ? "lb-col-active" : ""
                      }`}
                    >
                      <span
                        className={`scorecard-badge ${getBadgeClass(
                          sys.overall
                        )}`}
                      >
                        {sys.overall}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredAndSortedData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="lb-empty">
                      No systems match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* ── Legend & Footer Notes ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="leaderboard-footer"
          >
            <div className="leaderboard-legend">
              <span className="scorecard-badge scorecard-badge--pass">
                80-100 PASS
              </span>
              <span className="scorecard-badge scorecard-badge--warn">
                50-79 WARN
              </span>
              <span className="scorecard-badge scorecard-badge--fail">
                0-49 FAIL
              </span>
            </div>
            <p className="leaderboard-disclaimer">
              Scores reflect adversarial testing behavior, not clinical diagnostic
              accuracy. Methodology:{" "}
              <Link href="/how-it-works" className="section-link lb-inline-link">
                /how-it-works
              </Link>
            </p>
            <div className="leaderboard-submit">
              <Link href="/contribute" className="cta-button">
                Submit your system
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
