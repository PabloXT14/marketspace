import { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Eye, EyeSlash } from 'phosphor-react-native'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Input, InputField } from '@/components/input'
import { Button, ButtonText } from '@/components/button'

import Logo from '@/assets/logo.svg'
import MarketspaceText from '@/assets/marketspace-text.svg'
import { colors } from '@/styles/colors'

export function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState)
  }

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

          <Input>
            <InputField
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>

          <Input>
            <InputField
              placeholder="Senha"
              secureTextEntry={!isPasswordVisible}
              onSubmitEditing={() => {}}
              returnKeyType="send"
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleTogglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeSlash size={20} color={colors.gray[500]} />
              ) : (
                <Eye size={20} color={colors.gray[500]} />
              )}
            </TouchableOpacity>
          </Input>

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
