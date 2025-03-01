import React, { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MagnifyingGlass } from 'phosphor-react-native'

import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import type { ProductDTO } from '@/dtos/product'

import { ProductCard } from '@/components/product-card'
import { ListEmpty } from '@/components/list-empty'
import { Input, InputField } from '@/components/input'
import { Filter } from './filter'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { colors } from '@/styles/colors'

type ItemsProps = {
  data: ProductDTO[]
}

const NUMBER_OF_COLUMNS = 2

export function Items({ data: products }: ItemsProps) {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  function handleNavigateToAdDetail(adId: string) {
    navigate.navigate('adDetails', { adId })
  }

  return (
    <VStack className="flex-1 gap-6">
      <VStack className="gap-3">
        {/* TITLE */}
        <Text className="text-gray-500 text-sm font-regular leading-snug">
          Compre produtos variados
        </Text>

        {/* SEARCH */}
        <Input>
          <InputField placeholder="Buscar anúncio" />

          <TouchableOpacity>
            <MagnifyingGlass size={20} color={colors.gray[600]} weight="bold" />
          </TouchableOpacity>

          {/* DIVIDER */}
          <View className="w-px h-6 mx-2 bg-gray-400" />

          <Filter />
        </Input>
      </VStack>

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
