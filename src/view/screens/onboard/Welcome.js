import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";

export default function Welcome({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          A hormonal health space designed for reflection, understanding, and
          support beyond fertility-focused tracking!
        </Text>
        <Text style={styles.body}>TBC...</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Intentions")}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...typography.titleLarge,
    color: colours.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    ...typography.subtitle,
    color: colours.textSecondary,
    marginBottom: 16,
    textAlign: "center",
  },
  body: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 28,
    textAlign: "center",
  },
  button: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
  },
  buttonText: {
    ...typography.button,
    color: colours.white,
  },
});
// final commit :)