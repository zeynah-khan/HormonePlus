import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colours, typography } from '../view/layouts/Theme';

// main tabs
import Home from '../view/screens/main/Home';
import SymptomLog from '../view/screens/main/SymptomLog';
import Learn from '../view/screens/main/Learn';
import Profile from '../view/screens/main/Profile';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colours.headerBackground,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: colours.textPrimary
        },
        headerTintColor: colours.textPrimary,
        tabBarActiveTintColor: colours.primary,
        tabBarInactiveTintColor: colours.inactive,
        tabBarStyle: {
          backgroundColor: colours.surface,
          borderTopColor: colours.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: typography.tabLabel,
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Log') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Log"
        component={SymptomLog}
        options={{
            title: 'Log',
            tabBarLabel: 'Log',
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{ title: 'Learn' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}