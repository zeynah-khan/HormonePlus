import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function SymptomLog() {
  const [selectedMood, setMood] = useState(null); 

  const moods = ['😃', '🙂', '😐', '😔', '😢'];

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Log symptoms</Text>
        <Text style={styles.subtitle}>
          How are you feeling today?
        </Text>
        <View style={styles.moodRow}>
          {moods.map((mood, index) => (
            <Pressable
              key={index}
              style={[
                styles.moodButton,
                selectedMood === index && styles.selectedMood,
              ]}
              onPress={() => setMood(index)}
            >
              <Text style={styles.moodText}>{mood}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          style={styles.button}
          onPress={() => console.log('Selected mood:', selectedMood)}
        >
          <Text style={styles.buttonText}>Save Entry</Text>
        </Pressable>

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },

  title: {
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 8,
  },

  subtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
  },

  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
  },

  moodButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colours.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedMood: {
    backgroundColor: colours.primary + '33',
  },

  moodText: {
    fontSize: 24,
  },

  button: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: colours.white,
    ...typography.button,
  },
});