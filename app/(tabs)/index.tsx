import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import useUserData from '@/hooks/userData'; // Import the custom hook
import { useTheme } from '@/const/theme';
import HomaPage from '@/componant/HomaPage';

export default function App() {
  const { colors } = useTheme();
  const { userData, loading } = useUserData(); // Use the custom hook


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: colors.text, marginTop: 20 }}>
          Name: {userData.name}
        </Text>
        <Text style={{ color: colors.text }}>Role: {userData.role}</Text>
        <Text style={{ color: colors.text }}>ID: {userData.id}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <HomaPage role={userData.role} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

