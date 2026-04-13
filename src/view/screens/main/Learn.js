import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../view/layouts/Theme';

export default function Learn() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.subtitle}>
          This section will provide accessible educational content to support
          hormonal health literacy.
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