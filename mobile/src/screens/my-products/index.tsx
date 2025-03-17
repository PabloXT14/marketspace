import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { Items } from '@/components/screens/my-products/items'
import { Header } from '@/components/screens/my-products/header'
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
} from '@/components/select'
import { ToastMessage } from '@/components/toast-message'
import { useToast } from '@/components/ui/toast'

import { getUserProducts } from '@/https/get-user-products'
import type { ProductDTO } from '@/dtos/product'

export function MyProducts() {
  const [selectOptions, setSelectOptions] = useState([
    { label: 'Todos', value: 'all' },
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'inactive' },
  ])
  const [optionSelected, setOptionSelected] = useState(selectOptions[0])

  const [products, setProducts] = useState<ProductDTO[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function handleSelectOption(value: string) {
    const option = selectOptions.find(o => o.value === value)
    if (option) {
      setOptionSelected(option)
    }
  }

  const toast = useToast()

  async function fetchUserProducts() {
    try {
      setIsLoading(true)

      const { products } = await getUserProducts()

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

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts()
    }, [])
  )

  const filteredProducts = products.filter(product => {
    if (optionSelected.value === 'active' && product.is_active) {
      return product
    }

    if (optionSelected.value === 'inactive' && !product.is_active) {
      return product
    }

    if (optionSelected.value === 'all') {
      return product
    }
  })

  return (
    <VStack className="flex-1 pt-9 px-6 bg-gray-200">
      <Header />

      {/* AMOUNT AND FILTER */}
      <HStack className="items-center justify-between mb-8">
        <Text className="text-gray-600 text-sm font-regular leading-snug">
          {filteredProducts.length} anúncios
        </Text>

        <Select
          defaultValue={optionSelected.value}
          initialLabel={optionSelected.label}
          onValueChange={value => handleSelectOption(value)}
        >
          <SelectTrigger>
            <SelectInput placeholder="Filtrar por" />
            <SelectIcon />
          </SelectTrigger>

          <SelectPortal>
            <SelectBackdrop />

            <SelectContent>
              {selectOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </HStack>

      <Items data={filteredProducts} />
    </VStack>
  )
}
