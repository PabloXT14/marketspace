import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { TouchableOpacity, View } from 'react-native'
import { Tag, ArrowRight } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { colors } from '@/styles/colors'

import { getUserProducts } from '@/https/get-user-products'
import type { ProductDTO } from '@/dtos/product'

export function Sell() {
  const [products, setProducts] = useState<ProductDTO[]>([])

  const navigate = useNavigation<AppRoutesNavigationProps>()

  async function fetchProducts() {
    const { products } = await getUserProducts()

    setProducts(products)
  }

  function handleNavigateToMyAds() {
    navigate.navigate('myProducts')
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts()
    }, [])
  )

  const countActiveProducts = products.filter(
    product => product.is_active
  ).length

  return (
    <VStack className="w-full gap-3">
      {/* TITLE */}
      <Text className="text-gray-500 text-sm font-regular leading-snug">
        Seus produtos anunciados para venda{' '}
      </Text>

      {/* INFO */}
      <HStack className="bg-blue-500/10 pl-5 pr-6 py-4 rounded-lg items-center justify-between">
        {/* ACTIVE */}
        <View className="flex-row items-center gap-4">
          <Tag size={24} color={colors.blue[800]} />

          <View>
            <Text className="text-gray-600 text-xl font-bold leading-snug">
              {countActiveProducts}
            </Text>
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              anúncios ativos
            </Text>
          </View>
        </View>

        {/* LINK */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row gap-2 items-center"
          onPress={handleNavigateToMyAds}
        >
          <Text className="text-blue-800 text-sm font-bold leading-snug">
            Meus anúncios
          </Text>

          <ArrowRight size={20} color={colors.blue[800]} />
        </TouchableOpacity>
      </HStack>
    </VStack>
  )
}
