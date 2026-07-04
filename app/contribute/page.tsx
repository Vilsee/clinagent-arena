"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* ─── Animation helpers ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

export default function ContributePage() {
  const shouldReduceMotion = useReducedMotion();
  const adjustedStagger = shouldReduceMotion ? { hidden: {}, visible: {} } : stagger;
  const adjustedFade = shouldReduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;

  return (
    <main>
      <section className="contribute-section">
        <motion.div
          className="section-inner"
          variants={adjustedStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* ── Page Header ── */}
          <motion.div className="contribute-header" variants={adjustedFade}>
            <span className="hero-eyebrow">GET INVOLVED</span>
            <h1 className="contribute-h1">
              Score your agent, or add a category.
            </h1>
          </motion.div>

          {/* ── Side-by-side Cards ── */}
          <motion.div className="contribute-grid" variants={adjustedFade}>
            {/* Card A: Run an evaluation */}
            <div className="contribute-card">
              <h2 className="contribute-card-title">Run an evaluation</h2>
              <div className="contribute-steps">
                <div className="contribute-step">
                  <span className="contribute-step-num">1</span>
                  <div className="contribute-step-content">
                    <p>Install the evaluation CLI package:</p>
                    <div className="inline-code-block">
                      <code>pip install clinagent-eval</code>
                    </div>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">2</span>
                  <div className="contribute-step-content">
                    <p>
                      Write an adapter script linking your agent&apos;s API/inference
                      method to the evaluator interface.
                    </p>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">3</span>
                  <div className="contribute-step-content">
                    <p>Run the local evaluation suite against your agent:</p>
                    <div className="inline-code-block">
                      <code>clinagent-eval run --target my_adapter.py</code>
                    </div>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">4</span>
                  <div className="contribute-step-content">
                    <p>
                      (Optional) Submit your JSON scorecard output via pull request
                      to get added to the public Leaderboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B: Propose an attack category */}
            <div className="contribute-card">
              <h2 className="contribute-card-title">Propose an attack category</h2>
              <div className="contribute-steps">
                <div className="contribute-step">
                  <span className="contribute-step-num">1</span>
                  <div className="contribute-step-content">
                    <p>Fork the ClinAgent Arena repository on GitHub.</p>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">2</span>
                  <div className="contribute-step-content">
                    <p>
                      Add a new category definition, at least 50 seed prompts, and
                      a judging rubric to the taxonomy dataset directory.
                    </p>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">3</span>
                  <div className="contribute-step-content">
                    <p>
                      Open a pull request outlining the clinical rationale for this
                      adversarial vector.
                    </p>
                  </div>
                </div>

                <div className="contribute-step">
                  <span className="contribute-step-num">4</span>
                  <div className="contribute-step-content">
                    <p>
                      Await peer review from our steering committee as per the
                      process outlined in the{" "}
                      <Link href="/compliance" className="section-link lb-inline-link">
                        FAQ
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Footer Callout ── */}
          <motion.div className="contribute-footer" variants={adjustedFade}>
            <div className="contribute-callout">
              <p>Questions or want to co-maintain? Open a discussion on GitHub.</p>
              <a
                href="https://github.com/vilsee/clinagent-arena"
                target="_blank"
                rel="noopener noreferrer"
                className="github-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="github-icon"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Discussions
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
