import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getOnboardingStatus } from "./src/model/storage";
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
  return <AuthScreen/>;
}
