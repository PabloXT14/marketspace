import { useCallback } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/create-ad/header'
import { Form } from '@/components/screens/create-ad/form'

import { colors } from '@/styles/colors'

export function CreateAd() {
  useFocusEffect(
    useCallback(() => {
      // Configuração da StatusBar ao entrar na tela
      StatusBar.setBarStyle('dark-content')
      StatusBar.setBackgroundColor(colors.gray[200])

      return () => {
        // Restaurando a configuração global ao sair da tela
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
      }
    }, [])
  )

  return (
    <VStack className="bg-gray-200 flex-1 pt-9">
      <Header />

      <ScrollView>
        <Form />
      </ScrollView>
    </VStack>
  )
}
