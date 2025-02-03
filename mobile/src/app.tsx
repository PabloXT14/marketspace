import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Loading } from '@/components/loading'
import { Routes } from './routes'

import '../global.css'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
