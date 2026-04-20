import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getOnboardingStatus } from "./src/model/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";
// main screens
import MainTabs from "./src/navigation/MainTabs";
// onboarding screens
import Welcome from "./src/view/screens/onboard/Welcome";
import Intentions from "./src/view/screens/onboard/Intentions";
import Focus from "./src/view/screens/onboard/Focus";
import AuthScreen from "./src/view/screens/onboard/Authentication";
// secondary screens
import EditLog from "./src/view/screens/secondary/EditLog";
import LearnMore from "./src/view/screens/secondary/LearnMore";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);
  const [user, setUser] = useState(undefined);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadAppState = async () => {
      try {
        const onboarding = await getOnboardingStatus();
        setSetupComplete(onboarding.setupComplete);
      } catch (error) {
        console.error("Error loading onboarding state:", error);
        setSetupComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppState();
  }, []);

  if (isLoading || !authReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!setupComplete ? (
          <>
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
            <Stack.Screen
            name="Authentication"
            component={AuthScreen}
            />
          </>
        ) : !user ? (
          <Stack.Screen
          name="Authentication"
          component={AuthScreen}
          />
        ) : (
          <>
            <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            />
            <Stack.Screen
            name="EditLog"
            component={EditLog}
            />
            <Stack.Screen
            name="LearnMore"
            component={LearnMore}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
