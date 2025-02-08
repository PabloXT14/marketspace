import type { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { colors } from '@/styles/colors'

type HeaderProps = ComponentProps<typeof HStack>

export function Header({ className, ...props }: HeaderProps) {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  function handleGoBack() {
    navigate.goBack()
  }

  return (
    <HStack
      className={twMerge('relative items-center px-6 mb-6', className)}
      {...props}
    >
      <TouchableOpacity className="z-10 absolute left-6" onPress={handleGoBack}>
        <ArrowLeft size={24} color={colors.gray[700]} />
      </TouchableOpacity>

      <Text className="flex-1 text-center text-gray-700 text-xl font-bold leading-snug">
        Criar anúncio
      </Text>
    </HStack>
  )
}
