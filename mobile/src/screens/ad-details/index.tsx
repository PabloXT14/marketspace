import { ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

import { type ImageProps, ImagesCarousel } from '@/components/images-carousel'
import { ProductInfo } from '@/components/screens/ad-details/product-info'
import { ComumFooter } from '@/components/screens/ad-details/comum-footer'
import { MyAdFooter } from '@/components/screens/ad-details/my-ad-footer'

import type { ProductDTO } from '@/dtos/product'

import { colors } from '@/styles/colors'

const PRODUCT: ProductDTO & { images: ImageProps[] } = {
  id: '1',
  name: 'Bicicleta',
  description:
    'Descrição do produto, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  price: 59.9,
  images: [
    {
      id: '1',
      uri: 'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlrZXxlbnwwfDB8MHx8fDA%3D',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXxlbnwwfDB8MHx8fDA%3D',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
  is_new: true,
  is_active: true,
  accept_trade: true,
  payment_methods: ['boleto', 'pix', 'cash', 'card', 'deposit'],
  user_id: '1',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export function AdDetails() {
  const loggedUserId = '1'

  const isMyAd = loggedUserId === PRODUCT.user_id

  return (
    <VStack className="flex-1">
      {/* HEADER */}
      <HStack className="items-center px-6 mt-9 mb-3 justify-between">
        <TouchableOpacity className="">
          <ArrowLeft size={24} color={colors.gray[700]} />
        </TouchableOpacity>

        {isMyAd && (
          <TouchableOpacity className="">
            <PencilSimpleLine size={24} color={colors.gray[700]} />
          </TouchableOpacity>
        )}
      </HStack>

      <ImagesCarousel data={PRODUCT.images} />

      <ScrollView>
        <ProductInfo data={PRODUCT} />
      </ScrollView>

      {isMyAd ? (
        <MyAdFooter isAdActive={PRODUCT.is_active} />
      ) : (
        <ComumFooter productPrice={PRODUCT.price} />
      )}
    </VStack>
  )
}
