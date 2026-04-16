import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView, Alert } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { addSymptomLog } from '../../../model/storage';

export default function SymptomLog({ navigation }) {
  const [selectedItems, setItems] = useState({
    feelings: [],
    pain: [],
    sleep: [],
    energy: [],
  });

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
  ];

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
      const symptomLog = {
        id: now.toISOString(),
        date: now.toISOString().split('T')[0],
        selections: selectedItems,
      };
      const hasSelections = Object.values(selectedItems).some(
        (items) => items.length > 0
      );
      
      if (!hasSelections) {
        Alert.alert('Nothing selected', 'Please choose at least one symptom before saving.');
        return;
      }
  
      await addSymptomLog(symptomLog);
  
      Alert.alert('Saved', 'Your symptom log has been saved.');
      navigation.navigate('Home');
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
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

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
                        { borderColor: section.accent },
                        isSelected && {
                          backgroundColor: section.accent + '22',
                          borderColor: section.accent,
                        },
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
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
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
  optionLabel: {
    ...typography.body,
    color: colours.textMuted,
    textAlign: 'center',
    fontWeight: '500',
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