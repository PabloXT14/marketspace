import { Text, View } from 'react-native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import { Loading } from '@/components/loading'
import { Button, ButtonText } from '@/components/button'

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
          <Logo />

          <Button className="w-4/5">
            <ButtonText>Entrar</ButtonText>
          </Button>
        </View>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  )
}
