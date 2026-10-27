import { StyleSheet, Switch, Text, View } from "react-native";

import { useAppTheme } from "@/contexts/theme-context";

export default function SettingsScreen() {
  const { theme, colors, setTheme } = useAppTheme();
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.setting,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.settingCopy}>
          <Text style={[styles.title, { color: colors.text }]}>Dark theme</Text>
          <Text style={[styles.description, { color: colors.muted }]}>
            Current theme: {isDark ? "Dark" : "Light"}
          </Text>
        </View>
        <Switch
          accessibilityLabel="Enable dark theme"
          value={isDark}
          onValueChange={(enabled) => setTheme(enabled ? "dark" : "light")}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={colors.surface}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  setting: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  settingCopy: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
});
