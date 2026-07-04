import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "ClinAgent Arena";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0E14", // ink
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#35C48C", // safe green
              marginRight: "20px",
              boxShadow: "0 0 40px #35C48C",
            }}
          />
          <div
            style={{
              fontSize: "48px",
              color: "#D7DEE8", // paper
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: "-0.02em",
            }}
          >
            ClinAgent Arena
          </div>
        </div>

        <div
          style={{
            fontSize: "72px",
            color: "#D7DEE8",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          A public safety record for every{" "}
          <span style={{ color: "#4FD1E8" }}>clinical AI agent.</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
