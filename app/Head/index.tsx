import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Use useRouter hook instead of router directly

const HomePage = () => {
  const router = useRouter(); // Use useRouter hook for navigation

  const handleCardPress = (cardType) => {
    // Navigate and send parameters based on the card pressed
    router.push({
      pathname: '/Head/Attendance', // Specify the page to navigate to
      params: { cardType }, // Pass parameters using query
    });
  };

  const handleCardPress1 = (cardType) => {
    // Navigate and send parameters based on the card pressed
    router.push({
      pathname: '/Head/Machine', // Specify the page to navigate to
      params: { cardType }, // Pass parameters using query
    });
  };



  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: "row",
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 650,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '45%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomePage;


