import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const isAuthenticated = false

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <NavigationContainer>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </SafeAreaView>
  )
}
