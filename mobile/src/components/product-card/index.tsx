import React, { type ComponentProps } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { Text } from '@/components/ui/text'
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar'

import type { ProductDTO } from '@/dtos/product'
import { api } from '@/services/api'

type ProductCardProps = ComponentProps<typeof TouchableOpacity> & {
  data: ProductDTO
}

export function ProductCard({ data, className, ...props }: ProductCardProps) {
  const { name, price, product_images, is_new, is_active, user } = data

  const conditionText = is_new ? 'Novo' : 'Usado'

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

  return (
    <TouchableOpacity
      className={twMerge('w-full gap-2 rounded-lg', className)}
      {...props}
    >
      {/* PRODUCT */}
      <View className="relative rounded-lg overflow-hidden">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${product_images[0].path}`,
          }}
          alt={name}
          className="w-full h-28 object-cover rounded-lg"
        />

        <Avatar
          size="sm"
          className="absolute top-1.5 left-1.5 border border-gray-100"
        >
          <AvatarFallbackText>{user.name}</AvatarFallbackText>

          <AvatarImage
            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
            alt={user.name}
          />
        </Avatar>

        <View
          className={twMerge(
            'absolute top-1.5 right-1.5 bg-blue-800 rounded-full px-3 py-1',
            !is_new && 'bg-gray-600'
          )}
        >
          <Text className="text-white text-xs font-bold uppercase">
            {conditionText}
          </Text>
        </View>

        {/* OVERLAY */}
        {!is_active && (
          <>
            <View className="absolute top-0 left-0 w-full h-full bg-gray-700/45" />

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
            !is_active && 'text-gray-400'
          )}
          numberOfLines={1}
        >
          {name}
        </Text>

        <View className="flex-row items-baseline justify-start">
          <Text
            className={twMerge(
              'text-gray-700 text-xs font-bold leading-snug',
              !is_active && 'text-gray-400'
            )}
          >
            R$
          </Text>
          <Text
            className={twMerge(
              'text-gray-700 text-base font-bold leading-snug',
              !is_active && 'text-gray-400'
            )}
          >
            {priceFormatted.replace('R$', '')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
