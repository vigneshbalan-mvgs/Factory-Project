import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '@/const/colors'; // Import colors from colors.js
import * as Animatable from 'react-native-animatable'; // Import Animatable

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
      approved: false,  // Approve status for testing
    },
    {
      test_id: 'T002',
      date: '2024-12-22',
      test_type: 'Production Details',
      quantity: 120,
      produced: 110,
      weight: '550kg',
      expected_weight: '600kg',
      approved: false,
    },
    {
      test_id: 'T003',
      date: '2024-12-25',
      test_type: 'Production Details',
      quantity: 90,
      produced: 85,
      weight: '425kg',
      expected_weight: '450kg',
      approved: false,
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

  // Function to approve a quality test
  const approveTest = (test_id) => {
    setQualityTests(prevTests =>
      prevTests.map(test =>
        test.test_id === test_id ? { ...test, approved: true } : test
      )
    );
  };

  // Render function for quality test items (Updated to show production details)
  const renderTestItem = ({ item }) => (
    <Animatable.View
      animation="fadeInUp" // Animation on render
      duration={700}
      style={styles.testCard}
    >
      <Text style={styles.testCardText}>Name: UserName</Text>
      <Text style={styles.testCardText}>Quantity: {item.quantity}</Text>
      <Text style={styles.testCardText}>Produced: {item.produced}</Text>
      <Text style={styles.testCardText}>Weight: {item.weight}</Text>
      <Text style={styles.testCardText}>Expected Weight: {item.expected_weight}</Text>
      <TouchableOpacity
        style={[styles.approveButton, item.approved && styles.approvedButton]}
        onPress={() => approveTest(item.test_id)}
        disabled={item.approved}  // Disable if already approved
      >
        <Text style={styles.buttonText}>{item.approved ? 'Approved' : 'Approve'}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header animation */}
        <Animatable.Text animation="fadeInDown" duration={600} style={styles.header}>Machine Details</Animatable.Text>

        <Animatable.View animation="fadeInDown" duration={700} style={styles.card}>
          <Text style={styles.cardText}>Started: {machineDetails.started}</Text>
          <Text style={styles.cardText}>Stopped: {machineDetails.stopped}</Text>
          <Text style={styles.cardText}>Reason: {machineDetails.reason}</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" duration={700} style={styles.card}>
          <Text style={styles.cardText}>Status: {machineDetails.status}</Text>
          <Text style={styles.cardText}>Mold: {machineDetails.mold}</Text>
          <Text style={styles.cardText}>Material: {machineDetails.material}</Text>
        </Animatable.View>

        <Animatable.Text animation="fadeInDown" duration={600} style={styles.header}>Production Details</Animatable.Text>

        <FlatList
          data={qualityTests}
          keyExtractor={(item) => item.test_id}
          renderItem={renderTestItem}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={() => (

            <View style={{ height: 50 }}></View>
          )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use background color from colors.js
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: colors.primary, // Use primary color from colors.js
  },
  card: {
    backgroundColor: colors.cardBackground, // Use card background color from colors.js
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: colors.shadowColor, // Use shadow color from colors.js
    shadowOpacity: colors.shadowOpacity, // Use shadow opacity from colors.js
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: colors.elevation, // Use elevation from colors.js
  },
  cardText: {
    fontSize: 16,
    color: colors.text, // Use general text color from colors.js
    marginBottom: 5,
  },
  testCard: {
    backgroundColor: colors.cardBackground, // Use card background color from colors.js
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: colors.shadowColor, // Use shadow color from colors.js
    shadowOpacity: colors.shadowOpacity, // Use shadow opacity from colors.js
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: colors.elevation, // Use elevation from colors.js
  },
  testCardText: {
    fontSize: 16,
    color: colors.text, // Use general text color from colors.js
    marginBottom: 5,
  },
  approveButton: {
    backgroundColor: colors.primary, // Use primary color for button
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  approvedButton: {
    backgroundColor: colors.secondaryLight, // Use secondary light color for approved state
  },
  buttonText: {
    color: colors.buttonText, // Use button text color from colors.js
    fontWeight: 'bold',
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

