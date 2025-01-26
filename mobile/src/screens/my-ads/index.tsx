import { useState } from 'react'
import { VStack } from '@/components/ui/vstack'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { Items, type Product } from '@/components/screens/my-ads/items'
import { Header } from '@/components/screens/my-ads/header'
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

export function MyAds() {
  const [selectOptions, setSelectOptions] = useState([
    { label: 'Todos', value: 'all' },
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'inactive' },
  ])
  const [optionSelected, setOptionSelected] = useState(selectOptions[0])

  function handleSelectOption(value: string) {
    const option = selectOptions.find(o => o.value === value)
    if (option) {
      setOptionSelected(option)
    }
  }

  return (
    <VStack className="flex-1 pt-9 px-6">
      <Header />

      {/* AMOUNT AND FILTER */}
      <HStack className="items-center justify-between mb-8">
        <Text className="text-gray-600 text-sm font-regular leading-snug">
          9 anúncios
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

      <Items data={PRODUCTS} />
    </VStack>
  )
}
