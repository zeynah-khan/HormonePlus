import React, { useCallback, useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { getSymptomLogs } from "../../../model/storage";
import { getCurrentStreak } from "../../../controller/logStreak";

function formatLatestSelections(log) {
  if (!log?.selections) return [];

  return Object.entries(log.selections)
    .filter(([, values]) => values.length > 0)
    .slice(0, 3)
    .map(([category, values]) => `${category}: ${values.join(", ")}`);
}

export default function Home({ navigation }) {
  const [logs, setLogs] = useState([]);
  const [latestLog, setLatestLog] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedLogs = await getSymptomLogs();
          setLogs(storedLogs);
          setLatestLog(storedLogs[0] || null);
        } catch (error) {
          console.error("Error loading app data:", error);
        }
      };

      loadData();
    }, [])
  );

  const streak = getCurrentStreak(logs);
  const latestSelections = formatLatestSelections(latestLog);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Here’s your quick tracking overview.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tracking streak</Text>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.cardText}>
              {streak === 0
                ? "Log today to begin building a consistent picture over time."
                : streak === 1
                ? "You’ve logged symptoms for 1 day in a row."
                : `You’ve logged symptoms for ${streak} days in a row.`}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>How are you feeling today?</Text>
            <Text style={styles.cardText}>
              Check in with your symptoms, mood, and energy levels to build a
              clearer picture of your health.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Log")}
            >
              <Text style={styles.primaryButtonText}>Log your symptoms</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Latest check-in</Text>

            {!latestLog ? (
              <Text style={styles.cardText}>
                No entries yet. Once you save a symptom log, your most recent
                check-in will appear here.
              </Text>
            ) : (
              <>
                <Text style={styles.softText}>Date: {latestLog.date}</Text>
                {latestSelections.map((entry) => (
                  <Text key={entry} style={styles.softText}>
                    • {entry}
                  </Text>
                ))}
                {!!latestLog.notes && (
                  <Text style={styles.cardText}>Notes: {latestLog.notes}</Text>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  title: {
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colours.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colours.border,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 8,
  },
  cardText: {
    ...typography.bodySmall,
    color: colours.textSecondary,
    marginBottom: 12,
    lineHeight: 24,
  },
  softText: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 8,
    lineHeight: 24,
    textTransform: "capitalize",
  },
  streakNumber: {
    fontSize: 40,
    fontWeight: "700",
    color: colours.primary,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    ...typography.button,
    color: colours.white,
  },
});
// final commit :)