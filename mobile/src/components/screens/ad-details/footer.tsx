import { WhatsappLogo } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'

import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'

export function Footer() {
  return (
    <HStack className="bg-gray-100 px-6 pt-5 pb-7 items-center justify-between">
      <HStack className="gap-1 items-baseline">
        <Text className="text-blue-800 text-sm font-bold leading-snug">R$</Text>
        <Text className="text-blue-800 text-2xl font-bold leading-snug">
          120,00
        </Text>
      </HStack>

      <Button className="w-fit">
        <WhatsappLogo size={20} weight="fill" color={colors.gray[200]} />

        <ButtonText>Entrar em contato</ButtonText>
      </Button>
    </HStack>
  )
}
