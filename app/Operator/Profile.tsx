import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import useUserData from '@/hooks/userData'; // Import the custom hook
import { useTheme } from '@/const/theme';

export default function () {
  const { colors } = useTheme();
  const { userData, loading } = useUserData(); // Use the custom hook
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.text, marginTop: 20 }}>
          Name: {userData.name}
        </Text>
        <Text style={{ color: colors.text }}>
          Role: {userData.role}
        </Text>
        <Text style={{ color: colors.text }}>
          ID: {userData.id}
        </Text>
      </View>
    </View>
  );
}


