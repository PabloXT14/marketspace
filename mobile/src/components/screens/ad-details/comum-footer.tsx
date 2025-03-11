import { Linking } from 'react-native'
import { WhatsappLogo } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { ToastMessage } from '@/components/toast-message'

import { Button, ButtonText } from '@/components/button'

import { colors } from '@/styles/colors'
import { useToast } from '@/components/ui/toast'

type ComumFooterProps = {
  data: {
    productPrice: number
    ownerPhone: string
  }
}

export function ComumFooter({ data }: ComumFooterProps) {
  const toast = useToast()

  const whatsappLink = `https://wa.me/55${data.ownerPhone}`

  async function handleOpenWhatsApp() {
    try {
      const canOpen = await Linking.canOpenURL(whatsappLink)

      if (canOpen) {
        await Linking.openURL(whatsappLink)
      } else {
        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title="Nao foi possível abrir o WhatsApp"
              description="Tente novamente ou mais tarde."
              onClose={() => toast.close(id)}
            />
          ),
        })
      }
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Nao foi possível abrir o WhatsApp"
            description="Tente novamente ou mais tarde."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return (
    <HStack className="bg-gray-100 px-6 pt-5 pb-7 items-center justify-between">
      <HStack className="gap-1 items-baseline">
        <Text className="text-blue-800 text-sm font-bold leading-snug">R$</Text>
        <Text className="text-blue-800 text-2xl font-bold leading-snug">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
            .format(data.productPrice)
            .replace('R$', '')
            .trim()}
        </Text>
      </HStack>

      <Button className="w-fit" onPress={handleOpenWhatsApp}>
        <WhatsappLogo size={20} weight="fill" color={colors.gray[200]} />

        <ButtonText>Entrar em contato</ButtonText>
      </Button>
    </HStack>
  )
}
