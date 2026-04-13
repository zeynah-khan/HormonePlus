import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, StatusBar } from 'react-native';

export default function Screen({
  children,
  scrollable = true,
  style = {},
  contentContainerStyle = {},
}) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          style={styles.container}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.inner, style]}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, styles.inner, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F3FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F3FA',
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});