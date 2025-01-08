import { ActivityIndicator, Text, View } from 'react-native'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { WhatsappLogo } from 'phosphor-react-native'
import Logo from '@/assets/logo.svg'

import '../global.css'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      {fontsLoaded ? (
        <View className="flex-1 justify-center items-center">
          <Logo width={100} height={100} />

          <WhatsappLogo size={32} />

          <Text className="text-md font-bold text-blue-500">Hello World</Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" className="text-gray-700" />
        </View>
      )}
    </GluestackUIProvider>
  )
}
