import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../layouts/Screen';

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
        fontSize: 28,
        fontWeight: '700',
        color: '#2E2233',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#5F5666',
    },
});