import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 100,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#a855f7" }}>&gt;</span>
          <span style={{ color: "#d4ff00", marginLeft: 2 }}>_</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
