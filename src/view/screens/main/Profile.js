import React, { useCallback, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { getGoals, getFocusAreas, getOnboardingStatus, clearAllData } from "../../../model/storage";

export default function Profile() {
  const [goals, setGoals] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const [onboarding, setOnboarding] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const storedGoals = await getGoals();
          const storedFocusAreas = await getFocusAreas();
          const onboardingStatus = await getOnboardingStatus();

          setGoals(storedGoals);
          setFocusAreas(storedFocusAreas);
          setOnboarding(onboardingStatus);
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      };

      loadProfileData();
    }, [])
  );

  const handleClearData = () => {
    Alert.alert(
      "Clear all data?",
      "This will remove your symptom logs, goals, focus areas, and onboarding progress.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear all",
          style: "destructive",
          onPress: async () => {
            await clearAllData();
            setGoals([]);
            setFocusAreas([]);
            setOnboarding(null);
            Alert.alert("Done", "Your local app data has been cleared.");
          },
        },
      ]
    );
  };

  const displayName = "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.headerSubtitle}>
            A reflective space for your hormonal health tracking.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Personal</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="person-outline"
                size={20}
                color={colours.textPrimary}
              />
              <Text style={styles.rowLabel}>Name</Text>
            </View>
            <Text style={styles.rowValue}>{displayName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="flag-outline"
                size={20}
                color={colours.textPrimary}
              />
              <Text style={styles.rowLabel}>Goals</Text>
            </View>
            <Text style={styles.rowValue}>
              {goals.length > 0 ? `${goals.length} selected` : "None yet"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="heart-outline"
                size={20}
                color={colours.textPrimary}
              />
              <Text style={styles.rowLabel}>Focus areas</Text>
            </View>
            <Text style={styles.rowValue}>
              {focusAreas.length > 0
                ? `${focusAreas.length} selected`
                : "None yet"}
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Tracking</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colours.textPrimary}
              />
              <Text style={styles.rowLabel}>Setup complete</Text>
            </View>
            <Text style={styles.rowValue}>
              {onboarding?.setupComplete ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>About this app</Text>
          <Text style={styles.aboutText}>
            This app is designed to support users whose experiences are often
            overlooked by fertility-first cycle trackers, including those
            navigating PCOS, PMDD, perimenopause, menopause, and irregular
            cycles.
          </Text>
        </View>

        <Pressable style={styles.dangerButton} onPress={handleClearData}>
          <Ionicons name="trash-outline" size={18} color={colours.white} />
          <Text style={styles.dangerButtonText}>Clear local data</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: colours.primary,
    borderRadius: 28,
    padding: 24,
    marginBottom: 18,
    alignItems: "center",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: colours.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  avatarText: {
    color: colours.white,
    fontSize: 30,
    fontWeight: "700",
  },
  greeting: {
    ...typography.titleMedium,
    color: colours.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    ...typography.body,
    color: colours.white,
    textAlign: "center",
    opacity: 0.95,
  },
  infoCard: {
    backgroundColor: colours.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colours.border,
    flexDirection: "row",
    gap: 14,
  },
  infoIconWrap: {
    paddingTop: 2,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    ...typography.bodySmall,
    color: colours.textMuted,
    lineHeight: 22,
  },
  sectionCard: {
    backgroundColor: colours.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colours.border,
  },
  sectionHeading: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 14,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  rowLabel: {
    ...typography.body,
    color: colours.textPrimary,
  },
  rowValue: {
    ...typography.bodySmall,
    color: colours.textMuted,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colours.border,
    marginVertical: 10,
  },
  aboutText: {
    ...typography.bodySmall,
    color: colours.textMuted,
    lineHeight: 24,
  },
  dangerButton: {
    backgroundColor: colours.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  dangerButtonText: {
    ...typography.button,
    color: colours.white,
    fontSize: 16,
  },
});
// final commit :)