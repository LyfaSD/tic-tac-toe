import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "react-native";

import {
  AppThemeProvider,
  useAppTheme,
} from "@/contexts/theme-context";

function AppDrawer() {
  const { theme, colors } = useAppTheme();

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        animated
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text, fontWeight: "700" },
          headerShadowVisible: false,
          sceneStyle: { backgroundColor: colors.background },
          drawerStyle: { backgroundColor: colors.surface },
          drawerActiveTintColor: colors.accent,
          drawerInactiveTintColor: colors.text,
          drawerActiveBackgroundColor: colors.surfaceAlt,
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "Game", title: "Game" }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: "Settings", title: "Settings" }}
        />
        <Drawer.Screen
          name="about"
          options={{ drawerLabel: "About", title: "About" }}
        />
      </Drawer>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppDrawer />
    </AppThemeProvider>
  );
}
