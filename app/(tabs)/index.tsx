import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import useUserData from '@/hooks/userData'; // Import the custom hook
import { useTheme } from '@/const/theme';
import HomePage from '@/componant/HomePage';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window'); // Screen width

export default function App() {
  const { colors } = useTheme();
  const { userData, loading } = useUserData(); // Use the custom hook

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          Hello, {userData.name}!
        </Text>
        <View style={styles.userInfo}>
          <Text style={[styles.infoText, { color: colors.text }]}>{userData.role}</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>{userData.id}</Text>
        </View>
      </Animatable.View>

      {/* Card Section */}
      <Animatable.View animation="fadeInUp" style={styles.card}>
        <HomePage role={userData.role} />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

