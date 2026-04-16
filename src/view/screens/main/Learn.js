import React from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Learn() {
  const topics = [
    {
      title: 'Menopause',
      description:
        'Menopause is when periods stop permanently. It can affect sleep, mood, energy, and body temperature in different ways.',
    },
    {
      title: 'Perimenopause',
      description:
        'Perimenopause is the transition leading up to menopause. Hormonal changes during this stage can cause irregular periods and shifting symptoms.',
    },
    {
      title: 'PCOS',
      description:
        'PCOS can affect periods, skin, weight, mood, and energy. Experiences vary widely, so tracking symptoms can help identify patterns.',
    },
    {
      title: 'PMDD',
      description:
        'PMDD is a severe form of premenstrual distress that can affect emotions, focus, and daily life. Symptoms may feel intense and disruptive.',
    },
    {
      title: 'Irregular cycles',
      description:
        'Irregular cycles can happen for many reasons and do not always mean something is wrong. Understanding patterns can help build confidence and clarity.',
    },
  ];

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>
            Explore clear and supportive information about hormonal health topics.
          </Text>

          {/* Intro card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Why this matters</Text>
            <Text style={styles.cardText}>
              This section is designed to support hormonal health literacy by
              making information easier to access and understand.
            </Text>
            <Text style={styles.softText}>
              Later, content here can be personalised based on the user’s focus
              areas and goals.
            </Text>
          </View>

          {/* Topic cards */}
          {topics.map((topic) => (
            <View key={topic.title} style={styles.card}>
              <Text style={styles.cardTitle}>{topic.title}</Text>
              <Text style={styles.cardText}>{topic.description}</Text>

              <Pressable style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Read more</Text>
              </Pressable>
            </View>
          ))}
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
    marginBottom: 12,
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