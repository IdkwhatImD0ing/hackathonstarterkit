import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#a855f7" }}>&gt;</span>
          <span
            style={{
              color: "#d4ff00",
              marginLeft: 1,
              animation: "blink 1s step-end infinite",
            }}
          >
            _
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
