import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../view/layouts/Theme';

export default function SymptomLog() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Log symptoms</Text>
        <Text style={styles.subtitle}>
          This page will let users record symptoms, mood, energy, sleep, and
          other hormonal experiences.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        ...typography.titleMedium,
        color: colours.textPrimary,
        marginBottom: 10,
    },
    subtitle: {
        ...typography.body,
        color: colours.textMuted,
    },
});