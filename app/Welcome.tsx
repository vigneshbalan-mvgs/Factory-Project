import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "@/const/theme"; // Assuming you have a theme context
import { router } from "expo-router";

const SplashScreen = () => {
  const { isDarkMode } = useTheme(); // Dark mode state
  const [isCheckingLogin, setIsCheckingLogin] = useState(true); // For tracking loading state

  const checkLoginStatus = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedInValue === 'true') {
        router.replace("/(tabs)"); // Navigate to main app screen if logged in
      } else {
        router.replace("/Login"); // Navigate to welcome screen if not logged in
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      router.replace("/Login"); // Fallback to welcome screen if error occurs
    } finally {
      setIsCheckingLogin(false); // Set loading to false after check
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on splash screen load
  }, []);

  if (isCheckingLogin) {
    return (
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? "#000" : "#fff"
      }}>
        <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
        <Text style={{ color: isDarkMode ? "#fff" : "#000", marginTop: 20 }}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return null; // Nothing renders after the check completes and navigation happens
};

export default SplashScreen;

