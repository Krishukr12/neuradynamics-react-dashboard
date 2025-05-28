module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      animationDelay: {
        200: '200ms',
        400: '400ms',
        600: '600ms',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      animation: {
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
      },
    },
  },
};
