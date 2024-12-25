import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/const/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, ActivityIndicator, Text } from "react-native";
import React, { useState, useEffect } from "react";

function LoadingScreen({ isDarkMode }) {
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? "#000" : "#ffffff"
    }}>
      <ActivityIndicator size="large" color={isDarkMode ? "#ffffff" : "#000000"} />
      <Text style={{ color: isDarkMode ? "#ffffff" : "#000000", marginTop: 20 }}>
        Loading...
      </Text>
    </SafeAreaView>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#ffffff" }}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="Register" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

