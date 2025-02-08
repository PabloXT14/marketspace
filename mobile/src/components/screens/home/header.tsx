import { useNavigation } from '@react-navigation/native'
import { Plus } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { UserPhoto } from '@/components/user-photo'
import { Button, ButtonText } from '@/components/button'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { colors } from '@/styles/colors'

export function Header() {
  const navigate = useNavigation<AppRoutesNavigationProps>()

  function handleNavigateToCreateAd() {
    navigate.navigate('createAd')
  }

  return (
    <HStack className="gap-2 items-center">
      <HStack className="gap-2.5 items-center flex-1">
        <UserPhoto
          source={'https://github.com/pabloxt14.png'}
          alt="User photo"
          size="sm"
        />

        <VStack>
          <Text className="text-gray-700 text-base font-regular leading-snug">
            Boas vindas,
          </Text>
          <Text className="text-gray-700 text-base font-bold leading-snug">
            John!
          </Text>
        </VStack>
      </HStack>

      <Button type="black" className="w-fit" onPress={handleNavigateToCreateAd}>
        <Plus size={16} color={colors.gray[200]} weight="bold" />
        <ButtonText type="black">Criar anúncio</ButtonText>
      </Button>
    </HStack>
  )
}
