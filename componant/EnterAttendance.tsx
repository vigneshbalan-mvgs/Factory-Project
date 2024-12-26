import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install this package

// SingleAttendance Component for one person
const SingleAttendance = () => {
  const [status, setStatus] = useState(null); // null = no status, 'present' = present, 'absent' = absent
  const [name, setName] = useState(''); // To store the name fetched from AsyncStorage

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await AsyncStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    };

    fetchName();
  }, []); // Empty dependency array means it runs only once after the first render

  const handleToggle = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name || 'Loading name...'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, status === 'present' && styles.activeButton]}
          onPress={() => handleToggle('present')}
        >
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, status === 'absent' && styles.activeButton]}
          onPress={() => handleToggle('absent')}
        >
          <Text style={styles.buttonText}>Absent</Text>
        </TouchableOpacity>
      </View>
      {status && <Text style={styles.statusText}>Status: {status}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    width: 250,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#4CAF50', // Green for present
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SingleAttendance;

