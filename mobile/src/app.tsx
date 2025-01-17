import { SafeAreaView } from 'react-native-safe-area-context'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Loading } from '@/components/loading'
import { SignIn } from './screens/sign-in'
import { SignUp } from './screens/sign-up'

import '../global.css'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView className="flex-1">
        {fontsLoaded ? <SignUp /> : <Loading />}
      </SafeAreaView>
    </GluestackUIProvider>
  )
}
