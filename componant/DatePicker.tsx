import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const setDate = (event: DateTimePickerEvent, date: Date | undefined) => {
    const { type } = event;
    if (type === 'set' && date) {
      setSelectedDate(date); // Set the selected date
    }
    setShowDatePicker(false); // Hide the date picker after selection
  };

  return (
    <View>

      {/* Button to show the date picker */}
      <Button title={selectedDate.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />

      {/* Conditionally render the date picker */}
      {showDatePicker && (
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={setDate}
        />
      )}
    </View>
  );
}

