import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function MachineDetails() {
  const [machineStarted, setMachineStarted] = useState(false);
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [mold, setMold] = useState(null);
  const [material, setMaterial] = useState(null);
  const [stopReason, setStopReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);

  const molds = [
    { label: 'Mold A', value: 'mold_a' },
    { label: 'Mold B', value: 'mold_b' },
    { label: 'Mold C', value: 'mold_c' },
  ];

  const materials = [
    { label: 'Material X', value: 'material_x' },
    { label: 'Material Y', value: 'material_y' },
    { label: 'Material Z', value: 'material_z' },
  ];

  const reasons = [
    { label: 'Shift Ended', value: 'shift_ended' },
    { label: 'Maintenance Required', value: 'maintenance_required' },
    { label: 'Power Failure', value: 'power_failure' },
    { label: 'Other', value: 'other' },
  ];

  const handleStart = () => {
    if (mold && material) {
      setMachineStarted(true);
      setStartTime(new Date().toLocaleString());
      setStartModalVisible(false);
    } else {
      alert('Please select both mold and material!');
    }
  };

  const handleStop = () => {
    if (stopReason) {
      if (stopReason !== 'other' || customReason.trim()) {
        setMachineStarted(false);
        setStopTime(new Date().toLocaleString());
        setStopModalVisible(false);
        setStopReason('');
        setCustomReason('');
      } else {
        alert('Please provide a custom reason!');
      }
    } else {
      alert('Please select a reason for stopping!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Machine Details</Text>
      <Text style={styles.status}>
        Status: {machineStarted ? 'Running' : 'Stopped'}
      </Text>
      {startTime && (
        <>
          <Text style={styles.detail}>Started At: {startTime} , {mold}, {material} </Text>
          <Text style={styles.detail}>{mold} </Text>
          <Text style={styles.detail}>{material} </Text>
        </>
      )}
      {stopTime && <Text style={styles.detail}>Stopped At: {stopTime}</Text>}

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.button, machineStarted && styles.disabledButton]}
        onPress={() => setStartModalVisible(true)}
        disabled={machineStarted}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      {/* Stop Button */}
      <TouchableOpacity
        style={[styles.button, !machineStarted && styles.disabledButton]}
        onPress={() => setStopModalVisible(true)}
        disabled={!machineStarted}
      >
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>

      {/* Start Modal */}
      <Modal
        visible={startModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Details to Start</Text>

            {/* Dropdown for Mold */}
            <Dropdown
              style={styles.dropdown}
              data={molds}
              labelField="label"
              valueField="value"
              placeholder="Select Mold"
              value={mold}
              onChange={(item) => setMold(item.value)}
            />

            {/* Dropdown for Material */}
            <Dropdown
              style={styles.dropdown}
              data={materials}
              labelField="label"
              valueField="value"
              placeholder="Select Material"
              value={material}
              onChange={(item) => setMaterial(item.value)}
            />

            <TouchableOpacity
              style={[styles.button, (!mold || !material) && styles.disabledButton]}
              onPress={handleStart}
              disabled={!mold || !material}
            >
              <Text style={styles.buttonText}>Confirm and Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Stop Modal */}
      <Modal
        visible={stopModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Reason for Stopping</Text>

            {/* Dropdown for Reason */}
            <Dropdown
              style={styles.dropdown}
              data={reasons}
              labelField="label"
              valueField="value"
              placeholder="Select Reason"
              value={stopReason}
              onChange={(item) => setStopReason(item.value)}
            />

            {/* Input for Custom Reason */}
            {stopReason === 'other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter Custom Reason"
                value={customReason}
                onChangeText={(text) => setCustomReason(text)}
              />
            )}

            <TouchableOpacity
              style={[
                styles.button,
                !stopReason ||
                (stopReason === 'other' && !customReason.trim()) &&
                styles.disabledButton,
              ]}
              onPress={handleStop}
              disabled={!stopReason || (stopReason === 'other' && !customReason.trim())}
            >
              <Text style={styles.buttonText}>Confirm and Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

