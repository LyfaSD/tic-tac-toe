import React from "react";

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentContrast: string;
  x: string;
  o: string;
};

const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#E2E8F0",
    text: "#0F172A",
    muted: "#475569",
    border: "#CBD5E1",
    accent: "#2563EB",
    accentContrast: "#FFFFFF",
    x: "#B91C1C",
    o: "#1D4ED8",
  },
  dark: {
    background: "#0B1220",
    surface: "#111B2E",
    surfaceAlt: "#1E293B",
    text: "#F8FAFC",
    muted: "#CBD5E1",
    border: "#475569",
    accent: "#60A5FA",
    accentContrast: "#0B1220",
    x: "#FDA4AF",
    o: "#93C5FD",
  },
};

type AppThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

const AppThemeContext = React.createContext<AppThemeContextValue | undefined>(
  undefined,
);

export function AppThemeProvider({
  children,
}: React.PropsWithChildren) {
  const [theme, setTheme] = React.useState<ThemeMode>("light");
  const value = React.useMemo(
    () => ({ theme, colors: themeColors[theme], setTheme }),
    [theme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme(): AppThemeContextValue {
  const context = React.useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider.");
  }
  return context;
}
