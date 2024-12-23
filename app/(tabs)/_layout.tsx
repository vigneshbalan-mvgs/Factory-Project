import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from '@/const/theme'; // Import the useTheme hook
import { Entypo, Ionicons } from '@expo/vector-icons'; // Import icons from Ionicons

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
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff', // Tab bar background color based on theme

          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),

            tabBarActiveTintColor: colors.active, // Custom active tab color
            tabBarInactiveTintColor: isDarkMode ? '#777' : '#888', // Inactive tab color
          }}
        />
        <Tabs.Screen
          name="Attendance"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.active, // Custom active tab color
            tabBarInactiveTintColor: isDarkMode ? '#777' : '#888', // Inactive tab color
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="time-slot" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.active, // Custom active tab color
            tabBarInactiveTintColor: isDarkMode ? '#777' : '#888', // Inactive tab color
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

