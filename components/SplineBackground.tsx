"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="spline-loading-fallback" />,
});

export interface SplineBackgroundProps {
  scene: string;
  interactive?: boolean;
  scrimOpacity?: number;
}

export default function SplineBackground({
  scene,
  interactive = false,
  scrimOpacity = 0.7,
}: SplineBackgroundProps) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    // Determine if we should load the Spline scene based on viewport and motion preferences.
    const checkCapabilities = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 640;
      setShouldLoadSpline(!prefersReducedMotion && !isMobile);
    };

    // Initial check
    checkCapabilities();

    // Listen for resize to adjust (if someone resizes the window down, we might want to unmount it for performance)
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkCapabilities();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Return a fallback static background while calculating capabilities or if we shouldn't load Spline
  if (shouldLoadSpline === null || shouldLoadSpline === false) {
    return <div className="bg-grid" aria-hidden="true" />;
  }

  return (
    <div
      className="spline-background-container"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: interactive ? "auto" : "none",
        backgroundColor: "var(--color-ink)", // base background so no white flash
      }}
    >
      {/* The Spline Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Spline scene={scene} />
      </div>

      {/* The Scrim Layer */}
      <div
        className="spline-scrim"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: scrimOpacity,
          background:
            "linear-gradient(to bottom, rgba(10,14,20,0.55) 0%, rgba(10,14,20,0.85) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
