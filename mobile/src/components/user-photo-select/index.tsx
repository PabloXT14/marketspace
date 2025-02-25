import { View, Image, Pressable } from 'react-native'
import { User, PencilSimpleLine } from 'phosphor-react-native'

import { colors } from '@/styles/colors'

type UserPhotoSelectProps = {
  image?: string
  onSelectImage: () => void
}

export function UserPhotoSelect({
  image,
  onSelectImage,
}: UserPhotoSelectProps) {
  return (
    <View className="relative size-28 bg-gray-300 border-4 border-blue-500 rounded-full items-center justify-center">
      {image ? (
        <Image
          src={image}
          alt="User photo"
          resizeMode="cover"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <User size={48} color={colors.gray[400]} weight="bold" />
      )}

      <Pressable
        onPress={onSelectImage}
        className="absolute -bottom-1 -right-3 items-center justify-center size-12 bg-blue-500 rounded-full active:bg-blue-800"
      >
        <PencilSimpleLine size={16} color={colors.gray[200]} />
      </Pressable>
    </View>
  )
}
