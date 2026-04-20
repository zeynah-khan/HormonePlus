import React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { colours, typography } from "../../layouts/Theme";

export default function LearnMore({ card, onClose }) {
  if (!card) return null;

  return (
    <View style={styles.modalContent}>
      <View style={styles.dragHandle} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.title}>{card.title}</Text>

        {card.tags?.length > 0 && (
          <View style={styles.tagsRow}>
            {card.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.bodyText}>{card.summary}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Why tracking may help</Text>
          <Text style={styles.bodyText}>{card.support}</Text>
        </View>

        {card.note ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Note</Text>
            <Text style={styles.bodyText}>{card.note}</Text>
          </View>
        ) : null}

        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colours.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "82%",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  dragHandle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: colours.border,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 12,
  },
  title: {
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 14,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  tag: {
    backgroundColor: colours.primary + "22",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    ...typography.bodySmall,
    color: colours.textPrimary,
    fontWeight: "600",
    fontSize: 12,
  },
  card: {
    backgroundColor: colours.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colours.border,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colours.textPrimary,
    marginBottom: 8,
  },
  bodyText: {
    ...typography.bodySmall,
    color: colours.textSecondary,
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 4,
    backgroundColor: colours.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  closeButtonText: {
    ...typography.button,
    color: colours.white,
  },
});
// final commit :)