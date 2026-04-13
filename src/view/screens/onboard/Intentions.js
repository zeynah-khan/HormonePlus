import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Intentions({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Your goals</Text>
        <Text style={styles.subtitle}>
          Set your intentions for using this app!
        </Text>
        <Text style={styles.body}>
          TBC...
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Focus')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.titleLarge,
    color: colours.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    ...typography.subtitle,
    color: colours.textSecondary,
    marginBottom: 16,
  },
  body: {
    ...typography.bodySmall,
    color: colours.textSoft,
    marginBottom: 28,
  },
  button: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    ...typography.button,
    color: colours.white,
  },
});