import type { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Plus } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { colors } from '@/styles/colors'

type HeaderProps = ComponentProps<typeof HStack>

export function Header({ className, ...props }: HeaderProps) {
  return (
    <HStack className={twMerge('items-center mb-10', className)} {...props}>
      <Text className="flex-1 text-center text-gray-700 text-xl font-bold leading-snug">
        Meus anúncios
      </Text>

      <TouchableOpacity className="">
        <Plus size={24} color={colors.gray[700]} />
      </TouchableOpacity>
    </HStack>
  )
}
