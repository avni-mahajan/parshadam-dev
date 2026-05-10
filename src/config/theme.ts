/**
 * Centralized theme configuration.
 * Note: Actual values are defined in /styles/theme.css as CSS variables.
 * This file provides a type-safe way to access those variables in JS/TS.
 */

export const theme = {
  colors: {
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
    primary: "var(--color-primary)",
    primaryForeground: "var(--color-primary-foreground)",
    secondary: "var(--color-secondary)",
    secondaryForeground: "var(--color-secondary-foreground)",
    muted: "var(--color-muted)",
    mutedForeground: "var(--color-muted-foreground)",
    accent: "var(--color-accent)",
    accentForeground: "var(--color-accent-foreground)",
    destructive: "var(--color-destructive)",
    destructiveForeground: "var(--color-destructive-foreground)",
    border: "var(--color-border)",
    input: "var(--color-input)",
    ring: "var(--color-ring)",
  },
  fonts: {
    sans: "var(--font-sans)",
    heading: "var(--font-heading)",
  },
  radius: {
    lg: "var(--radius-lg)",
    md: "var(--radius-md)",
    sm: "var(--radius-sm)",
  },
  spacing: {
    section: "var(--spacing-section)",
    container: "var(--spacing-container)",
  },
} as const;

export type Theme = typeof theme;
