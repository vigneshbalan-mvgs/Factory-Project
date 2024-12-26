import { router } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const machines = [
  { id: '1', name: 'Machine A', status: 'Running' },
  { id: '2', name: 'Machine B', status: 'Pending' },
  { id: '3', name: 'Machine C', status: 'Shutdown' },
  { id: '4', name: 'Machine D', status: 'Running' },
];


export default function MachineList() {

  const MachineDetails = ({ item }) => {
    router.push({ pathname: '/Head/MachineDetails', params: { machineId: item } });
  };



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => MachineDetails(item.id)}>
        <Text style={styles.machineName}>{item.name}</Text>
        <Text style={[styles.machineStatus, styles[item.status.toLowerCase()]]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Machine List</Text>
      <FlatList
        data={machines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  machineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  machineStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  running: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  shutdown: {
    color: 'red',
  },
});

