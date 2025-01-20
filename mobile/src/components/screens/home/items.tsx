import { useState } from 'react'
import { FlatList } from 'react-native'

import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import type { ProductDTO } from '@/dtos/product'

import { ProductCard } from '@/components/product-card'
import { Search } from './search'
import { ListEmpty } from '@/components/list-empty'

const PRODUCTS: ProductDTO[] = [
  {
    id: '1',
    title: 'Tênis vermelho',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'used',
    seller: 'Vendedor 1',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '2',
    title: 'Bicicleta',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'new',
    seller: 'Vendedor 2',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '3',
    title: 'Camiseta',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'used',
    seller: 'Vendedor 3',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: false,
  },
  {
    id: '4',
    title: 'Bicicleta',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'new',
    seller: 'Vendedor 4',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '5',
    title: 'Camiseta',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'used',
    seller: 'Vendedor 5',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '6',
    title: 'Bicicleta',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'new',
    seller: 'Vendedor 6',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '7',
    title: 'Camiseta',
    price: 59.9,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'used',
    seller: 'Vendedor 7',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
  {
    id: '8',
    title: 'Bicicleta',
    price: 120,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    condition: 'new',
    seller: 'Vendedor 8',
    sellerImageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isAdActive: true,
  },
]

export function Items() {
  const [products, setProducts] = useState<ProductDTO[]>(PRODUCTS)

  return (
    <VStack className="flex-1 gap-6">
      <VStack className="gap-3">
        {/* TITLE */}
        <Text className="text-gray-500 text-sm font-regular leading-snug">
          Compre produtos variados
        </Text>

        <Search />
      </VStack>

      {/* PRODUCTS */}
      <VStack className="flex-1">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} className="flex-1" />
          )}
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
