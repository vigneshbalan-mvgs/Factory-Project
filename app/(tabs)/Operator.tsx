import { View, Text } from 'react-native'
import React from 'react'
import SingleAtt from './SingleAtt'
import EnterAttendance from '@/componant/EnterAttendance'

export default function () {
  return (
    <View style={{ flex: 1, height: '100%', alignItems: 'center' }}>
      <SingleAtt />
      <EnterAttendance />
    </View>
  )
}
