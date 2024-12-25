import React from "react";
import { View, Text, StyleSheet } from "react-native";
const attendanceData = [
  0, 1, 1, 1, 2, 1, 0, // First week
  0, 1, 1, 2, 1, 1, 1, // Second week
  0, 1, 1, 1, 1, 1, 0, // Third week
  0, 1, 0, 0, 0, 0, 0, // Fourth week
  0, 0, 0,// anydays after that
];
const month = 12; // Current month
const year = 2024;

const MonthlyAttendanceCard = ({ month, year, attendanceData }) => {
  // Generate an array of days for the given month
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  // Get the last day of the month to determine the overflow days (next month days)
  const lastDayOfMonth = new Date(year, month, 0).getDay();

  // Get the number of previous month's overflow days (days before the 1st of the current month)
  const prevMonthDays = new Date(year, month - 1, 0).getDate();
  const emptyDaysBefore = firstDayOfMonth;  // Number of empty days at the start of the month

  // Calculate how many days from the next month are needed to complete the last row
  const emptyDaysAfter = 6 - lastDayOfMonth;

  // Create an array of weekday names
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Create an array of empty days for alignment in the first week
  const prevMonthOverflowDays = Array.from(
    { length: emptyDaysBefore },
    (_, i) => prevMonthDays - emptyDaysBefore + i + 1
  );

  // Group days into weeks (7 days per week)
  const weeks = [];
  let currentWeek = [...prevMonthOverflowDays, ...daysArray];

  // Add empty cells after the last day to ensure the grid is full
  const emptyCellsAfter = Array.from({ length: emptyDaysAfter }, () => null);

  // Now divide the full array into weeks, excluding next month's days
  currentWeek = [...currentWeek, ...emptyCellsAfter];

  while (currentWeek.length) {
    weeks.push(currentWeek.splice(0, 7));
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Attendance for {getMonthName(month)} {year}
      </Text>
      <View style={styles.grid}>
        {/* Render weekday names */}
        {weekdays.map((weekday, index) => (
          <View key={index} style={styles.dayBox}>
            <Text style={styles.dayText}>{weekday}</Text>
          </View>
        ))}
        {/* Render days of the month in weeks */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              const isCurrentMonthDay = day >= 1 && day <= daysInMonth;

              // Only show days that belong to the current month
              const dayColor = isCurrentMonthDay
                ? getBoxColor(attendanceData[day - 1] || 0)
                : "transparent"; // Transparent for non-month days

              return (
                <View
                  key={dayIndex}
                  style={[
                    styles.dayBox,
                    {
                      backgroundColor: dayColor,
                      opacity: isCurrentMonthDay ? 1 : 0, // Hide non-month days
                    },
                  ]}
                >
                  {isCurrentMonthDay && <Text style={styles.dayText}>{day}</Text>}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

// Utility function to get the month name
const getMonthName = (month) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1];
};

// Utility function to determine the color of a box
const getBoxColor = (status) => {
  if (status === 0) return "#ebedf0"; // Light grey for absent
  if (status === 1) return "#c6e48b"; // Light green for present
  if (status === 2) return "#fbc02d"; // Yellow for holiday
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dayBox: {
    width: 30,
    height: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  dayText: {
    fontSize: 12,
    color: "#000",
  },
});

export default MonthlyAttendanceCard;

