import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Screen from '../layouts/Screen';

export default function Welcome({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          A hormonal health space designed for reflection, understanding, and
          support beyond fertility-focused tracking!
        </Text>
        <Text style={styles.body}>
          TBC...
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Intentions')}
        >
          <Text style={styles.buttonText}>Get started</Text>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#2E2233',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: '#4B3D52',
    marginBottom: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: '#6A6170',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#9C6BB3',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});