import { useCallback, useState } from 'react'
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
import { ToastMessage } from '@/components/toast-message'

import { colors } from '@/styles/colors'

import type { CreateAdFormProps } from '@/components/screens/create-ad/form'
import type {
  AppRoutesNavigationProps,
  AppRoutesProps,
} from '@/routes/app.routes'
import type { AllowedPaymentMethods } from '@/dtos/product'

import { useToast } from '@/components/ui/toast'
import { createProduct } from '@/https/create-product'
import { createProductImages } from '@/https/create-product-images'

type RouteParams = {
  data: CreateAdFormProps
  action: AppRoutesProps['adPreview']['action']
}

export function AdPreview() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigation<AppRoutesNavigationProps>()
  const route = useRoute()
  const toast = useToast()

  const { data, action } = route.params as RouteParams

  function handleGoBack() {
    navigate.goBack()
  }

  async function handleCreateAd() {
    try {
      setIsSubmitting(true)

      const numericPrice = Number(data.price.toString().replace(',', '.'))

      const { product } = await createProduct({
        name: data.title,
        description: data.description,
        price: numericPrice,
        is_new: data.condition === 'new',
        accept_trade: data.acceptTrade,
        payment_methods: data.paymentMethods as AllowedPaymentMethods[],
      })

      const { images } = await createProductImages({
        data: {
          product_id: product.id,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          images: data.images as any,
        },
      })

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Anúncio criado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      })

      navigate.navigate('myAds')
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao criar anúncio!"
            description="Tente novamente ou mais tarde"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdateAd() {
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

        <Button
          className="flex-1"
          onPress={action === 'create' ? handleCreateAd : handleUpdateAd}
          isLoading={isSubmitting}
        >
          <Tag size={16} color={colors.gray[200]} />

          <ButtonText>Publicar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  )
}
