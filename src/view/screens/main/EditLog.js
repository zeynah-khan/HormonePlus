import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { getSymptomLogById, updateSymptomLog } from '../../../model/storage';

const sections = [
  { key: 'feelings', title: 'Feelings', items: ['Low', 'Fine', 'Mood swings', 'Anxious', 'Irritable', 'Overwhelmed'] },
  { key: 'pain', title: 'Pain', items: ['Pain free', 'Cramps', 'Headache', 'Breast pain', 'Back pain', 'Bloating'] },
  { key: 'sleep', title: 'Sleep', items: ['Woke refreshed', 'Woke tired', 'Restless', 'Trouble falling asleep'] },
  { key: 'energy', title: 'Energy', items: ['Exhausted', 'Tired', 'OK', 'Energetic'] },
  { key: 'flow', title: 'Flow', items: ['No bleeding', 'Spotting', 'Light flow', 'Moderate flow', 'Heavy flow'] },
  { key: 'cognitive', title: 'Concentration', items: ['Clear-headed', 'Brain fog', 'Forgetful', 'Difficulty focusing'] },
  { key: 'appetite', title: 'Appetite', items: ['No changes', 'Low appetite', 'Cravings', 'Increased appetite'] },
  { key: 'temperature', title: 'Temperature', items: ['Comfortable', 'Hot flushes', 'Night sweats', 'Chills'] },
];

const emptySelections = {
  feelings: [],
  pain: [],
  sleep: [],
  energy: [],
  flow: [],
  cognitive: [],
  appetite: [],
  temperature: [],
};

export default function EditLog({ route, navigation }) {
  const { logId } = route.params;
  const [log, setLog] = useState(null);
  const [selectedItems, setSelectedItems] = useState(emptySelections);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadLog = async () => {
      const foundLog = await getSymptomLogById(logId);
      if (!foundLog) {
        Alert.alert('Not found', 'That entry could not be loaded.');
        navigation.goBack();
        return;
      }

      setLog(foundLog);
      setSelectedItems({ ...emptySelections, ...(foundLog.selections || {}) });
      setNotes(foundLog.notes || '');
    };

    loadLog();
  }, [logId, navigation]);

  const toggleItem = (sectionKey, label) => {
    setSelectedItems((prev) => {
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
    if (!log) return;

    const updatedLog = {
      ...log,
      selections: selectedItems,
      notes: notes.trim(),
      updatedAt: new Date().toISOString(),
    };

    await updateSymptomLog(updatedLog);
    Alert.alert('Updated', 'Your entry has been updated.');
    navigation.goBack();
  };

  if (!log) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Edit entry</Text>
          <Text style={styles.headerSubtitle}>
            Make changes to this symptom log.
          </Text>

          {sections.map((section) => (
            <View key={section.key} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              multiline
              placeholder="Add or update notes..."
              placeholderTextColor={colours.inactive}
              style={styles.notesInput}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
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
  section: { marginBottom: 24 },
  sectionTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 14,
  },
  optionCard: {
    width: 130,
    borderWidth: 2,
    borderColor: colours.primary,
    borderRadius: 16,
    backgroundColor: colours.surface,
    marginRight: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
  },
  optionCardSelected: {
    backgroundColor: colours.primary + '22',
  },
  optionLabel: {
    ...typography.bodySmall,
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
  footer: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colours.background,
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
});