import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import Screen from "../../layouts/Screen";
import { colours, typography } from "../../layouts/Theme";
import { signInUser, signUpUser } from "../../../controller/authentication";
import { saveUserProfileToCloud } from "../../../controller/firestore";
import { getGoals, getFocusAreas } from "../../../model/storage";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please enter an email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const user = await signUpUser(email.trim(), password);

      const goals = await getGoals();
      const focusAreas = await getFocusAreas();

      await saveUserProfileToCloud(user.uid, {
        email: user.email,
        goals,
        focusAreas,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", `Account created for ${user.email}`);
    } catch (error) {
      Alert.alert("Sign up failed", `${error.code}\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please enter an email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const user = await signInUser(email.trim(), password);
      Alert.alert("Success", `Signed in as ${user.email}`);
    } catch (error) {
      Alert.alert("Sign in failed", `${error.code}\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in / Up</Text>
        <Text style={styles.subtitle}>
          Sign in or create an account to save your data more securely.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Please wait..." : "Sign in"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.secondaryButtonText}>Create account</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...typography.titleMedium,
    color: colours.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: colours.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    color: colours.textPrimary,
  },
  button: {
    backgroundColor: colours.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...typography.button,
    color: colours.white,
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    ...typography.bodySmall,
    color: colours.textMuted,
  },
});
