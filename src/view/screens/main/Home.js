import React from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Home({ navigation }) {
  return (
    <Screen>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Have a look around! {/* can't think of a better caption lol */}
        </Text>

        {/* intro card that links to the log page */}
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

        {/* insights card that displays the user's logs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your insights</Text>
          <Text style={styles.cardText}>
            No symptom entries yet for today.
          </Text>
          <Text style={styles.softText}>
            Empty for now!
          </Text>
        </View>

        {/* card that links to recommended content, personalised to the user */}
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
    marginBottom: 12,
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