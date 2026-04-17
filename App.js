import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './src/navigation/MainTabs';
import { getOnboardingStatus } from './src/model/storage';
// onboarding screens
import Welcome from './src/view/screens/onboard/Welcome';
import Intentions from './src/view/screens/onboard/Intentions';
import Focus from './src/view/screens/onboard/Focus';

import EditLog from './src/view/screens/main/EditLog';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Welcome');

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const onboarding = await getOnboardingStatus();
        setInitialRoute(onboarding.setupComplete ? 'MainTabs' : 'Welcome');
      } catch (error) {
        console.error('Error loading app state:', error);
        setInitialRoute('Welcome');
      } finally {
        setIsLoading(false);
      }
    };

    loadAppState();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {/* onboarding stack */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="Intentions"
          component={Intentions}
        />
        <Stack.Screen
          name="Focus"
          component={Focus}
        />

        {/* main app stack */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />
        <Stack.Screen
          name="EditLog"
          component={EditLog}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}