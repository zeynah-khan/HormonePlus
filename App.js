import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/view/screens/Home';
import SymptomLog from './src/view/screens/SymptomLog';
import Learn from './src/view/screens/Learn';
import Profile from './src/view/screens/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Log"
          component={SymptomLog}
        />
        <Tab.Screen
          name="Learn"
          component={Learn}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}