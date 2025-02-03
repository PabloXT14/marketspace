import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Routes() {
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
