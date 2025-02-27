import { useEffect } from 'react'

import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/home/header'
import { Sell } from '@/components/screens/home/sell'
import { Items } from '@/components/screens/home/items'

import { getProducts } from '@/https/get-products'

export function Home() {
  async function fetchProducts() {
    const { products } = await getProducts({})

    console.log('PRODUCTS: ', products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <VStack className="flex-1 gap-10 pt-9 px-6 bg-gray-200">
      <Header />

      <Sell />

      <Items />
    </VStack>
  )
}
