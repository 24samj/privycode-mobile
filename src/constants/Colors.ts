import { DefaultTheme, Theme } from "@react-navigation/native";
import { vars } from "nativewind";

export type CustomColors = {
  disabled: string;
  borderSecondary: string;
  textNegative: string;
  textAccent: string;
  textExtra: string;
  textDanger: string;
  background: string;
  accentPrimary: string;
  accentSecondary: string;
  accentWarning: string;
  warning: string;
  error: string;
  success: string;
  icon: string;
  iconNegative: string;
  iconExtra: string;
} & typeof DefaultTheme.colors;

export type AppTheme = Theme & {
  colors: CustomColors;
};

export const LightTheme: AppTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6B46C1", // Royal purple
    border: "#E5E7EB",
    borderSecondary: "#D1D5DB",
    text: "#111827", // Near black for excellent readability
    card: "#FFFFFF",
    icon: "#374151",
    iconNegative: "#FFFFFF",
    iconExtra: "#6B7280",
    disabled: "#D1D5DB",
    textNegative: "#FFFFFF",
    textAccent: "#6B46C1", // Royal purple
    textExtra: "#6B7280", // Neutral gray
    textDanger: "#DC2626", // Clean red
    background: "#FAFAFA", // Ultra-light gray
    accentPrimary: "#F3F4F6", // Subtle background accent
    accentSecondary: "#F9FAFB", // Even lighter accent
    accentWarning: "#FFFBEB", // Warm cream
    warning: "#F59E0B", // Amber
    error: "#DC2626", // Clean red
    success: "#059669", // Emerald green
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
};

export const DarkTheme: AppTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8B5CF6", // Brighter royal purple for dark mode
    border: "#374151",
    borderSecondary: "#4B5563",
    text: "#F9FAFB", // Clean white
    card: "#1F2937", // Dark slate
    icon: "#E5E7EB",
    iconNegative: "#1F2937",
    iconExtra: "#9CA3AF",
    disabled: "#6B7280",
    textNegative: "#1F2937",
    textAccent: "#8B5CF6", // Brighter royal purple
    textExtra: "#9CA3AF", // Muted gray
    textDanger: "#F87171", // Soft red
    background: "#0F172A", // Deep slate
    accentPrimary: "#272F3CFF", // Dark with subtle warmth
    accentSecondary: "#334155", // Lighter dark accent
    accentWarning: "#451A03", // Dark amber
    warning: "#FBBF24", // Bright amber
    error: "#F87171", // Soft red
    success: "#34D399", // Bright emerald
  },
  fonts: {
    ...DefaultTheme.fonts,
  },
};

export const themes = {
  light: vars({
    "--color-primary": "#6B46C1",
    "--color-border": "#E5E7EB",
    "--color-border-secondary": "#D1D5DB",
    "--color-text": "#111827",
    "--color-card": "#FFFFFF",
    "--color-icon": "#374151",
    "--color-icon-negative": "#FFFFFF",
    "--color-icon-extra": "#6B7280",
    "--color-disabled": "#D1D5DB",
    "--color-text-negative": "#FFFFFF",
    "--color-text-accent": "#6B46C1",
    "--color-text-extra": "#6B7280",
    "--color-text-danger": "#DC2626",
    "--color-background": "#FAFAFA",
    "--color-accent-primary": "#F3F4F6",
    "--color-accent-secondary": "#F9FAFB",
    "--color-accent-warning": "#FFFBEB",
    "--color-warning": "#F59E0B",
    "--color-error": "#DC2626",
    "--color-success": "#059669",
  }),
  dark: vars({
    "--color-primary": "#8B5CF6",
    "--color-border": "#374151",
    "--color-border-secondary": "#4B5563",
    "--color-text": "#F9FAFB",
    "--color-card": "#1F2937",
    "--color-icon": "#E5E7EB",
    "--color-icon-negative": "#1F2937",
    "--color-icon-extra": "#9CA3AF",
    "--color-disabled": "#6B7280",
    "--color-text-negative": "#1F2937",
    "--color-text-accent": "#8B5CF6",
    "--color-text-extra": "#9CA3AF",
    "--color-text-danger": "#F87171",
    "--color-background": "#0F172A",
    "--color-accent-primary": "#272F3CFF",
    "--color-accent-secondary": "#334155",
    "--color-accent-warning": "#451A03",
    "--color-warning": "#FBBF24",
    "--color-error": "#F87171",
    "--color-success": "#34D399",
  }),
};
