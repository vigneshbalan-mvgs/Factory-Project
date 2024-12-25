import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const MachineCard = ({ machineData }) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (!machineData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <>
      <Animatable.View animation="fadeIn" duration={800} style={styles.cardContainer}>
        <Text style={styles.headerText}>Machine Details</Text>
        <View style={styles.detailSection}>
          <Text style={styles.detailText}><Text style={styles.boldText}>S.No:</Text> {machineData.S.no}</Text>
          <Text style={styles.detailText}><Text style={styles.boldText}>ID:</Text> {machineData._id}</Text>
          <Text style={styles.detailText}><Text style={styles.boldText}>Set Machine:</Text> {machineData.Set_Mc}</Text>
          <Text style={styles.detailText}><Text style={styles.boldText}>Set Mold:</Text> {machineData.Set_Md}</Text>
          <Text style={styles.detailText}><Text style={styles.boldText}>Start Date:</Text> {machineData.Start_D}</Text>
          <Text style={styles.detailText}><Text style={styles.boldText}>Start Time:</Text> {machineData.Start_T}</Text>
        </View>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.moreButtonText}>View QC Details</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.headerText}>QC Details</Text>
            {machineData.qc ? (
              <>
                <Text style={styles.detailText}><Text style={styles.boldText}>QC S.No:</Text> {machineData.qc["s.no"]}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Quality:</Text> {machineData.qc.quality}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Quantity:</Text> {machineData.qc.quantity}</Text>
                <Text style={styles.detailText}><Text style={styles.boldText}>Username:</Text> {machineData.qc.username}</Text>
              </>
            ) : (
              <Text style={styles.detailText}>No QC Data Available</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailSection: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  moreButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MachineCard;

