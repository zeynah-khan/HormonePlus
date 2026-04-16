import React, { useState } from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import Screen from '../../layouts/Screen';
import { colours, typography } from '../../layouts/Theme';
import { saveFocusAreas, setSetupComplete } from '../../../model/storage';

export default function Focus({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // user can choose what they're experiencing
  // this should later affect the app logic
  const options = [
    'PCOS',
    'Menopause',
    'PMDD',
    'Perimenopause',
    'Irregular cycles',
    'Not sure',
  ];

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleFinishSetup = async () => {
    await saveFocusAreas(selectedOptions, { skipped: false });
    await setSetupComplete(true);
    avigation.replace('MainTabs');
  };

  const handleSkip = async () => {
    await saveFocusAreas([], { skipped: true });
    await setSetupComplete(true);
    navigation.replace('MainTabs');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a focus</Text>
        <Text style={styles.subtitle}>
          Select one or more options that match your experience.
        </Text>

        <View style={styles.options}>
          {options.map((item) => {
            const isSelected = selectedOptions.includes(item);
            return (
              <Pressable
                key={item}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => toggleOption(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[
              styles.button,
              selectedOptions.length === 0 && styles.buttonDisabled,
            ]}
            onPress={handleFinishSetup}
            disabled={selectedOptions.length === 0}
          >
            <Text style={styles.buttonText}>Finish setup</Text>
          </Pressable>

          <Pressable style={styles.skipBttn} onPress={handleSkip}>
            <Text style={styles.skipBttnTxt}>Skip for now</Text>
          </Pressable>
        </View>
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
  },
  subtitle: {
    ...typography.body,
    color: colours.textMuted,
    marginBottom: 20,
  },
  options: {
    marginBottom: 30,
  },
  option: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colours.surface,
    marginBottom: 10,
  },
  selectedOption: {
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
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colours.white,
    ...typography.button,
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