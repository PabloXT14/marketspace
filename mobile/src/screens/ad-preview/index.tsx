import { useCallback } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { ArrowLeft, Tag } from 'phosphor-react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { type ImageProps, ImagesCarousel } from '@/components/images-carousel'
import { ProductInfo } from '@/components/screens/ad-preview/product-info'
import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'

import type { ProductDTO } from '@/dtos/product'
import type { CreateAdFormProps } from '@/components/screens/create-ad/form'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

const PRODUCT: ProductDTO & { images: ImageProps[] } = {
  id: '1',
  name: 'Bicicleta',
  description:
    'Descrição do produto, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 45,
  images: [
    {
      id: '1',
      uri: 'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlrZXxlbnwwfDB8MHx8fDA%3D',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXxlbnwwfDB8MHx8fDA%3D',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
  is_new: false,
  is_active: true,
  accept_trade: true,
  payment_methods: ['boleto', 'pix', 'deposit'],
  user_id: '1',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

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

      <ImagesCarousel data={PRODUCT.images} />

      <ScrollView>
        <ProductInfo data={PRODUCT} />
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
