"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

/* ─── Compliance Data ─── */
const COMPLIANCE_ROWS = [
  {
    article: "Article 9",
    title: "Risk management system",
    desc: "Repeatable adversarial testing methodology, usable as documented evidence.",
  },
  {
    article: "Article 12",
    title: "Record-keeping",
    desc: "Every run produces an append-only, versioned audit log.",
  },
  {
    article: "Article 15",
    title: "Accuracy, robustness, cybersecurity",
    desc: "Direct robustness testing against adversarial and injection attacks.",
  },
];

/* ─── FAQ Data ─── */
const FAQS = [
  {
    q: "Does a good score mean this system is clinically safe to deploy?",
    a: "No. ClinAgent Arena tests safety behavior against adversarial attacks and hallucinations—it does not measure clinical diagnostic accuracy. A high score indicates robust defensive guardrails, but it is not a substitute for regulatory certification (e.g., FDA clearance, CE mark) or rigorous clinical trials.",
  },
  {
    q: "Who reviews new attack categories?",
    a: "New attack categories submitted via pull request undergo peer review by a steering committee of clinical informaticians, AI safety researchers, and practicing clinicians. Categories are evaluated for clinical realism, reproducibility, and distinctness from existing taxonomy nodes before being merged into a numbered release.",
  },
  {
    q: "Can I self-host the evaluation engine privately?",
    a: "Yes. The entire ClinAgent Arena evaluation engine, including the attacker and judge components, is open-source. You can run the CLI locally or within your own VPC to evaluate proprietary models or sensitive data without sending anything to our servers.",
  },
];

/* ─── FAQ Accordion Component ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="faq-q-text">{q}</span>
        <span
          className="faq-icon"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
            }
            className="faq-answer-container"
          >
            <div className="faq-answer-content">
              <p>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CompliancePage() {
  const shouldReduceMotion = useReducedMotion();
  const adjustedStagger = shouldReduceMotion ? { hidden: {}, visible: {} } : stagger;
  const adjustedFade = shouldReduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;

  return (
    <main>
      {/* ================================================================
          SECTION 1 — HEADER
          ================================================================ */}
      <section className="compliance-section">
        <motion.div
          className="section-inner"
          variants={adjustedStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div className="compliance-header" variants={adjustedFade}>
            <span className="hero-eyebrow">WHY IT MAPS TO COMPLIANCE</span>
            <h1 className="compliance-h1">
              Built against EU AI Act obligations, not just good intentions.
            </h1>
          </motion.div>

          {/* ================================================================
              SECTION 2 — REGULATORY TABLE
              ================================================================ */}
          <motion.div className="compliance-table-wrapper" variants={adjustedFade}>
            <table className="hiw-rubric-table compliance-table">
              <thead>
                <tr>
                  <th>EU AI Act Requirement</th>
                  <th>Arena Capability</th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_ROWS.map((row) => (
                  <tr key={row.article}>
                    <td className="compliance-article-cell">
                      <span className="compliance-article">{row.article}</span>
                      <span className="compliance-title">{row.title}</span>
                    </td>
                    <td className="compliance-desc-cell">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* ================================================================
              SECTION 3 — FAQ ACCORDION
              ================================================================ */}
          <motion.div className="compliance-faq-section" variants={adjustedFade}>
            <h2 className="section-label compliance-faq-label">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="faq-list">
              {FAQS.map((faq, index) => (
                <FAQItem key={index} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
