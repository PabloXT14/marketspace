import { useCallback, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

import { ImagesCarousel } from '@/components/images-carousel'
import { ProductInfo } from '@/components/screens/ad-details/product-info'
import { ComumFooter } from '@/components/screens/ad-details/comum-footer'
import { MyAdFooter } from '@/components/screens/ad-details/my-ad-footer'
import { ToastMessage } from '@/components/toast-message'
import { Loading } from '@/components/loading'

import { useAuthStore } from '@/store/auth-store'
import { useToast } from '@/components/ui/toast'
import type { ProductDTO } from '@/dtos/product'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { getProductDetails } from '@/https/get-product-details'
import { api } from '@/services/api'

import { colors } from '@/styles/colors'
import { updateProductVisibility } from '@/https/update-product-visibility'
import { useProductStore } from '@/store/product-store'

type RouteParams = {
  adId: string
}

export function AdDetails() {
  const navigate = useNavigation<AppRoutesNavigationProps>()
  const route = useRoute()
  const user = useAuthStore(state => state.user)
  const { product: productStore, setProduct: setProductStore } =
    useProductStore(state => state)
  const toast = useToast()

  const { adId } = route.params as RouteParams

  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [isLoading, setIsLoading] = useState(true)

  const [isUpdating, setUpdating] = useState(false)

  function handleGoBack() {
    navigate.goBack()
  }

  function handleNavigateToEditAd() {
    navigate.navigate('editAd')
  }

  async function fetchProductDetails() {
    try {
      setIsLoading(true)

      const { product } = await getProductDetails({ id: adId })

      setProduct(product)
      setProductStore(product)
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Não foi possível carregar os dados do produto"
            description="Tente novamente ou mais tarde."
            onClose={() => toast.close(id)}
          />
        ),
      })

      setProduct({} as ProductDTO)
    } finally {
      setIsLoading(false)
    }
  }

  async function toggleProductVisibility() {
    try {
      setUpdating(true)

      await updateProductVisibility({
        id: product.id,
        is_active: !product.is_active,
      })

      setProduct({
        ...product,
        is_active: !product.is_active,
      })

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Visibilidade alterada com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      })
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title=" Não foi possível alterar a visibilidade do produto"
            description="Tente novamente ou mais tarde."
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setUpdating(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProductDetails()
    }, [adId])
  )

  if (!product.id || isLoading) {
    return <Loading />
  }

  const isMyAd = user?.id === product.user_id

  const productImagesFormatted = product.product_images.map(image => ({
    type: image.path.split('.').pop() || 'jpg',
    name: image.id,
    uri: `${api.defaults.baseURL}/images/${image.path}`,
  }))

  return (
    <VStack className="flex-1 bg-gray-200">
      {/* HEADER */}
      <HStack className="items-center px-6 mt-9 mb-3 justify-between">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} color={colors.gray[700]} />
        </TouchableOpacity>

        {isMyAd && productStore.id && (
          <TouchableOpacity onPress={handleNavigateToEditAd}>
            <PencilSimpleLine size={24} color={colors.gray[700]} />
          </TouchableOpacity>
        )}
      </HStack>

      <ImagesCarousel data={productImagesFormatted} />

      <ScrollView>
        <ProductInfo data={product} />
      </ScrollView>

      {isMyAd ? (
        <MyAdFooter
          productId={product.id}
          isAdActive={product.is_active!}
          isUpdating={isUpdating}
          onToggleVisibility={toggleProductVisibility}
        />
      ) : (
        <ComumFooter
          data={{
            productPrice: product.price,
            ownerPhone: product.user.tel,
          }}
        />
      )}
    </VStack>
  )
}
