import { useTheme } from '@/const/theme'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native'

export default function () {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  )
}
