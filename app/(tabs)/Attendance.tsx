import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { faker } from '@faker-js/faker'; // Ensure correct import
import RNDateTimePicker from '@react-native-community/datetimepicker'; // Use RNDateTimePicker for the date picker

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Generate fake attendance data
  const generateFakeAttendanceData = () => {
    const fakeData = [];
    for (let i = 0; i < 20; i++) {
      fakeData.push({
        id: i + 1,
        name: faker.person.firstName(),
        job: faker.person.jobTitle(),
        status: Math.random() > 0.5,  // Random boolean for present or absent
        date: selectedDate,
      });
    }
    return fakeData;
  };

  const fetchAttendance = () => {
    setLoading(true);
    const data = generateFakeAttendanceData();
    setAttendanceData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]); // Re-fetch attendance data when the date changes

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
      style={[styles.attendanceItem, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }]} // Alternate row color
    >
      <View style={styles.row}>
        <Text style={[styles.cell, styles.headerCell]}>{item.id}</Text>
        <Text style={[styles.cell, styles.headerCell]}>{item.name}</Text>
        <Text style={[styles.cell, styles.headerCell]}>{item.job}</Text>
        <Text style={[styles.cell, styles.statusCell, { color: item.status ? '#007AFF' : '#FF0000' }]}>
          {item.status ? ' Present' : ' Absent'}
        </Text>
      </View>
    </Animatable.View>
  );

  const setDate = (event, date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date); // Update the selected date
    }
    setShowDatePicker(false); // Hide the date picker
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance</Text>

      {/* Button to show the date picker */}
      <Button title={selectedDate.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />

      {/* DatePicker rendering */}
      {showDatePicker && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={setDate}
        />
      )}

      {/* Loading spinner or attendance data */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={attendanceData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAttendanceItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
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
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
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
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  cell: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statusCell: {
    color: '#007AFF',
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

