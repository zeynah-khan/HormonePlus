import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { signInUser, signUpUser } from '../../../controller/authentication';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const user = await signUpUser(email.trim(), password);
      console.log('SIGNED UP USER:', user);
      Alert.alert('Success', 'Account created successfully.');
    } catch (error) {
      console.log('SIGN UP ERROR CODE:', error.code);
      console.log('SIGN UP ERROR MESSAGE:', error.message);
      Alert.alert('Sign up failed', `${error.code}\n${error.message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInUser(email.trim(), password);
      Alert.alert('Success', 'Signed in successfully.');
    } catch (error) {
      Alert.alert('Sign in failed', error.message);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Use an account to save your data securely.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={handleSignUp}>
          <Text style={styles.secondaryButtonText}>Create account</Text>
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
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: colours.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colours.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    ...typography.button,
    color: colours.white,
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.bodySmall,
    color: colours.textMuted,
  },
});