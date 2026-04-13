import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// main tabs
import Home from '../view/screens/Home';
import SymptomLog from '../view/screens/SymptomLog';
import Learn from '../view/screens/Learn';
import Profile from '../view/screens/Profile';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#F7F2F8',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTintColor: '#2E2233',
        tabBarActiveTintColor: '#9C6BB3',
        tabBarInactiveTintColor: '#8C8691',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E7E1EA',
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size, focused }) => {
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
            title: 'Log Symptoms',
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