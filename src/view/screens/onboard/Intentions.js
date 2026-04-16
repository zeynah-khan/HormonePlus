import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { saveGoals } from '../../../model/storage';

export default function Intentions({ navigation }) {
  const [selectedGoals, setSelectedGoals] = useState([]);

  // users can select their intentions for using the app
  // this will also later affect the app logic
  const goals = [
    'Track symptoms',
    'Understand patterns',
    'Learn more about hormonal health',
    'Prepare for medical appointments',
    'Feel more in control',
    'Not sure',
  ];

  const toggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleContinue = async () => {
    await saveGoals(selectedGoals);
    navigation.navigate('Focus');
  };

  const handleSkip = async () => {
    await saveGoals([], { skipped: true });
    navigation.navigate('Focus');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Your goals</Text>
        <Text style={styles.subtitle}>
          Set your intentions for using this app.
        </Text>
        <Text style={styles.body}>
          Choose one or more options that reflect what you want support with.
        </Text>
        <View style={styles.optionsContainer}>
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal);
            return (
              <Pressable
                key={goal}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOptionButton,
                ]}
                onPress={() => toggleGoal(goal)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText,
                  ]}
                >
                  {goal}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
        <Pressable style={styles.skipBttn} onPress={handleSkip}>
          <Text style={styles.skipBttnTxt}>Skip for now!</Text>
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
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 28,
  },
  optionButton: {
    backgroundColor: colours.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: colours.primary + '33',
  },
  optionText: {
    ...typography.body,
    color: colours.textPrimary,
  },
  selectedOptionText: {
    color: colours.textPrimary,
    fontWeight: '600',
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
  skipBttn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipBttnTxt: {
    ...typography.bodySmall,
    color: colours.textMuted,
  },
});