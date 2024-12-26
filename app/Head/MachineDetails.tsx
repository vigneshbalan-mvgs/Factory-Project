import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const AdminView = () => {
  const [machineDetails, setMachineDetails] = useState({});
  const [qualityTests, setQualityTests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Static machine details with mold and material as main focus
  const staticMachineDetails = {
    machine_id: 'M001',
    date: '2024-12-26',
    status: 'Running',
    time: '10:00 AM',
    started: '2024-12-26',
    stopped: '2024-12-26',
    reason: 'Scheduled Maintenance',
    mold: 'Mold 1024',
    material: 'Aluminum',
    quantity: 100, // Now reflecting the quantity of products being processed
    product: 'Product A',
    expected_weight: '500kg',
  };

  // Static quality tests for the machine (Updated fields)
  const staticQualityTests = [
    {
      test_id: 'T001',
      date: '2024-12-20',
      test_type: 'Production Details',
      quantity: 100, // Number of units produced
      produced: 95,   // Number of units produced successfully
      weight: '475kg', // Actual weight produced
      expected_weight: '500kg', // Expected weight
    },
    {
      test_id: 'T002',
      date: '2024-12-22',
      test_type: 'Production Details',
      quantity: 120,
      produced: 110,
      weight: '550kg',
      expected_weight: '600kg',
    },
    {
      test_id: 'T003',
      date: '2024-12-25',
      test_type: 'Production Details',
      quantity: 90,
      produced: 85,
      weight: '425kg',
      expected_weight: '450kg',
    },
  ];

  // Simulating loading and static data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMachineDetails(staticMachineDetails);
      setQualityTests(staticQualityTests);
      setLoading(false);
    }, 1000); // Simulating a delay
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Render function for quality test items (Updated to show production details)
  const renderTestItem = ({ item }) => (
    <View style={styles.testCard}>
      <Text style={styles.testTitle}>Test ID: {item.test_id}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Test Type: {item.test_type}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Produced: {item.produced}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Expected Weight: {item.expected_weight}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Machine Details</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Machine ID: {machineDetails.machine_id}</Text>
        <Text>Date: {machineDetails.date}</Text>
        <Text>Status: {machineDetails.status}</Text>
        <Text>Time: {machineDetails.time}</Text>
        <Text>Started: {machineDetails.started}</Text>
        <Text>Stopped: {machineDetails.stopped}</Text>
        <Text>Reason: {machineDetails.reason}</Text>
        <Text>Mold: {machineDetails.mold}</Text>
        <Text>Material: {machineDetails.material}</Text>
        <Text>Quantity: {machineDetails.quantity}</Text> {/* Quantity is related to production */}
        <Text>Product: {machineDetails.product}</Text>
        <Text>Expected Weight: {machineDetails.expected_weight}</Text>
      </View>

      <Text style={styles.header}>Production Details</Text>
      <FlatList
        data={qualityTests}
        keyExtractor={(item) => item.test_id}
        renderItem={renderTestItem}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#343a40',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default AdminView;

