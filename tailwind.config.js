/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-mode-background-bg-primary":
          "var(--color-mode-background-bg-primary)",
        "color-mode-background-bg-primary-inverese":
          "var(--color-mode-background-bg-primary-inverese)",
        "color-mode-border-border-primary-muted":
          "var(--color-mode-border-border-primary-muted)",
        "color-mode-border-border-secondary-muted":
          "var(--color-mode-border-border-secondary-muted)",
        "color-mode-surface-surface-secondary":
          "var(--color-mode-surface-surface-secondary)",
        "color-mode-text-text-secondary":
          "var(--color-mode-text-text-secondary)",
        "primitives-color-blue-100": "var(--primitives-color-blue-100)",
        "primitives-color-blue-200": "var(--primitives-color-blue-200)",
        "primitives-color-blue-400": "var(--primitives-color-blue-400)",
        "primitives-color-blue-500": "var(--primitives-color-blue-500)",
        "primitives-color-blue-600": "var(--primitives-color-blue-600)",
        "primitives-color-blue-800": "var(--primitives-color-blue-800)",
        "primitives-color-cool-gray-100":
          "var(--primitives-color-cool-gray-100)",
        "primitives-color-cool-gray-100-duplicate":
          "var(--primitives-color-cool-gray-100-duplicate)",
        "primitives-color-cool-gray-400":
          "var(--primitives-color-cool-gray-400)",
        "primitives-color-cool-gray-500":
          "var(--primitives-color-cool-gray-500)",
        "primitives-color-cool-gray-600":
          "var(--primitives-color-cool-gray-600)",
        "theme-accent-100": "var(--theme-accent-100)",
        "theme-accent-200": "var(--theme-accent-200)",
        "theme-accent-400": "var(--theme-accent-400)",
        "theme-accent-500": "var(--theme-accent-500)",
        "theme-accent-600": "var(--theme-accent-600)",
        "theme-accent-800": "var(--theme-accent-800)",
      },
      fontFamily: {
        "display-medium": "var(--display-medium-font-family)",
        "heading-small": "var(--heading-small-font-family)",
        "heading-x-large": "var(--heading-x-large-font-family)",
        "label-large": "var(--label-large-font-family)",
        "label-medium": "var(--label-medium-font-family)",
        "label-small": "var(--label-small-font-family)",
        "paragraph-large": "var(--paragraph-large-font-family)",
        "paragraph-medium": "var(--paragraph-medium-font-family)",
        "paragraph-small": "var(--paragraph-small-font-family)",
      },
    },
  },
  plugins: [],
};
