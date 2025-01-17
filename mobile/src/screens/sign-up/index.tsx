import { useState } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Input, InputField } from '@/components/input'
import { Button, ButtonText } from '@/components/button'
import { UserPhotoSelect } from '@/components/user-photo-select'

import Logo from '@/assets/logo.svg'
import { colors } from '@/styles/colors'

const FormSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z
      .string({ required_error: 'E-mail obrigatório' })
      .email('E-mail invalido'),
    phone: z
      .string({ required_error: 'Telefone obrigatório' })
      .min(11, 'O telefone deve ter no mínimo 11 caracteres'),
    password: z
      .string({ required_error: 'Senha obrigatória' })
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string({ required_error: 'Confirmação de senha obrigatória' })
      .min(6, 'A confirmação de senha deve ter no mínimo 6 caracteres'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

type FormData = z.infer<typeof FormSchema>

export function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState)
  }

  function handleToggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(prevState => !prevState)
  }

  async function handleSignUp(data: FormData) {
    console.log(data)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack className="flex-1 bg-gray-200">
        {/* TOP */}
        <VStack className="flex-1 justify-center px-12">
          <VStack className="items-center gap-3 mb-10">
            <Logo width={70} />

            <VStack className="gap-2">
              <Text className="text-center text-xl font-bold text-gray-700 leading-snug">
                Boas vindas!
              </Text>

              <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
                Crie sua conta e use o espaço para comprar itens variados e
                vender seus produtos
              </Text>
            </VStack>
          </VStack>

          {/* FORM */}
          <VStack className="gap-4 items-center">
            <UserPhotoSelect />

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.name?.message}>
                  <InputField
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />

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
              name="phone"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.phone?.message}>
                  <InputField
                    placeholder="Telefone"
                    keyboardType="phone-pad"
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
                    value={value}
                    onChangeText={onChange}
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.confirmPassword?.message}>
                  <InputField
                    placeholder="Confirmar senha"
                    secureTextEntry={!isConfirmPasswordVisible}
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={() => handleSubmit(handleSignUp)}
                    returnKeyType="send"
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleToggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlash size={20} color={colors.gray[500]} />
                    ) : (
                      <Eye size={20} color={colors.gray[500]} />
                    )}
                  </TouchableOpacity>
                </Input>
              )}
            />

            <Button
              type="black"
              className="mt-8"
              onPress={handleSubmit(handleSignUp)}
            >
              <ButtonText type="black">Criar</ButtonText>
            </Button>
          </VStack>
        </VStack>

        {/* BOTTOM */}
        <VStack className="py-14 px-12 gap-4">
          <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
            Já tem uma conta?
          </Text>

          <Button type="gray">
            <ButtonText type="gray">Ir para o login</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
