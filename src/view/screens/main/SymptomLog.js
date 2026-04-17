import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { addSymptomLog } from '../../../model/storage';

const initialSelections = {
  feelings: [],
  pain: [],
  sleep: [],
  energy: [],
  flow: [],
  cognitive: [],
  appetite: [],
  temperature: [],
};

const sections = [
  {
    key: 'feelings',
    title: 'Feelings',
    accent: colours.primary,
    items: ['Mood swings', 'Low', 'Fine', 'Anxious'],
  },
  {
    key: 'pain',
    title: 'Pain',
    accent: colours.primary,
    items: ['Pain free', 'Cramps', 'Headache', 'Breast pain'],
  },
  {
    key: 'sleep',
    title: 'Sleep',
    accent: colours.primary,
    items: ['Trouble falling asleep', 'Woke refreshed', 'Woke tired', 'Restless'],
  },
  {
    key: 'energy',
    title: 'Energy',
    accent: colours.primary,
    items: ['Exhausted', 'Tired', 'OK', 'Energetic'],
  },
  {
    key: 'flow',
    title: 'Flow',
    items: ['No bleeding', 'Spotting', 'Light flow', 'Moderate flow', 'Heavy flow'],
  },
  {
    key: 'cognitive',
    title: 'Concentration',
    items: ['Clear-headed', 'Brain fog', 'Forgetful', 'Difficulty focusing'],
  },
  {
    key: 'appetite',
    title: 'Appetite',
    items: ['No changes', 'Low appetite', 'Cravings', 'Increased appetite'],
  },
  {
    key: 'temperature',
    title: 'Temperature',
    items: ['Comfortable', 'Hot flushes', 'Night sweats', 'Chills'],
  },
];

export default function SymptomLog({ navigation }) {
  const [selectedItems, setItems] = useState(initialSelections);
  const [notes, setNotes] = useState('');

  const toggleItem = (sectionKey, label) => {
    setItems((prev) => {
      const current = prev[sectionKey];
      const updated = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];

      return {
        ...prev,
        [sectionKey]: updated,
      };
    });
  };

  const handleSave = async () => {
    try {
      const now = new Date();

      const hasSelections = Object.values(selectedItems).some(
        (items) => items.length > 0
      ) || notes.trim().length > 0;

      if (!hasSelections) {
        Alert.alert('Nothing added', 'Please choose a symptom or write a short note before saving.');
        return;
      }

      const symptomLog = {
        id: now.toISOString(),
        date: now.toISOString().split('T')[0],
        createdAt: now.toISOString(),
        selections: selectedItems,
        notes: notes.trim(),
      };

      await addSymptomLog(symptomLog);

      Alert.alert('Saved', 'Your symptom log has been saved.');
      navigation.navigate('Calendar');
    } catch (error) {
      console.error('Error saving symptom log:', error);
      Alert.alert('Error', 'Something went wrong while saving your symptom log.');
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.headerTitle}>Log symptoms</Text>
          <Text style={styles.headerSubtitle}>
            Record how you are feeling today across a few key areas.
          </Text>
          {sections.map((section) => (
            <View key={section.key} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {section.items.map((item) => {
                  const isSelected = selectedItems[section.key].includes(item);

                  return (
                    <Pressable
                      key={item}
                      style={[
                        styles.optionCard,
                        isSelected && styles.optionCardSelected,
                      ]}
                      onPress={() => toggleItem(section.key, item)}
                    >
                      <Text style={styles.optionLabel}>{item}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ))}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add anything else you’d like to remember today..."
              placeholderTextColor={colours.inactive}
              multiline
              style={styles.notesInput}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  headerTitle: {
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 10,
  },
  headerSubtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 14,
  },
  horizontalList: {
    paddingRight: 8,
  },
  optionCard: {
    minWidth: 110,
    maxWidth: 140,
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: colours.surface,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCardSelected: {
    backgroundColor: colours.primary + '22',
  },
  optionLabel: {
    ...typography.body,
    color: colours.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  notesInput: {
    minHeight: 120,
    backgroundColor: colours.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colours.border,
    padding: 14,
    textAlignVertical: 'top',
    color: colours.textPrimary,
    ...typography.bodySmall,
  },
  saveButton: {
    backgroundColor: colours.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.button,
    color: colours.white,
    fontSize: 18,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colours.background,
  },
});