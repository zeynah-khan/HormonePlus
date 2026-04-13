import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Screen from '../layouts/Screen';

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