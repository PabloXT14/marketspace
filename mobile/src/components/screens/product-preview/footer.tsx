import { Tag, ArrowLeft } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'

export function Footer() {
  return (
    <HStack className="bg-gray-100 p-6 pt-5 pb-7 gap-3">
      <Button type="gray" className="flex-1">
        <ArrowLeft size={16} color={colors.gray[600]} />

        <ButtonText type="gray">Voltar e editar</ButtonText>
      </Button>

      <Button className="flex-1">
        <Tag size={16} color={colors.gray[200]} />

        <ButtonText>Publicar</ButtonText>
      </Button>
    </HStack>
  )
}
