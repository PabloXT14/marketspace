import { ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'

import { ProductInfo } from '@/components/screens/ad-details/product-info'

import { colors } from '@/styles/colors'

export function AdDetails() {
  return (
    <VStack className="flex-1">
      {/* GO BACK BUTTON */}
      <TouchableOpacity className="mx-6 mt-9 mb-3">
        <ArrowLeft size={24} color={colors.gray[700]} />
      </TouchableOpacity>

      {/* PRODUCT IMAGE */}
      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        alt="Product image"
        className="w-full h-80 object-cover"
      />

      <ScrollView>
        <ProductInfo />
      </ScrollView>

      {/* FOOTER */}
      <VStack className="bg-gray-100">
        <Text>Footer</Text>
      </VStack>
    </VStack>
  )
}
