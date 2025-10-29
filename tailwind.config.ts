import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px"
      }
    },
    extend: {
      colors: {
        brand: "var(--color-brand)",
        "brand-foreground": "var(--color-brand-foreground)",
        ink: "var(--color-ink)",
        "muted-ink": "var(--color-muted-ink)",
        bg: "var(--color-bg)",
        "bg-soft": "var(--color-bg-soft)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        ring: "var(--color-ring)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        card: "0px 20px 40px rgba(22, 25, 79, 0.08)",
        soft: "0px 10px 20px rgba(22, 25, 79, 0.06)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;
