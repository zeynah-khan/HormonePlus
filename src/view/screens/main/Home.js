import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Home({ navigation }) {
  const [latestLog, setLatestLog] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadLatestLog = async () => {
        try {
          const storedLog = await AsyncStorage.getItem('latestSymptomLog');

          if (storedLog) {
            setLatestLog(JSON.parse(storedLog));
          } else {
            setLatestLog(null);
          }
        } catch (error) {
          console.error('Error loading symptom log:', error);
        }
      };

      loadLatestLog();
    }, [])
  );

  const formatSelections = () => {
    if (!latestLog?.selections) return [];

    return Object.entries(latestLog.selections)
      .filter(([, values]) => values.length > 0)
      .map(([category, values]) => `${category}: ${values.join(', ')}`);
  };

  const formattedSelections = formatSelections();

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

            {!latestLog || formattedSelections.length === 0 ? (
              <>
                <Text style={styles.cardText}>
                  No symptom entries yet for today.
                </Text>
                <Text style={styles.softText}>
                  Once you start logging, your selections will appear here.
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.cardText}>
                  Latest symptom log:
                </Text>
                {formattedSelections.map((entry) => (
                  <Text key={entry} style={styles.softText}>
                    • {entry}
                  </Text>
                ))}
              </>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recommended for you</Text>
            <Text style={styles.cardText}>
              Based on your goals and focus areas, relevant educational content will
              appear below!
            </Text>
            <Text style={styles.softText}>
              Empty for now!
            </Text>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Learn')}
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