import { ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'

import { ProductImagesCarousel } from '@/components/screens/ad-details/product-images-carousel'
import { ProductInfo } from '@/components/screens/ad-details/product-info'
import { Footer } from '@/components/screens/ad-details/footer'

import { colors } from '@/styles/colors'

const PRODUCT_IMAGES = [
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
]

export function AdDetails() {
  return (
    <VStack className="flex-1">
      {/* GO BACK BUTTON */}
      <TouchableOpacity className="mx-6 mt-9 mb-3">
        <ArrowLeft size={24} color={colors.gray[700]} />
      </TouchableOpacity>

      <ProductImagesCarousel data={PRODUCT_IMAGES} />

      <ScrollView>
        <ProductInfo />
      </ScrollView>

      <Footer />
    </VStack>
  )
}
