import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './src/navigation/MainTabs';
// onboarding screens
import Welcome from './src/view/screens/onboard/Welcome';
import Intentions from './src/view/screens/onboard/Intentions';
import Focus from './src/view/screens/onboard/Focus';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}