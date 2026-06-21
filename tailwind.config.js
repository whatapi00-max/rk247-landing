/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#000000",
          900: "#070707",
          850: "#0c0c0c",
          800: "#111111",
          750: "#161616",
          700: "#1c1c1c",
          600: "#262626",
        },
        rk: {
          green: "#15e372",
          greenBright: "#33ff7a",
          greenDeep: "#0bbf5c",
          glow: "#1fdb6e",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        "green-glow": "0 0 60px 0 rgba(21, 227, 114, 0.45)",
        "green-soft": "0 0 120px 20px rgba(21, 227, 114, 0.25)",
        card: "0 10px 40px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(circle at 50% 60%, rgba(21,227,114,0.55) 0%, rgba(21,227,114,0.12) 30%, rgba(0,0,0,0) 65%)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "spin-slow": "spinSlow 20s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
