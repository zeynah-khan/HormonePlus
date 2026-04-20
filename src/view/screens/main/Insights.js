import React, { useCallback, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { getGoals, getFocusAreas, getSymptomLogs } from "../../../model/storage";
import { learnCards } from "../../../model/learnCards";
import { getPrioritisedLearnCards } from "../../../controller/priorityCards";
import Modal from "react-native-modal";
import LearnMore from "../../screens/secondary/LearnMore";

export default function Insights() {
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const [selectedLearnCard, setSelectedLearnCard] = useState(null);
  const [isLearnModalVisible, setIsLearnModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedLogs = await getSymptomLogs();
          const storedGoals = await getGoals();
          const storedFocusAreas = await getFocusAreas();

          setLogs(storedLogs);
          setGoals(storedGoals);
          setFocusAreas(storedFocusAreas);
        } catch (error) {
          console.error("Error loading insights data:", error);
        }
      };

      loadData();
    }, [])
  );

  const getSymptomCounts = () => {
    const recent = logs.slice(0, 5);
    const counts = {};

    recent.forEach((log) => {
      Object.entries(log.selections).forEach(([category, values]) => {
        values.forEach((value) => {
          const key = `${category}:${value}`;
          counts[key] = (counts[key] || 0) + 1;
        });
      });
    });

    return counts;
  };

  const getCategorySummaries = () => {
    const counts = getSymptomCounts();
    const grouped = {
      feelings: 0,
      pain: 0,
      sleep: 0,
      energy: 0,
      cognitive: 0,
    };

    Object.entries(counts).forEach(([key, count]) => {
      const [category] = key.split(":");
      if (grouped[category] !== undefined) {
        grouped[category] += count;
      }
    });

    const summaries = [];

    if (grouped.feelings > 0) {
      summaries.push(
        "Mood-related symptoms have appeared in recent check-ins."
      );
    }
    if (grouped.pain > 0) {
      summaries.push("Pain symptoms have been logged repeatedly.");
    }
    if (grouped.sleep > 0) {
      summaries.push("Sleep-related changes are showing up in recent entries.");
    }
    if (grouped.energy > 0) {
      summaries.push("Energy levels may be worth continuing to monitor.");
    }
    if (grouped.cognitive > 0) {
      summaries.push(
        "Concentration-related symptoms have appeared in recent logs."
      );
    }
    if (grouped.sleep > 0 && grouped.energy > 0) {
      summaries.push(
        "Sleep and energy changes are both appearing in recent entries."
      );
    }
    if (grouped.feelings > 0 && grouped.cognitive > 0) {
      summaries.push(
        "Emotional and concentration-related symptoms are appearing together."
      );
    }

    return summaries;
  };

  const getTopSymptoms = () => {
    const counts = getSymptomCounts();

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => {
        const [, value] = key.split(":");
        return `${value} (${count})`;
      });
  };

  const getSupportiveInsight = () => {
    if (focusAreas.includes("PCOS")) {
      return "With PCOS, symptom patterns can feel unpredictable. Repeated logging may help highlight changes over time without assuming a “regular” cycle.";
    }
    if (focusAreas.includes("PMDD")) {
      return "If PMDD is part of your experience, mood, energy, and emotional changes may be especially important to track consistently.";
    }
    if (
      focusAreas.includes("Perimenopause") ||
      focusAreas.includes("Menopause")
    ) {
      return "During perimenopause or menopause, sleep, mood, and energy can shift together. Looking at them side by side may help build a clearer picture.";
    }
    if (focusAreas.includes("Irregular cycles")) {
      return "When cycles feel irregular, reflective symptom tracking can be useful even without prediction-based features.";
    }

    return "Your recent logs can help you build a more personal understanding of what feels consistent, what changes, and what may need more attention.";
  };

  const openLearnModal = (card) => {
    setSelectedLearnCard(card);
    setIsLearnModalVisible(true);
  };

  const closeLearnModal = () => {
    setIsLearnModalVisible(false);
    setSelectedLearnCard(null);
  };

  const categorySummaries = getCategorySummaries();
  const topSymptoms = getTopSymptoms();
  const prioritisedLearnCards = getPrioritisedLearnCards(
    focusAreas,
    learnCards,
    3
  );

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>
            A reflective view of your recent symptom tracking and focus areas.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your overview</Text>
            <Text style={styles.cardText}>Entries logged: {logs.length}</Text>
            {focusAreas.length > 0 ? (
              <Text style={styles.softText}>
                Focus areas: {focusAreas.join(", ")}
              </Text>
            ) : (
              <Text style={styles.softText}>No focus areas selected yet.</Text>
            )}
            {goals.length > 0 ? (
              <Text style={styles.softText}>Goals: {goals.join(", ")}</Text>
            ) : (
              <Text style={styles.softText}>No goals selected yet.</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent patterns</Text>
            {logs.length === 0 ? (
              <Text style={styles.cardText}>
                No recent symptom data yet. Once you begin logging, this section
                will show reflective summaries based on your entries.
              </Text>
            ) : (
              <>
                {categorySummaries.map((summary) => (
                  <Text key={summary} style={styles.softText}>
                    • {summary}
                  </Text>
                ))}
                {topSymptoms.length > 0 && (
                  <>
                    <Text style={[styles.cardText, styles.sectionSpacing]}>
                      Most frequently logged:
                    </Text>
                    {topSymptoms.map((symptom) => (
                      <Text key={symptom} style={styles.softText}>
                        • {symptom}
                      </Text>
                    ))}
                  </>
                )}
              </>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Supportive insight</Text>
            <Text style={styles.cardText}>{getSupportiveInsight()}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Learn more</Text>
            <Text style={styles.cardText}>
              These topics are prioritised based on your selected focus areas.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {prioritisedLearnCards.map((card) => {
                const isRelevant = card.tags.some((tag) =>
                  focusAreas.includes(tag)
                );
                return (
                  <View key={card.id} style={styles.learnCard}>
                    {isRelevant && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          Relevant to your focus
                        </Text>
                      </View>
                    )}
                    <Text style={styles.learnTitle}>{card.title}</Text>
                    <Text style={styles.learnText} numberOfLines={3}>
                      {card.summary}
                    </Text>
                    <Pressable
                      style={styles.learnButton}
                      onPress={() => openLearnModal(card)}
                    >
                      <Text style={styles.learnButtonText}>More</Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isLearnModalVisible}
        onBackdropPress={closeLearnModal}
        onBackButtonPress={closeLearnModal}
        onSwipeComplete={closeLearnModal}
        swipeDirection={["down"]}
        style={styles.modal}
        propagateSwipe={true}
      >
        <LearnMore card={selectedLearnCard} onClose={closeLearnModal} />
      </Modal>
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
  },
  sectionSpacing: {
    marginTop: 8,
  },
  learnCard: {
    backgroundColor: colours.background,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colours.border,
    width: 260,
  },
  learnTitle: {
    ...typography.body,
    color: colours.textPrimary,
    fontWeight: "700",
    marginBottom: 10,
  },
  learnText: {
    ...typography.bodySmall,
    color: colours.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
    flexShrink: 1,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colours.primary + "22",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    ...typography.bodySmall,
    color: colours.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  learnButton: {
    marginTop: 6,
    backgroundColor: colours.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  learnButtonText: {
    ...typography.button,
    color: colours.white,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
// final commit :)