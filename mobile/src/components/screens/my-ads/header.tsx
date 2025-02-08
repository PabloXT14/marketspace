import type { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Plus } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { colors } from '@/styles/colors'

type HeaderProps = ComponentProps<typeof HStack>

export function Header({ className, ...props }: HeaderProps) {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  function handleNavigateToCreateAd() {
    navigate.navigate('createAd')
  }

  return (
    <HStack className={twMerge('items-center mb-10', className)} {...props}>
      <Text className="flex-1 text-center text-gray-700 text-xl font-bold leading-snug">
        Meus anúncios
      </Text>

      <TouchableOpacity onPress={handleNavigateToCreateAd}>
        <Plus size={24} color={colors.gray[700]} />
      </TouchableOpacity>
    </HStack>
  )
}
