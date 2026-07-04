"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Crosshair, Bot, ShieldCheck, AlertTriangle, FileCode2, Users } from "lucide-react";
import ScorecardPreview from "@/components/ScorecardPreview";
import SplineBackground from "@/components/SplineBackground";

/* ─── Scroll-reveal helpers ─── */
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};


/* ─── Pipeline steps data ─── */
const PIPELINE_STEPS = [
  {
    num: "01",
    label: "ATTACKER",
    desc: "An automated red-team agent crafts adversarial clinical prompts — unsafe dosage requests, injection payloads hidden in clinical notes, bias-triggering demographics.",
    icon: <Crosshair size={16} className="text-danger" />,
  },
  {
    num: "02",
    label: "TARGET",
    desc: "The clinical AI agent under test receives each attack in a sandboxed environment and produces its response, exactly as it would in production.",
    icon: <Bot size={16} className="text-accent" />,
  },
  {
    num: "03",
    label: "JUDGE",
    desc: "An LLM-based judge scores each response against the taxonomy rubric, producing pass / warn / fail verdicts with numeric confidence scores.",
    icon: <ShieldCheck size={16} className="text-warning" />,
  },
];

/* ─── Taxonomy preview data ─── */
const TAXONOMY_CARDS = [
  {
    num: "01",
    title: "Unsafe Clinical Advice",
    desc: "Dangerous dosage recommendations, contraindicated treatments, and clinically inappropriate guidance.",
    icon: <AlertTriangle size={16} className="text-danger" />,
  },
  {
    num: "02",
    title: "Prompt Injection Attacks",
    desc: "Adversarial payloads injected through clinical notes, lab results, or patient history fields.",
    icon: <FileCode2 size={16} className="text-accent" />,
  },
  {
    num: "03",
    title: "Demographic Bias",
    desc: "Systematic performance deltas across patient demographics — race, age, sex, and socioeconomic proxies.",
    icon: <Users size={16} className="text-warning" />,
  },
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const adjustedStagger = shouldReduceMotion ? { hidden: {}, visible: {} } : staggerContainer;
  const adjustedFade = shouldReduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : childFade;

  return (
    <main>
      {/* ================================================================
          SECTION 1 — HERO
          ================================================================ */}
      {/* Fixed 3D Spline Background */}
      <SplineBackground 
        scene="https://prod.spline.design/k45B0EK8J3PQFe3y/scene.splinecode"
        scrimOpacity={0.8}
      />
      <section className="hero-section">

        <motion.div
          className="section-inner hero-grid"
          variants={adjustedStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Copy */}
          <div className="hero-content">
            <motion.span className="hero-eyebrow" variants={adjustedFade}>
              OPEN-SOURCE · CLINICAL AI SAFETY
            </motion.span>
            <motion.h1 className="hero-h1" variants={adjustedFade}>
              A public safety record for every{" "}
              <span className="hero-h1-accent">clinical AI agent.</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={adjustedFade}>
              Security had CVE. Clinical AI has nothing — until now. ClinAgent
              Arena adversarially red-teams clinical LLMs and agent systems
              against a shared attack taxonomy, then publishes the results.
            </motion.p>
            <motion.div className="hero-ctas" variants={adjustedFade}>
              <Link href="/demo" className="cta-button">
                Run your first eval
              </Link>
              <Link href="/how-it-works" className="cta-button cta-secondary">
                See how scoring works
              </Link>
            </motion.div>
          </div>

          {/* Right: Scorecard */}
          <motion.div className="hero-preview" variants={adjustedFade}>
            <ScorecardPreview />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          SECTION 2 — PIPELINE
          ================================================================ */}
      <section className="pipeline-section">
        <motion.div
          className="section-inner"
          variants={adjustedStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h2 className="section-label" variants={adjustedFade}>
            HOW IT WORKS
          </motion.h2>

          <motion.div className="pipeline-row" variants={adjustedFade}>
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.num} className="pipeline-card-wrapper">
                <div className="pipeline-card">
                  <div className="pipeline-icon-wrap">
                    <span className="pipeline-num">{step.num}</span>
                    {step.icon}
                  </div>
                  <h3 className="pipeline-title">{step.label}</h3>
                  <p className="pipeline-desc">{step.desc}</p>
                </div>

                {/* Arrow connector (not after last card) */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <span className="pipeline-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={adjustedFade}>
            <Link href="/how-it-works" className="section-link">
              Read the full methodology →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          SECTION 3 — TAXONOMY
          ================================================================ */}
      <section className="taxonomy-section">
        <motion.div
          className="section-inner"
          variants={adjustedStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.h2 className="section-label" variants={adjustedFade}>
            ATTACK TAXONOMY
          </motion.h2>

          <motion.div className="taxonomy-grid" variants={adjustedFade}>
            {TAXONOMY_CARDS.map((card) => (
              <div key={card.num} className="taxonomy-card">
                <div className="taxonomy-card-header">
                  <span className="taxonomy-num">{card.num}</span>
                  {card.icon}
                </div>
                <h3 className="taxonomy-title">{card.title}</h3>
                <p className="taxonomy-desc">{card.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={childFade}>
            <Link href="/taxonomy" className="section-link">
              View all 6 categories →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          SECTION 4 — CTA BAND
          ================================================================ */}
      <motion.section
        className="cta-band"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="section-inner cta-band-inner">
          <h2 className="cta-band-heading">
            Score your agent before someone else does.
          </h2>

          <div className="cta-install-box">
            <span className="cta-install-prompt">$</span>
            <span className="cta-install-cmd">pip install clinagent-eval</span>
          </div>

          <Link href="/demo" className="cta-button cta-band-button">
            Get started
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
