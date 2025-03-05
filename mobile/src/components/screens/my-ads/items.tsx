import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'

import type { ProductDTO } from '@/dtos/product'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { ProductCard } from '@/components/product-card'
import { ListEmpty } from '@/components/list-empty'

type ItemsProps = {
  data: ProductDTO[]
}

const NUMBER_OF_COLUMNS = 2

export function Items({ data }: ItemsProps) {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  const [products, setProducts] = useState<ProductDTO[]>([])

  function handleNavigateToAdDetail(adId: string) {
    navigate.navigate('adDetails', { adId })
  }

  useEffect(() => {
    setProducts(data)
  }, [data])

  return (
    <VStack className="flex-1 gap-6">
      {/* PRODUCTS */}
      <VStack className="flex-1">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            // CHECK IF THE NUMBER OF PRODUCTS ISN'T DIVISIBLE BY NUMBER OF COLUMNS, AND IF IS THE LAST ITEM
            if (
              index === products.length - 1 &&
              products.length % NUMBER_OF_COLUMNS !== 0
            ) {
              return (
                <>
                  <ProductCard
                    data={item}
                    className="flex-1"
                    onPress={() => handleNavigateToAdDetail(item.id)}
                  />

                  {Array.from({
                    length:
                      NUMBER_OF_COLUMNS - (products.length % NUMBER_OF_COLUMNS),
                  }).map((_, index) => (
                    <View key={`empty-box-${index + 1}`} className="flex-1" />
                  ))}
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
