import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Profile() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          This area will later contain user preferences, goals, and personal
          settings.
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