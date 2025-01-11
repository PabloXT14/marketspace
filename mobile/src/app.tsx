import { Text, View } from 'react-native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Loading } from '@/components/loading'
import { Input } from '@/components/input'
import { Checkbox } from '@/components/checkbox'

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
        <View className="flex-1 justify-center items-center p-4">
          <Logo />

          <View className="gap-4 w-full">
            <Input placeholder="Name" />

            <Input placeholder="Email" />

            <Checkbox value="test-1" label="Selection 1" />
            <Checkbox value="test-2" label="Selection 2" />
            <Checkbox value="test-3" label="Selection 3" />
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  )
}
