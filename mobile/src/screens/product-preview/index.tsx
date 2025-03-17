import { useCallback, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { ArrowLeft, Tag } from 'phosphor-react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { isEqual } from 'lodash'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { ImagesCarousel } from '@/components/images-carousel'
import { ProductInfo } from '@/components/screens/product-preview/product-info'
import { Button, ButtonText } from '@/components/button'
import { ToastMessage } from '@/components/toast-message'

import { colors } from '@/styles/colors'

import type {
  AppRoutesNavigationProps,
  AppRoutesProps,
} from '@/routes/app.routes'
import type { AllowedPaymentMethods } from '@/dtos/product'

import { useToast } from '@/components/ui/toast'
import { createProduct } from '@/https/create-product'
import { createProductImages } from '@/https/create-product-images'
import { updateProduct } from '@/https/update-product'
import { useProductStore } from '@/store/product-store'
import { api } from '@/services/api'
import { deleteProductImages } from '@/https/delete-product-images'
import { isAxiosError } from 'axios'

type RouteParams = {
  action: AppRoutesProps['productPreview']['action']
}

export function ProductPreview() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigation<AppRoutesNavigationProps>()
  const route = useRoute()
  const toast = useToast()

  const product = useProductStore(state => state.product)
  const productPreview = useProductStore(state => state.productPreview)

  const { action } = route.params as RouteParams

  function handleGoBack() {
    navigate.goBack()
  }

  async function handleUpdateAdImages() {
    // Comparando imagens atuais e novas do produto
    const currentImages = product.product_images.map(image => image)
    const newImages = productPreview.images

    const imagesToRemove = currentImages.filter(
      img =>
        !newImages.some(
          newImg => newImg.uri === `${api.defaults.baseURL}/images/${img.path}`
        )
    )

    const imagesToAdd = newImages.filter(
      newImg =>
        !currentImages.some(
          img => `${api.defaults.baseURL}/images/${img.path}` === newImg.uri
        )
    )

    // Removendo imagens que não estão mais na lista de imagens do produto
    if (imagesToRemove.length > 0) {
      await deleteProductImages({
        productImagesIds: imagesToRemove.map(image => image.id),
      })
    }

    // Criando novas imagens
    if (imagesToAdd.length > 0) {
      await createProductImages({
        data: {
          product_id: product.id,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          images: imagesToAdd as any,
        },
      })
    }
  }

  async function handleCreateAd() {
    try {
      setIsSubmitting(true)

      const numericPrice = Number(
        productPreview.price.toString().replace(',', '.')
      )

      const { product } = await createProduct({
        name: productPreview.title,
        description: productPreview.description,
        price: numericPrice,
        is_new: productPreview.condition === 'new',
        accept_trade: productPreview.acceptTrade,
        payment_methods:
          productPreview.paymentMethods as AllowedPaymentMethods[],
      })

      const { images } = await createProductImages({
        data: {
          product_id: product.id,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          images: productPreview.images as any,
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

      navigate.navigate('myProducts')
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
    try {
      setIsSubmitting(true)

      const numericPrice = Number(
        productPreview.price.toString().replace(',', '.')
      )
      const isNew = productPreview.condition === 'new'
      const paymentMethods =
        productPreview.paymentMethods as AllowedPaymentMethods[]

      await updateProduct({
        product_id: product.id,
        data: {
          name:
            productPreview.title === product.name
              ? undefined
              : productPreview.title,
          description:
            productPreview.description === product.description
              ? undefined
              : productPreview.description,
          price: numericPrice === product.price ? undefined : numericPrice,
          is_new: isNew === product.is_new ? undefined : isNew,
          accept_trade:
            productPreview.acceptTrade === product.accept_trade
              ? undefined
              : productPreview.acceptTrade,
          payment_methods: isEqual(paymentMethods, product.payment_methods)
            ? undefined
            : paymentMethods,
        },
      })

      await handleUpdateAdImages()

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Produto atualizado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      })

      navigate.navigate('myProducts')
    } catch (error) {
      console.log(error)

      const errorMessage =
        (isAxiosError(error) && error.response?.data?.message) ||
        'Tente novamente ou mais tarde'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao atualizar o anúncio!"
            description={errorMessage}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
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

  // console.log('CURRENT PRODUCT: ', product)
  // console.log('PREVIEW PRODUCT: ', productPreview)

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

      <ImagesCarousel data={productPreview?.images} />

      <ScrollView>
        <ProductInfo data={productPreview} />
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
