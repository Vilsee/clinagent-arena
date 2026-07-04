"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { DEMO_SCENARIOS, DemoScenario } from "@/lib/demo-scenarios";
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

type RunStage = "IDLE" | "ATTACKER" | "TARGET" | "JUDGE" | "COMPLETE";

export default function DemoPage() {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario>(
    DEMO_SCENARIOS[0]
  );
  const [stage, setStage] = useState<RunStage>("IDLE");
  const shouldReduceMotion = useReducedMotion();
  const adjustedFade = shouldReduceMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;

  // Typewriter effect states
  const [typedAttacker, setTypedAttacker] = useState("");
  const [typedTarget, setTypedTarget] = useState("");
  const [typedJudge, setTypedJudge] = useState("");

  /* ─── Runner Logic ─── */
  const runEvaluation = () => {
    if (stage !== "IDLE" && stage !== "COMPLETE") return;

    // Reset states
    setStage("ATTACKER");
    setTypedAttacker("");
    setTypedTarget("");
    setTypedJudge("");

    // Start sequence
    setTimeout(() => {
      setStage("TARGET");
    }, 1500);

    setTimeout(() => {
      setStage("JUDGE");
    }, 3000);

    setTimeout(() => {
      setStage("COMPLETE");
    }, 4500);
  };

  /* ─── Typewriter Effects ─── */
  // Attacker
  useEffect(() => {
    if (stage !== "ATTACKER" && stage !== "TARGET" && stage !== "JUDGE" && stage !== "COMPLETE") return;
    
    // Quick and dirty typewriter effect: reveal characters over time
    let i = 0;
    const text = selectedScenario.attackerPrompt;
    const speed = 1000 / text.length; // target ~1000ms total
    
    const interval = setInterval(() => {
      setTypedAttacker(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [stage, selectedScenario]);

  // Target
  useEffect(() => {
    if (stage !== "TARGET" && stage !== "JUDGE" && stage !== "COMPLETE") return;
    
    let i = 0;
    const text = selectedScenario.targetResponse;
    const speed = 1000 / text.length;
    
    const interval = setInterval(() => {
      setTypedTarget(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [stage, selectedScenario]);

  // Judge
  useEffect(() => {
    if (stage !== "JUDGE" && stage !== "COMPLETE") return;
    
    let i = 0;
    const text = selectedScenario.judgeReasoning;
    const speed = 1000 / text.length;
    
    const interval = setInterval(() => {
      setTypedJudge(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [stage, selectedScenario]);


  /* ─── Render Helpers ─── */
  const getBadgeClass = (verdict: string) => {
    if (verdict === "PASS") return "scorecard-badge--pass";
    if (verdict === "WARN") return "scorecard-badge--warn";
    return "scorecard-badge--fail";
  };

  const isStageActive = (s: RunStage) => {
    if (stage === "COMPLETE") return true;
    if (stage === "JUDGE" && (s === "ATTACKER" || s === "TARGET" || s === "JUDGE")) return true;
    if (stage === "TARGET" && (s === "ATTACKER" || s === "TARGET")) return true;
    if (stage === "ATTACKER" && s === "ATTACKER") return true;
    return false;
  };

  const isStageComplete = (s: RunStage) => {
    if (stage === "COMPLETE") return true;
    if (stage === "JUDGE" && (s === "ATTACKER" || s === "TARGET")) return true;
    if (stage === "TARGET" && s === "ATTACKER") return true;
    return false;
  };

  return (
    <main>
      {/* Fixed 3D Spline Background */}
      <SplineBackground 
        scene="https://prod.spline.design/Gm3w5y9PlH-znEYP/scene.splinecode"
        scrimOpacity={0.85}
      />
      <section className="demo-section">
        <div className="section-inner">
          {/* ── Page Header ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="demo-header"
          >
            <span className="hero-eyebrow">LIVE DEMO</span>
            <h1 className="demo-h1">Watch an evaluation run.</h1>
            <p className="demo-sub">
              This is a simulated evaluation using pre-built adversarial scenarios.
              It visually demonstrates the three-stage ClinAgent Arena pipeline so
              you can understand how the scoring mechanics work without connecting
              your own agent.
            </p>
          </motion.div>

          {/* ── Scenario Picker ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="demo-scenario-picker"
          >
            <h2 className="demo-picker-label">SELECT A SCENARIO:</h2>
            <div className="demo-picker-grid">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  className={`demo-scenario-card ${
                    selectedScenario.id === scenario.id
                      ? "demo-scenario-card--active"
                      : ""
                  }`}
                  onClick={() => {
                    if (stage !== "IDLE" && stage !== "COMPLETE") return; // block switching while running
                    setSelectedScenario(scenario);
                    setStage("IDLE");
                  }}
                  disabled={stage !== "IDLE" && stage !== "COMPLETE"}
                >
                  <span className="demo-scenario-tag">
                    {scenario.categoryTag}
                  </span>
                  <h3 className="demo-scenario-title">
                    {scenario.categoryName}
                  </h3>
                  <p className="demo-scenario-desc">{scenario.description}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Demo Runner ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={adjustedFade}
            className="demo-runner-container"
          >
            {/* Stepper */}
            <div className="demo-stepper">
              <div
                className={`demo-step ${
                  isStageActive("ATTACKER") ? "demo-step--active" : ""
                } ${isStageComplete("ATTACKER") ? "demo-step--complete" : ""}`}
              >
                <div className="demo-step-indicator">1</div>
                <span className="demo-step-label">Attacker</span>
              </div>
              <div className="demo-step-line"></div>
              <div
                className={`demo-step ${
                  isStageActive("TARGET") ? "demo-step--active" : ""
                } ${isStageComplete("TARGET") ? "demo-step--complete" : ""}`}
              >
                <div className="demo-step-indicator">2</div>
                <span className="demo-step-label">Target</span>
              </div>
              <div className="demo-step-line"></div>
              <div
                className={`demo-step ${
                  isStageActive("JUDGE") ? "demo-step--active" : ""
                } ${isStageComplete("JUDGE") ? "demo-step--complete" : ""}`}
              >
                <div className="demo-step-indicator">3</div>
                <span className="demo-step-label">Judge</span>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="demo-terminal">
              <div className="demo-terminal-chrome">
                <div className="demo-terminal-dots">
                  <div className="demo-terminal-dot"></div>
                  <div className="demo-terminal-dot"></div>
                  <div className="demo-terminal-dot"></div>
                </div>
                <span className="demo-terminal-filename">
                  clinagent-eval run
                </span>
              </div>

              <div className="demo-terminal-body">
                {(stage === "IDLE" || stage === "COMPLETE") && (
                  <div className="demo-run-cta">
                    <button
                      className="cta-button demo-run-btn"
                      onClick={runEvaluation}
                    >
                      {stage === "COMPLETE" ? "Run Again" : "Run Evaluation"}
                    </button>
                    {stage === "COMPLETE" && (
                      <p className="demo-run-note">
                        This is a simulated run against a fixed scenario. Real
                        evaluations call your own agent via the clinagent-eval
                        CLI — see{" "}
                        <Link href="/how-it-works" className="section-link lb-inline-link">
                          /how-it-works
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {/* ATTACKER STAGE */}
                  {isStageActive("ATTACKER") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="demo-block demo-block-attacker"
                    >
                      <div className="demo-block-header">
                        <span className="demo-block-label attacker-label">
                          ATTACKER
                        </span>
                        <span className="demo-block-status">
                          {isStageComplete("ATTACKER")
                            ? "Generated case"
                            : "Generating adversarial case..."}
                        </span>
                      </div>
                      <div className="demo-code-box">
                        <pre>
                          <code>{typedAttacker}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}

                  {/* TARGET STAGE */}
                  {isStageActive("TARGET") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="demo-block demo-block-target"
                    >
                      <div className="demo-block-header">
                        <span className="demo-block-label target-label">
                          TARGET
                        </span>
                        <span className="demo-block-status">
                          {isStageComplete("TARGET")
                            ? "Response received"
                            : "Target system responding..."}
                        </span>
                      </div>
                      <div className="demo-chat-bubble">
                        <p>{typedTarget}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* JUDGE STAGE */}
                  {isStageActive("JUDGE") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="demo-block demo-block-judge"
                    >
                      <div className="demo-block-header">
                        <span className="demo-block-label judge-label">
                          JUDGE
                        </span>
                        <span className="demo-block-status">
                          {isStageComplete("JUDGE")
                            ? "Scoring complete"
                            : "Judge scoring the exchange..."}
                        </span>
                      </div>
                      <div className="demo-scorecard-result">
                        <div className="demo-score-row">
                          <span className="demo-score-label">Verdict:</span>
                          <span
                            className={`scorecard-badge ${getBadgeClass(
                              selectedScenario.judgeVerdict
                            )}`}
                          >
                            {selectedScenario.judgeVerdict}
                          </span>
                        </div>
                        <div className="demo-score-row">
                          <span className="demo-score-label">Score:</span>
                          <span className="demo-score-number">
                            {selectedScenario.judgeScore}
                          </span>
                        </div>
                        <div className="demo-score-reasoning">
                          <strong>Reasoning:</strong> {typedJudge}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
