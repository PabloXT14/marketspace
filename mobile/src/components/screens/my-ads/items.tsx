import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'

import type { ProductDTO } from '@/dtos/product'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { ProductCard } from '@/components/product-card'
import { ListEmpty } from '@/components/list-empty'

export type Product = ProductDTO & {
  seller: string
  sellerImageUrl: string
  imageUrl: string
}

type ItemsProps = {
  data: Product[]
}

export function Items({ data }: ItemsProps) {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  const [products, setProducts] = useState<Product[]>(data)

  function handleNavigateToAdDetail(adId: string) {
    navigate.navigate('adDetails', { adId })
  }

  return (
    <VStack className="flex-1 gap-6">
      {/* PRODUCTS */}
      <VStack className="flex-1">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            // CHECK IF THE NUMBER OF PRODUCTS IS ODD AND IS THE LAST ITEM
            if (products.length % 2 !== 0 && index === products.length - 1) {
              return (
                <>
                  <ProductCard
                    data={item}
                    className="flex-1"
                    onPress={() => handleNavigateToAdDetail(item.id)}
                  />

                  <View className="flex-1" />
                </>
              )
            }

            return (
              <ProductCard
                data={item}
                className="flex-1"
                onPress={() => handleNavigateToAdDetail(item.id)}
              />
            )
          }}
          numColumns={2}
          columnWrapperClassName="gap-6"
          contentContainerStyle={
            products.length === 0
              ? { flex: 1 }
              : {
                  gap: 20,
                  paddingBottom: 100,
                }
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Nenhum produto encontrado" />
          )}
        />
      </VStack>
    </VStack>
  )
}
