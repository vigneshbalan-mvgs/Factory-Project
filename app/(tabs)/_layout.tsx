import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/const/theme'; // Import the useTheme hook

export default function TabScreen() {
  const { isDarkMode, colors } = useTheme(); // Get the current theme state

  // Define styles that change based on the theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff', // Dark or light mode
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      </Stack>
    </SafeAreaView >
  );
}

