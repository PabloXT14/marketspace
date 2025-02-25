import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAuthStore } from '@/store/auth-store'
import { Loading } from '@/components/loading'

export function Routes() {
  const user = useAuthStore(state => state.user)
  const loadAuthData = useAuthStore(state => state.loadAuthData)
  const isLoading = useAuthStore(state => state.isLoading)

  useEffect(() => {
    loadAuthData()
  }, [user])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <NavigationContainer>
        {/* {user ? <AppRoutes /> : <AuthRoutes />} */}
        {<AuthRoutes />}
      </NavigationContainer>
    </SafeAreaView>
  )
}
