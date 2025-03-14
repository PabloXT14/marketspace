import { useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigation } from '@react-navigation/native'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Input, InputField } from '@/components/input'
import { Button, ButtonText } from '@/components/button'
import type { AuthRoutesNavigationProps } from '@/routes/auth.routes'
import { ToastMessage } from '@/components/toast-message'

import Logo from '@/assets/logo.svg'
import MarketspaceText from '@/assets/marketspace-text.svg'

import { colors } from '@/styles/colors'
import { useToast } from '@/components/ui/toast'
import { makeSignIn } from '@/https/make-sign-in'
import { useAuthStore } from '@/store/auth-store'

const FormSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail invalido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof FormSchema>

export function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const signIn = useAuthStore(state => state.signIn)
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const navigation = useNavigation<AuthRoutesNavigationProps>()

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState)
  }

  async function handleSignIn(data: FormData) {
    try {
      const { token, user, refresh_token } = await makeSignIn(data)

      await signIn(user, token, refresh_token)
    } catch (error) {
      console.log('', error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao acessar!"
            description="Tente novamente ou mais tarde"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 bg-gray-100">
        {/* TOP */}
        <VStack className="flex-1 bg-gray-200 rounded-b-3xl justify-center py-20 px-12">
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

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.email?.message}>
                  <InputField
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.password?.message}>
                  <InputField
                    placeholder="Senha"
                    secureTextEntry={!isPasswordVisible}
                    returnKeyType="send"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(handleSignIn)}
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
              )}
            />

            <Button
              isLoading={isSubmitting}
              className="mt-8"
              onPress={handleSubmit(handleSignIn)}
            >
              <ButtonText>Entrar</ButtonText>
            </Button>
          </VStack>
        </VStack>

        {/* BOTTOM */}
        <VStack className="py-20 px-12 gap-4">
          <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
            Ainda não tem acesso?
          </Text>

          <Button type="gray" onPress={handleNewAccount}>
            <ButtonText type="gray">Criar uma conta</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
