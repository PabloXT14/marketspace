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

type Product = ProductDTO & {
  seller: string
  sellerImageUrl: string
  imageUrl: string
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tênis vermelho',
    description: 'Tênis de corrida',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: false,
    is_active: true,
    accept_trade: false,
    user_id: '1',
    seller: 'Vendedor 1',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Bicicleta',
    description: 'Bicicleta de montanha',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: true,
    is_active: true,
    accept_trade: true,
    user_id: '2',
    seller: 'Vendedor 2',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Camiseta',
    description: 'Camiseta de futebol',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: false,
    is_active: false,
    accept_trade: false,
    user_id: '3',
    seller: 'Vendedor 3',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Bicicleta',
    description: 'Bicicleta de montanha',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: true,
    is_active: true,
    accept_trade: true,
    user_id: '4',
    seller: 'Vendedor 4',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Camiseta',
    description: 'Camiseta de futebol',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: false,
    is_active: true,
    accept_trade: false,
    user_id: '5',
    seller: 'Vendedor 5',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Bicicleta',
    description: 'Bicicleta de montanha',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: true,
    is_active: true,
    accept_trade: true,
    user_id: '6',
    seller: 'Vendedor 6',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Camiseta',
    description: 'Camiseta de futebol',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_new: false,
    is_active: true,
    accept_trade: false,
    user_id: '7',
    seller: 'Vendedor 7',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    payment_methods: ['card', 'boleto'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function Items() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)

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
