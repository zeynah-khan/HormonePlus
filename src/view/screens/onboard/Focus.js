import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';

export default function Focus({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a focus</Text>
        <Text style={styles.subtitle}>
          Help shape your app experience!
        </Text>
        <Text style={styles.body}>
          TBC...
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.buttonText}>Finish Setup</Text>
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