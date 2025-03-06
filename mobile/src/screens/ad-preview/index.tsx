import { useCallback } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { ArrowLeft, Tag } from 'phosphor-react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { ImagesCarousel } from '@/components/images-carousel'
import { ProductInfo } from '@/components/screens/ad-preview/product-info'
import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'

import type { CreateAdFormProps } from '@/components/screens/create-ad/form'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

type RouteParams = {
  data: CreateAdFormProps
}

export function AdPreview() {
  const navigate = useNavigation<AppRoutesNavigationProps>()
  const route = useRoute()

  const { data } = route.params as RouteParams

  function handleGoBack() {
    navigate.goBack()
  }

  function handleCreateAd() {
    console.log(data)
  }

  useFocusEffect(
    useCallback(() => {
      // Configuração da StatusBar ao entrar na tela
      StatusBar.setBarStyle('dark-content')
      StatusBar.setBackgroundColor(colors.blue[500])

      return () => {
        // Restaurando a configuração global ao sair da tela
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
      }
    }, [])
  )

  return (
    <VStack className="flex-1">
      {/* HEADER */}
      <VStack className="bg-blue-500 items-center pt-9 pb-4 gap-1">
        <Text className="text-gray-100 text-base font-bold leading-snug">
          Pré visualização do anúncio
        </Text>
        <Text className="text-gray-100 text-sm font-regular leading-snug">
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>

      <ImagesCarousel data={data?.images} />

      <ScrollView>
        <ProductInfo data={data} />
      </ScrollView>

      {/* FOOTER */}
      <HStack className="bg-gray-100 p-6 pt-5 pb-7 gap-3">
        <Button type="gray" className="flex-1" onPress={handleGoBack}>
          <ArrowLeft size={16} color={colors.gray[600]} />

          <ButtonText type="gray">Voltar e editar</ButtonText>
        </Button>

        <Button className="flex-1" onPress={handleCreateAd}>
          <Tag size={16} color={colors.gray[200]} />

          <ButtonText>Publicar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  )
}
