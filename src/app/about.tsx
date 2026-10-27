import { StyleSheet, Text, View } from "react-native";

import appConfig from "../../app.json";
import { useAppTheme } from "@/contexts/theme-context";

const authorName = "Lyfa";

export default function AboutScreen() {
  const { colors } = useAppTheme();
  const { name, version } = appConfig.expo;

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.appName, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.detail, { color: colors.muted }]}>
          Version {version}
        </Text>
        <Text style={[styles.detail, { color: colors.muted }]}>
          By {authorName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
  },
  detail: {
    fontSize: 16,
    marginTop: 10,
  },
});
