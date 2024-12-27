import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function () {
  console.log("Quality")
  return (
    <View>
      <Text></Text>
      <TouchableOpacity onPress={() => router.push('/Quality/Machine')}>
        <Text>Machine</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Quality/SingleAtt')}>
        <Text>Attendance</Text>
      </TouchableOpacity>
    </View>
  )
}
