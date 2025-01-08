import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Button, ButtonText } from '@/components/ui/button'

import '../global.css'

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Button action="positive">
          <ButtonText>Button</ButtonText>
        </Button>
      </View>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
