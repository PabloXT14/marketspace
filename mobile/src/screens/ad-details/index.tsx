import { useRef } from 'react'
import { ScrollView, TouchableOpacity, Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, {
  Pagination,
  type ICarouselInstance,
} from 'react-native-reanimated-carousel'
import { ArrowLeft } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'
import { Image } from '@/components/ui/image'

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
  const carouselRef = useRef<ICarouselInstance>(null)

  const progress = useSharedValue(0)

  function onPressPagination(index: number) {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }

  return (
    <VStack className="flex-1">
      {/* GO BACK BUTTON */}
      <TouchableOpacity className="mx-6 mt-9 mb-3">
        <ArrowLeft size={24} color={colors.gray[700]} />
      </TouchableOpacity>

      {/* IMAGE CAROUSEL */}
      <View style={{ height: 280, position: 'relative' }}>
        <Carousel
          ref={carouselRef}
          data={PRODUCT_IMAGES}
          height={280}
          width={Dimensions.get('screen').width}
          loop={true}
          autoPlayInterval={2000}
          pagingEnabled={true}
          snapEnabled={true}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item.uri,
              }}
              alt="Product image"
              className="w-full h-full object-cover"
            />
          )}
          onProgressChange={progress}
        />

        <Pagination.Basic
          progress={progress}
          data={PRODUCT_IMAGES.map(item => item)}
          dotStyle={{
            flex: 1,
            height: 4,
            backgroundColor: colors.gray['100'],
            opacity: 0.5,
            borderRadius: 9999,
          }}
          activeDotStyle={{
            overflow: 'hidden',
            // backgroundColor: colors.blue[500],
            opacity: 0.75,
          }}
          containerStyle={{
            position: 'absolute',
            gap: 4,
            bottom: 4,
            paddingHorizontal: 4,
          }}
          horizontal
          // onPress={onPressPagination}
        />
      </View>

      <ScrollView>
        <ProductInfo />
      </ScrollView>

      <Footer />
    </VStack>
  )
}
