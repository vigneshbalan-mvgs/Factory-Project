import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/const/colors'; // Import colors from colors.js
import { router } from "expo-router";
import * as Animatable from 'react-native-animatable'; // Import Animatable

const { width } = Dimensions.get('window');

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
    <Animatable.View
      animation="fadeInUp" // Example animation
      duration={500} // Duration of the animation
      style={[styles.card, { backgroundColor: colors.cardBackground }]}
    >
      <TouchableOpacity onPress={() => MachineDetails(item.id)}>
        <Text style={[styles.machineName, { color: colors.primary }]}>
          {item.name}
        </Text>
        <Text style={[styles.machineStatus, { color: colors[item.status.toLowerCase()] }]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.primary }]}>Machine List</Text>
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
    padding: 10,
  },
  heading: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: colors.shadowColor,
    shadowOpacity: colors.shadowOpacity,
    shadowRadius: 4,
    elevation: colors.elevation,
    borderColor: colors.borderColor,
    borderWidth: colors.borderWidth,
  },
  machineName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  machineStatus: {
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});

