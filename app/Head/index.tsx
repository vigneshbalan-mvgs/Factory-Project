import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import useUserData from '@/hooks/userData';
import * as Animatable from 'react-native-animatable';

const HomePage = () => {
  const router = useRouter();
  const { userData, loading } = useUserData();

  const handleCardPress = (cardType) => {
    router.push({
      pathname: '/Head/Attendance',
      params: { cardType },
    });
  };

  const handleCardPress1 = (cardType) => {
    router.push({
      pathname: '/Head/Machine',
      params: { cardType },
    });
  };


  const handleCardPress2 = (cardType) => {
    router.push({
      pathname: '/Head/MachineCreate',
      params: { cardType },
    });
  };

  const signup = () => {
    router.push('/Register');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animatable.View animation="fadeInUpBig" style={styles.headerContainer}>
        <Text style={styles.heading}>Welcome to the  AppName</Text>
        <Text style={styles.userInfo}>
          {userData.name}
        </Text>
        <Text style={styles.userInfo}>
          {userData.id}, {userData.role}
        </Text>
      </Animatable.View>

      <View style={styles.container}>
        <Animatable.View animation="zoomIn" delay={500} style={styles.cardsContainer}>
          {/* Attendance Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('attendance')}
          >
            <Text style={styles.cardTitle}>Attendance</Text>
            <Text style={styles.cardContent}>
              Track employee attendance and hours worked.
            </Text>
          </TouchableOpacity>

          {/* Machine Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress1('machine')}
          >
            <Text style={styles.cardTitle}>Machine</Text>
            <Text style={styles.cardContent}>
              Manage and monitor machine performance and usage.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress2('machineCreate')}
          >
            <Text style={styles.cardTitle}>Create Machine</Text>
            <Text style={styles.cardContent}>
              Create a new machine,mold and material to manage.
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Soft blue gradient background
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: '#00796b', // Dark teal background for header
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // White text for contrast
  },
  userInfo: {
    fontSize: 18,
    color: '#e0f2f1', // Light teal color for secondary text
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 750,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    width: '90%',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e0f2f1', // Light border for separation
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s ease-in-out',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b', // Dark teal color for titles
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 15,
    color: '#607d8b', // Slightly muted grey-blue for content
  },
});

export default HomePage;

