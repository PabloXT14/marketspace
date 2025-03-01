import { useEffect, useState } from 'react'

import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/home/header'
import { Sell } from '@/components/screens/home/sell'
import { Items } from '@/components/screens/home/items'
import { ToastMessage } from '@/components/toast-message'

import { useToast } from '@/components/ui/toast'

import { getProducts } from '@/https/get-products'
import type { ProductDTO } from '@/dtos/product'

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([])

  const toast = useToast()

  async function fetchProducts() {
    try {
      const { products } = await getProducts({})

      setProducts(products)
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Não foi possível carregar os produtos"
            description="Tente novamente ou mais tarde."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <VStack className="flex-1 gap-10 pt-9 px-6 bg-gray-200">
      <Header />

      <Sell />

      <Items data={products} />
    </VStack>
  )
}
