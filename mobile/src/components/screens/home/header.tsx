import { useNavigation } from '@react-navigation/native'
import { Plus } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { UserPhoto } from '@/components/user-photo'
import { Button, ButtonText } from '@/components/button'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { useAuthStore } from '@/store/auth-store'

import { colors } from '@/styles/colors'
import { api } from '@/services/api'

export function Header() {
  const user = useAuthStore(state => state.user)

  const navigate = useNavigation<AppRoutesNavigationProps>()

  function handleNavigateToCreateAd() {
    navigate.navigate('createProduct')
  }

  return (
    <HStack className="gap-2 items-center">
      <HStack className="gap-2.5 items-center flex-1">
        <UserPhoto
          source={`${api.defaults.baseURL}/images/${user?.avatar}`}
          alt={user?.name}
          size="sm"
        />

        <VStack>
          <Text className="text-gray-700 text-base font-regular leading-snug">
            Boas vindas,
          </Text>
          <Text className="text-gray-700 text-base font-bold leading-snug">
            {user?.name}!
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
