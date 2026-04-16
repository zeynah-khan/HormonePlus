import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  GOALS: 'userGoals',
  FOCUS: 'userFocusAreas',
  LOGS: 'symptomLogs',
};

export async function saveGoals(goals) {
  await AsyncStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
}

export async function getGoals() {
  const data = await AsyncStorage.getItem(KEYS.GOALS);
  return data ? JSON.parse(data) : [];
}

export async function saveFocusAreas(focusAreas) {
  await AsyncStorage.setItem(KEYS.FOCUS, JSON.stringify(focusAreas));
}

export async function getFocusAreas() {
  const data = await AsyncStorage.getItem(KEYS.FOCUS);
  return data ? JSON.parse(data) : [];
}

export async function addSymptomLog(log) {
  const existing = await AsyncStorage.getItem(KEYS.LOGS);
  const logs = existing ? JSON.parse(existing) : [];
  logs.unshift(log);
  await AsyncStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
}

export async function getSymptomLogs() {
  const data = await AsyncStorage.getItem(KEYS.LOGS);
  return data ? JSON.parse(data) : [];
}