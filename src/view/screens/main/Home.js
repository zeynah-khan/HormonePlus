import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { getGoals, getFocusAreas, getSymptomLogs } from '../../../model/storage';

export default function Home({ navigation }) {
  const [latestLog, setLatestLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const logCount = logs.length;

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedLogs = await getSymptomLogs();
          const storedGoals = await getGoals();
          const storedFocusAreas = await getFocusAreas();
  
          setLogs(storedLogs);
          setLatestLog(storedLogs[0] || null);
          setGoals(storedGoals);
          setFocusAreas(storedFocusAreas);
        } catch (error) {
          console.error('Error loading app data:', error);
        }
      };
  
      loadData();
    }, [])
  );

  const formatSelections = () => {
    if (!latestLog?.selections) return [];

    return Object.entries(latestLog.selections)
      .filter(([, values]) => values.length > 0)
      .map(([category, values]) => `${category}: ${values.join(', ')}`);
  };

  const buildInsights = () => {
    if (!logs.length) return [];
  
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
  
    const topThree = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => {
        const [category, value] = key.split(':');
        return `${value} appeared ${count} time${count > 1 ? 's' : ''} in recent ${category} logs`;
      });
  
    return topThree;
  };

  const formattedSelections = formatSelections();
  const recentInsights = buildInsights();

  const getRecommendation = () => {
    if (focusAreas.includes('PMDD')) {
      return 'You may find mood and energy tracking especially helpful.';
    }
    if (focusAreas.includes('PCOS')) {
      return 'Tracking patterns over time can help identify changes and recurring symptoms.';
    }
    if (focusAreas.includes('Menopause') || focusAreas.includes('Perimenopause')) {
      return 'Tracking sleep, mood, and energy may help you notice broader hormonal patterns.';
    }
    if (focusAreas.includes('Irregular cycles')) {
      return 'Regular check-ins can help build a clearer picture even when patterns feel unpredictable.';
    }
    return 'Start logging regularly to build more meaningful insights over time.';
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Have a look around!
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>How are you feeling today?</Text>
            <Text style={styles.cardText}>
              Check in with your symptoms, mood, and energy levels to start
              building a clearer picture of your health.
            </Text>
            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Log')}
            >
              <Text style={styles.primaryButtonText}>Log your symptoms</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your insights</Text>
            {logCount === 0 ? (
              <>
                <Text style={styles.cardText}>No symptom entries yet.</Text>
                <Text style={styles.softText}>
                  Once you start logging, your recent check-ins and patterns will appear here.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.softText}>
                  You’ve logged {logCount} {logCount === 1 ? 'entry' : 'entries'} so far.
                </Text>

                <Text style={styles.cardText}>Latest symptom log:</Text>
                {formattedSelections.map((entry) => (
                  <Text key={entry} style={styles.softText}>
                    • {entry}
                  </Text>
                ))}

                {recentInsights.length > 0 && (
                  <>
                    <Text style={[styles.cardText, styles.sectionSpacing]}>
                      Recent patterns:
                    </Text>
                    {recentInsights.map((insight) => (
                      <Text key={insight} style={styles.softText}>
                        • {insight}
                      </Text>
                    ))}
                  </>
                )}
              </>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recommended for you</Text>
            <Text style={styles.cardText}>
              Based on your goals and focus areas, relevant educational content can be prioritised here.
            </Text>

            <Text style={styles.softText}>{getRecommendation()}</Text>

            {focusAreas.length > 0 && (
              <Text style={styles.softText}>
                Your focus: {focusAreas.join(', ')}
              </Text>
            )}

            {goals.length > 0 && (
              <Text style={styles.softText}>
                Your goals: {goals.join(', ')}
              </Text>
            )}
            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Insights')}
            >
              <Text style={styles.secondaryButtonText}>Learn more here</Text>
            </Pressable>
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
  },
  softText: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    ...typography.button,
    color: colours.white,
  },
  secondaryButton: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colours.white,
  },
});