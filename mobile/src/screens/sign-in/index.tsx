import { View } from 'react-native'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Input } from '@/components/input'
import { Button, ButtonText } from '@/components/button'

import Logo from '@/assets/logo.svg'
import MarketspaceText from '@/assets/marketspace-text.svg'

export function SignIn() {
  return (
    <VStack className="flex-1 bg-gray-100">
      {/* TOP */}
      <VStack className="flex-1 bg-gray-200 rounded-b-3xl justify-center px-12">
        <VStack className="items-center mb-20">
          <View className="mb-5">
            <Logo />
          </View>

          <MarketspaceText />

          <Text className="text-center text-sm font-regular text-gray-500 leading-snug">
            Seu espaço de compra e venda
          </Text>
        </VStack>

        {/* FORM */}
        <VStack className="gap-4">
          <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
            Acesse sua conta
          </Text>

          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />

          <Button className="mt-8">
            <ButtonText>Entrar</ButtonText>
          </Button>
        </VStack>
      </VStack>

      {/* BOTTOM */}
      <VStack className="py-20 px-12 gap-4">
        <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
          Ainda não tem acesso?
        </Text>

        <Button type="gray">
          <ButtonText type="gray">Criar uma conta</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}
