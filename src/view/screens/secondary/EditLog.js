import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView, Alert, TextInput } from "react-native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { getSymptomLogById, updateSymptomLog } from "../../../model/storage";
// removed the constants into a separate file for easeeee
import { symptomSections, emptySelections } from "../../../model/symptoms";

export default function EditLog({ route, navigation }) {
  const { logId } = route.params;
  const [log, setLog] = useState(null);
  const [selectedItems, setSelectedItems] = useState(emptySelections);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadLog = async () => {
      const foundLog = await getSymptomLogById(logId);
      if (!foundLog) {
        Alert.alert("Not found", "That entry could not be loaded.");
        navigation.goBack();
        return;
      }

      setLog(foundLog);
      setSelectedItems({ ...emptySelections, ...(foundLog.selections || {}) });
      setNotes(foundLog.notes || "");
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
    Alert.alert("Updated", "Your entry has been updated.");
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

          {symptomSections.map((section) => (
            <View key={section.title} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.groups.map((group) => (
                <View key={group.key} style={styles.groupBlock}>
                  <Text style={styles.groupLabel}>{group.label}</Text>
                  <View style={styles.chipContainer}>
                    {group.items.map((item) => {
                      const isSelected =
                        selectedItems[group.key].includes(item);

                      return (
                        <Pressable
                          key={item}
                          style={[
                            styles.chip,
                            isSelected && styles.chipSelected,
                          ]}
                          onPress={() => toggleItem(group.key, item)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              isSelected && styles.chipTextSelected,
                            ]}
                          >
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
  groupBlock: {
    marginTop: 8,
    marginBottom: 14,
  },
  groupLabel: {
    ...typography.bodySmall,
    color: colours.textMuted,
    marginBottom: 10,
    fontWeight: "600",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: colours.background,
    borderWidth: 1,
    borderColor: colours.border,
  },
  chipSelected: {
    backgroundColor: colours.primary + "22",
    borderColor: colours.primary,
  },
  chipText: {
    ...typography.bodySmall,
    fontSize: 13,
    color: colours.textSecondary,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: colours.textPrimary,
    fontWeight: "600",
  },
  notesInput: {
    minHeight: 110,
    backgroundColor: colours.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colours.border,
    padding: 14,
    textAlignVertical: "top",
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
    alignItems: "center",
  },
  saveButtonText: {
    ...typography.button,
    color: colours.white,
    fontSize: 18,
  },
});
// final commit :)