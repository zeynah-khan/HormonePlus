import React, { useCallback, useMemo, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { getSymptomLogs, deleteSymptomLog } from "../../../model/storage";

function formatSelectionSummary(log) {
  if (!log?.selections) return [];

  return Object.entries(log.selections)
    .filter(([, values]) => values.length > 0)
    .map(([category, values]) => `${category}: ${values.join(", ")}`);
}

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const loadLogs = useCallback(async () => {
    try {
      const storedLogs = await getSymptomLogs();
      setLogs(storedLogs);

      if (storedLogs.length > 0 && !selectedDate) {
        setSelectedDate(storedLogs[0].date);
      }
    } catch (error) {
      console.error("Error loading logs for calendar:", error);
    }
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadLogs();
    }, [loadLogs])
  );

  const logsByDate = useMemo(() => {
    const grouped = {};
    logs.forEach((log) => {
      grouped[log.date] = log;
    });
    return grouped;
  }, [logs]);

  const markedDates = useMemo(() => {
    const marks = {};

    logs.forEach((log) => {
      marks[log.date] = {
        marked: true,
        dotColor: colours.primary,
      };
    });

    if (selectedDate) {
      marks[selectedDate] = {
        ...(marks[selectedDate] || {}),
        selected: true,
        selectedColor: colours.primary,
      };
    }

    return marks;
  }, [logs, selectedDate]);

  const selectedLog = selectedDate ? logsByDate[selectedDate] : null;
  const selectionSummary = formatSelectionSummary(selectedLog);

  const handleDelete = () => {
    if (!selectedLog) return;

    Alert.alert("Delete entry", "This log will be permanently removed.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteSymptomLog(selectedLog.id);
          const updatedLogs = await getSymptomLogs();
          setLogs(updatedLogs);

          if (updatedLogs.length > 0) {
            setSelectedDate(updatedLogs[0].date);
          } else {
            setSelectedDate(null);
          }
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.subtitle}>
          View your entries over time in a more visual way.
        </Text>

        <View style={styles.calendarCard}>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            theme={{
              backgroundColor: colours.surface,
              calendarBackground: colours.surface,
              textSectionTitleColor: colours.textMuted,
              selectedDayBackgroundColor: colours.primary,
              selectedDayTextColor: colours.white,
              todayTextColor: colours.primary,
              dayTextColor: colours.textPrimary,
              textDisabledColor: colours.inactive,
              monthTextColor: colours.textPrimary,
              arrowColor: colours.primary,
              textDayFontSize: 15,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 13,
              textMonthFontWeight: "700",
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selected day</Text>

          {!selectedDate ? (
            <Text style={styles.cardText}>No date selected yet.</Text>
          ) : !selectedLog ? (
            <>
              <Text style={styles.cardText}>{selectedDate}</Text>
              <Text style={styles.softText}>
                No symptom log saved for this date.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.cardText}>{selectedDate}</Text>

              {selectionSummary.map((entry) => (
                <Text key={entry} style={styles.softText}>
                  • {entry}
                </Text>
              ))}

              {!!selectedLog.notes && (
                <Text style={styles.notesText}>Notes: {selectedLog.notes}</Text>
              )}

              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.primaryButton}
                  onPress={() =>
                    navigation.navigate("EditLog", { logId: selectedLog.id })
                  }
                >
                  <Text style={styles.primaryButtonText}>Edit entry</Text>
                </Pressable>

                <Pressable
                  style={styles.secondaryButton}
                  onPress={handleDelete}
                >
                  <Text style={styles.secondaryButtonText}>Delete</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  calendarCard: {
    backgroundColor: colours.surface,
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colours.border,
  },
  calendar: {
    borderRadius: 16,
    overflow: "hidden",
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
    marginBottom: 10,
  },
  softText: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  notesText: {
    ...typography.bodySmall,
    color: colours.textSecondary,
    marginTop: 8,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colours.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    ...typography.button,
    color: colours.white,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colours.surface,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colours.border,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colours.textPrimary,
  },
});
// final commit :)