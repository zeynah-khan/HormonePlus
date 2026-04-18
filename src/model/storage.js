import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  GOALS: "userGoals",
  FOCUS: "userFocusAreas",
  LOGS: "symptomLogs",
  ONBOARDING: "onboardingStatus",
};

const defaultOnboarding = {
  setupComplete: false,
  goalsCompleted: false,
  goalsSkipped: false,
  focusCompleted: false,
  focusSkipped: false,
};

async function mergeOnboardingStatus(patch) {
  const current = await getOnboardingStatus();
  const updated = { ...current, ...patch };
  await AsyncStorage.setItem(KEYS.ONBOARDING, JSON.stringify(updated));
  return updated;
}

export async function clearAllData() {
  await AsyncStorage.multiRemove([
    KEYS.GOALS,
    KEYS.FOCUS,
    KEYS.LOGS,
    KEYS.ONBOARDING,
  ]);
}

export async function getOnboardingStatus() {
  const data = await AsyncStorage.getItem(KEYS.ONBOARDING);
  return data ? JSON.parse(data) : defaultOnboarding;
}

export async function setSetupComplete(value = true) {
  return mergeOnboardingStatus({ setupComplete: value });
}

export async function saveGoals(goals, options = { skipped: false }) {
  await AsyncStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
  await mergeOnboardingStatus({
    goalsCompleted: !options.skipped,
    goalsSkipped: options.skipped,
  });
}

export async function getGoals() {
  const data = await AsyncStorage.getItem(KEYS.GOALS);
  return data ? JSON.parse(data) : [];
}

export async function saveFocusAreas(focusAreas, options = { skipped: false }) {
  await AsyncStorage.setItem(KEYS.FOCUS, JSON.stringify(focusAreas));
  await mergeOnboardingStatus({
    focusCompleted: !options.skipped,
    focusSkipped: options.skipped,
  });
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

export async function updateSymptomLog(updatedLog) {
  const existing = await AsyncStorage.getItem(KEYS.LOGS);
  const logs = existing ? JSON.parse(existing) : [];

  const updatedLogs = logs.map((log) =>
    log.id === updatedLog.id ? updatedLog : log
  );

  await AsyncStorage.setItem(KEYS.LOGS, JSON.stringify(updatedLogs));
}

export async function deleteSymptomLog(logId) {
  const existing = await AsyncStorage.getItem(KEYS.LOGS);
  const logs = existing ? JSON.parse(existing) : [];

  const updatedLogs = logs.filter((log) => log.id !== logId);
  await AsyncStorage.setItem(KEYS.LOGS, JSON.stringify(updatedLogs));
}

export async function getSymptomLogs() {
  const data = await AsyncStorage.getItem(KEYS.LOGS);
  return data ? JSON.parse(data) : [];
}

export async function getSymptomLogById(logId) {
  const logs = await getSymptomLogs();
  return logs.find((log) => log.id === logId) || null;
}
