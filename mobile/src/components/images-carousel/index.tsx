import { useRef } from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, {
  type ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel'

import { Image } from '@/components/ui/image'

import { colors } from '@/styles/colors'

export type ImageProps = {
  id: string
  uri: string
}

type ImagesCarouselProps = {
  data: ImageProps[]
}

const SCREEN_WIDTH = Dimensions.get('screen').width

export function ImagesCarousel({ data }: ImagesCarouselProps) {
  const carouselRef = useRef<ICarouselInstance>(null)

  const progress = useSharedValue(0)

  function onPressPagination(index: number) {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }

  return (
    <View style={{ height: 280, position: 'relative' }}>
      <Carousel
        ref={carouselRef}
        data={data}
        loop
        height={280}
        width={SCREEN_WIDTH}
        style={{ width: SCREEN_WIDTH }}
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
        data={data}
        dotStyle={{
          width: SCREEN_WIDTH / data.length - 4 * (data.length - 1), // 4 = gap entre os dots
          height: 4,
          backgroundColor: colors.gray['100'],
          opacity: 0.5,
          borderRadius: 9999,
        }}
        activeDotStyle={{
          overflow: 'hidden',
          backgroundColor: colors.gray['100'],
          opacity: 1,
        }}
        containerStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 4,
          gap: 4,
          paddingHorizontal: 4,
        }}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  )
}
