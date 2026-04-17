import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { addSymptomLog } from '../../../model/storage';
// removed the constants into a separate file for easeeee
import { symptomSections, emptySelections } from '../../../model/symptoms';

export default function SymptomLog({ navigation }) {
  const [selectedItems, setItems] = useState(emptySelections);
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

      const hasSelections =
        Object.values(selectedItems).some((items) => items.length > 0) ||
        notes.trim().length > 0;

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

          {symptomSections.map((section) => (
            <View key={section.title} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.groups.map((group) => (
                <View key={group.key} style={styles.groupBlock}>
                  <Text style={styles.groupLabel}>{group.label}</Text>
                  <View style={styles.chipContainer}>
                    {group.items.map((item) => {
                      const isSelected = selectedItems[group.key].includes(item);
                      
                      return (
                      <Pressable key={item} style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => toggleItem(group.key, item)}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        ))}
        <View style={styles.sectionCard}>
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
  sectionCard: {
    backgroundColor: colours.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colours.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colours.border,
    backgroundColor: colours.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  chipSelected: {
    backgroundColor: colours.primary + '22',
    borderColor: colours.primary,
  },
  chipText: {
    ...typography.bodySmall,
    fontSize: 13,
    color: colours.textSecondary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colours.textPrimary,
    fontWeight: '600',
  },
  notesInput: {
    minHeight: 110,
    backgroundColor: colours.background,
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
    backgroundColor: colours.background,
  },
  groupBlock: {
    marginTop: 8,
    marginBottom: 14,
  },
  groupLabel: {
    ...typography.bodySmall,
    color: colours.textMuted,
    marginBottom: 10,
    fontWeight: '600',
  },
});