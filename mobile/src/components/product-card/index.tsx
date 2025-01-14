import React, { type ComponentProps } from 'react'
import { Image, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar'

type ProductCardProps = ComponentProps<typeof Box> & {
  data: {
    title: string
    price: number
    imageUrl: string
    condition: 'new' | 'used'
    seller: string
    sellerImageUrl: string
    isAdActive: boolean
  }
}

export function ProductCard({ data, className, ...props }: ProductCardProps) {
  const {
    title,
    price,
    imageUrl,
    condition,
    seller,
    sellerImageUrl,
    isAdActive,
  } = data

  const conditionText = condition === 'new' ? 'Novo' : 'Usado'

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

  return (
    <Box className={twMerge('w-full gap-2 rounded-lg', className)} {...props}>
      {/* PRODUCT */}
      <View className="relative rounded-lg overflow-hidden">
        <Image
          source={{ uri: imageUrl }}
          alt={title}
          className="w-full h-28 object-cover rounded-lg"
        />

        <Avatar
          size="sm"
          className="absolute top-1.5 left-1.5 border border-gray-100"
        >
          <AvatarFallbackText>{seller}</AvatarFallbackText>

          <AvatarImage source={{ uri: sellerImageUrl }} alt={seller} />
        </Avatar>

        <View
          className={twMerge(
            'absolute top-1.5 right-1.5 bg-blue-800 rounded-full px-3 py-1',
            condition === 'used' && 'bg-gray-600'
          )}
        >
          <Text className="text-white text-xs font-bold uppercase">
            {conditionText}
          </Text>
        </View>

        {/* OVERLAY */}
        {!isAdActive && (
          <>
            <View className="absolute top-0 left-0 w-full h-full bg-black/30" />

            <Text className="absolute bottom-2 left-2 text-white text-xs font-bold uppercase w-full">
              Anúncio desativado
            </Text>
          </>
        )}
      </View>

      {/* DETAILS */}
      <View>
        <Text
          className={twMerge(
            'text-gray-600 text-sm font-regular leading-snug',
            !isAdActive && 'text-gray-400'
          )}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="flex-row items-center justify-start">
          <Text
            className={twMerge(
              'text-gray-700 text-xs font-bold leading-snug',
              !isAdActive && 'text-gray-400'
            )}
          >
            R$
          </Text>
          <Text
            className={twMerge(
              'text-gray-700 text-base font-bold leading-snug',
              !isAdActive && 'text-gray-400'
            )}
          >
            {priceFormatted.replace('R$', '')}
          </Text>
        </View>
      </View>
    </Box>
  )
}
