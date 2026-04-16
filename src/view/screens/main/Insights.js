import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { getGoals, getFocusAreas, getSymptomLogs } from '../../../model/storage';

export default function Insights() {
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);

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
          console.error('Error loading insights data:', error);
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
    };

    Object.entries(counts).forEach(([key, count]) => {
      const [category] = key.split(':');
      if (grouped[category] !== undefined) {
        grouped[category] += count;
      }
    });

    const summaries = [];

    if (grouped.feelings > 0) {
      summaries.push('Mood-related symptoms have appeared in recent check-ins.');
    }
    if (grouped.pain > 0) {
      summaries.push('Pain symptoms have been logged repeatedly.');
    }
    if (grouped.sleep > 0) {
      summaries.push('Sleep-related changes are showing up in recent entries.');
    }
    if (grouped.energy > 0) {
      summaries.push('Energy levels may be worth continuing to monitor.');
    }

    return summaries;
  };

  const getTopSymptoms = () => {
    const counts = getSymptomCounts();

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => {
        const [, value] = key.split(':');
        return `${value} (${count})`;
      });
  };

  const getSupportiveInsight = () => {
    if (focusAreas.includes('PCOS')) {
      return 'With PCOS, symptom patterns can feel unpredictable. Repeated logging may help highlight changes over time without assuming a “regular” cycle.';
    }
    if (focusAreas.includes('PMDD')) {
      return 'If PMDD is part of your experience, mood, energy, and emotional changes may be especially important to track consistently.';
    }
    if (focusAreas.includes('Perimenopause') || focusAreas.includes('Menopause')) {
      return 'During perimenopause or menopause, sleep, mood, and energy can shift together. Looking at them side by side may help build a clearer picture.';
    }
    if (focusAreas.includes('Irregular cycles')) {
      return 'When cycles feel irregular, reflective symptom tracking can be useful even without prediction-based features.';
    }

    return 'Your recent logs can help you build a more personal understanding of what feels consistent, what changes, and what may need more attention.';
  };

  const getNextStep = () => {
    if (logs.length === 0) {
      return 'Start with a few symptom check-ins so the app can begin building patterns from your own entries.';
    }

    if (goals.includes('Prepare for medical appointments')) {
      return 'Keep logging for a few more entries so you can bring a clearer summary of recurring symptoms to appointments.';
    }

    if (goals.includes('Understand patterns')) {
      return 'Continue checking in across mood, pain, sleep, and energy so patterns become easier to notice over time.';
    }

    return 'Keep tracking the areas that feel most relevant to you right now.';
  };

  const categorySummaries = getCategorySummaries();
  const topSymptoms = getTopSymptoms();

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
            <Text style={styles.cardText}>
              Entries logged: {logs.length}
            </Text>

            {focusAreas.length > 0 ? (
              <Text style={styles.softText}>
                Focus areas: {focusAreas.join(', ')}
              </Text>
            ) : (
              <Text style={styles.softText}>
                No focus areas selected yet.
              </Text>
            )}

            {goals.length > 0 ? (
              <Text style={styles.softText}>
                Goals: {goals.join(', ')}
              </Text>
            ) : (
              <Text style={styles.softText}>
                No goals selected yet.
              </Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent patterns</Text>

            {logs.length === 0 ? (
              <Text style={styles.cardText}>
                No recent symptom data yet. Once you begin logging, this section will show reflective summaries based on your entries.
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
            <Text style={styles.cardText}>
              {getSupportiveInsight()}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Suggested next step</Text>
            <Text style={styles.cardText}>
              {getNextStep()}
            </Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  },
  softText: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 8,
  },
  sectionSpacing: {
    marginTop: 8,
  },
});