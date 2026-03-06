import { JetBrains_Mono, Outfit, Fira_Code } from "next/font/google";

export const fontDisplay = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const fontCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-code",
  weight: ["400", "500", "600"],
  display: "swap",
});
