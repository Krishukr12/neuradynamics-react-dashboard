module.exports = {
  theme: {
    extend: {
      animationDelay: {
        200: "200ms",
        400: "400ms",
        600: "600ms",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
};
