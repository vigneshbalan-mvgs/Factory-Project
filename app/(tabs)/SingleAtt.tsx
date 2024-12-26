import { View, Text } from 'react-native'
import React from 'react'
import MonthlyAttendanceCard from '@/componant/Attendance'

const attendanceData = [
  0, 1, 1, 1, 2, 1, 0, // First week
  0, 1, 1, 2, 1, 1, 1, // Second week
  0, 1, 1, 1, 1, 1, 0, // Third week
  0, 1, 0, 0, 0, 0, 0, // Fourth week
  0, 0, 0,// anydays after that
];
const month = 12; // Current month
const year = 2024;



export default function () {
  return (
    <View>
      <MonthlyAttendanceCard attendanceData={attendanceData} month={month} year={year} />
    </View>
  )
}
