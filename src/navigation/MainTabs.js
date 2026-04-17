import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colours, typography } from '../view/layouts/Theme';

// main tabs
import Home from '../view/screens/main/Home';
import SymptomLog from '../view/screens/main/SymptomLog';
import Profile from '../view/screens/main/Profile';
import Insights from '../view/screens/main/Insights';
import CalendarView from '../view/screens/main/CalendarView';

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
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Insights') {
            iconName = focused ? 'analytics' : 'analytics-outline';
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
        name="Calendar"
        component={CalendarView}
        options={{ title: 'Calendar' }}
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
        name="Insights"
        component={Insights}
        options={{ title: 'Insights' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}