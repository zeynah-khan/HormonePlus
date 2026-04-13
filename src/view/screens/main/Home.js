import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../view/layouts/Theme';

export default function Home() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          Welcome back. This is where your daily overview and summaries will
          appear.
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