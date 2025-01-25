import { Power, TrashSimple } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'

import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'

type MyAdFooterProps = {
  isAdActive: boolean
}

export function MyAdFooter({ isAdActive }: MyAdFooterProps) {
  return (
    <VStack className="bg-gray-100 p-6 pb-14 gap-2">
      {isAdActive ? (
        <Button type="black">
          <Power size={20} color={colors.gray[200]} />

          <ButtonText type="black">Desativar anúncio</ButtonText>
        </Button>
      ) : (
        <Button>
          <Power size={20} color={colors.gray[200]} />

          <ButtonText>Reativar anúncio</ButtonText>
        </Button>
      )}

      <Button type="gray">
        <TrashSimple size={20} color={colors.gray[500]} />

        <ButtonText type="gray">Excluir anúncio</ButtonText>
      </Button>
    </VStack>
  )
}
