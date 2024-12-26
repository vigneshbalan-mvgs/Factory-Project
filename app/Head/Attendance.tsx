import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { faker } from '@faker-js/faker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState(null);

  const generateFakeAttendanceData = () => {
    try {
      const fakeData = [];
      for (let i = 0; i < 20; i++) {
        fakeData.push({
          id: i + 1,
          name: faker.person.firstName(),
          job: faker.person.jobTitle(),
          status: Math.random() > 0.5, // Random boolean for present or absent
          date: selectedDate,
        });
      }
      return fakeData;
    } catch (err) {
      setError('Failed to generate attendance data.');
      return [];
    }
  };

  const fetchAttendance = () => {
    setLoading(true);
    setError(null);
    const data = generateFakeAttendanceData();
    setAttendanceData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    fetchAttendance();
    setRefreshing(false);
  };

  const renderAttendanceItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      delay={index * 100}
      style={[styles.attendanceItem, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }]}
    >
      <View style={styles.row}>
        <Text style={[styles.cell, styles.headerCell, { width: '5%' }]}>{item.id}</Text>
        <Text style={[styles.cell, styles.headerCell, { width: '20%' }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.cell, styles.headerCell]} numberOfLines={1}>{item.job}</Text>
        <Text style={[styles.cell, styles.statusCell, { color: item.status ? '#007AFF' : '#FF0000' }]}>
          {item.status ? ' Present' : ' Absent'}
        </Text>
      </View>
    </Animatable.View>
  );

  const setDate = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
        accessibilityLabel="Select a date"
      >
        <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={setDate}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : attendanceData.length > 0 ? (
        <FlatList
          data={attendanceData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAttendanceItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No attendance data available for the selected date.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  attendanceItem: {
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statusCell: {
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

