import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useDebounce } from '@uidotdev/usehooks'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Header } from '@/components/screens/home/header'
import { Sell } from '@/components/screens/home/sell'
import { Items } from '@/components/screens/home/items'
import { ToastMessage } from '@/components/toast-message'
import { Input, InputField } from '@/components/input'
import { Filter } from '@/components/screens/home/filter'
import { Loading } from '@/components/loading'

import { colors } from '@/styles/colors'
import { useToast } from '@/components/ui/toast'

import { getProducts, type GetProductsRequest } from '@/https/get-products'
import type { AllowedPaymentMethods, ProductDTO } from '@/dtos/product'

export type FilterOptions = {
  is_new: boolean
  accept_trade: boolean
  payment_methods: AllowedPaymentMethods[]
}

export function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    is_new: true,
    accept_trade: false,
    payment_methods: ['pix', 'card', 'deposit', 'cash', 'boleto'],
  })

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function fetchProducts({
    is_new,
    accept_trade,
    payment_methods,
    query,
  }: GetProductsRequest) {
    try {
      setIsLoading(true)

      const { products } = await getProducts({
        is_new,
        accept_trade,
        payment_methods,
        query,
      })

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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts({
      is_new: filterOptions.is_new,
      accept_trade: filterOptions.accept_trade,
      payment_methods: filterOptions.payment_methods,
      query: debouncedSearch,
    })
  }, [filterOptions, debouncedSearch])

  return (
    <VStack className="flex-1 gap-10 pt-9 px-6 bg-gray-200">
      <Header />

      <Sell />

      <VStack className="flex-1 gap-6">
        <VStack className="gap-3">
          {/* TITLE */}
          <Text className="text-gray-500 text-sm font-regular leading-snug">
            Compre produtos variados
          </Text>

          {/* SEARCH */}
          <Input>
            <InputField
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar anúncio"
            />

            <TouchableOpacity>
              <MagnifyingGlass
                size={20}
                color={colors.gray[600]}
                weight="bold"
              />
            </TouchableOpacity>

            {/* DIVIDER */}
            <View className="w-px h-6 mx-2 bg-gray-400" />

            <Filter
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
          </Input>
        </VStack>

        {isLoading ? <Loading /> : <Items data={products} />}
      </VStack>
    </VStack>
  )
}
