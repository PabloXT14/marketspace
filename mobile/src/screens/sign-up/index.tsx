import { useState } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { VStack } from '@/components/ui/vstack'
import { Text } from '@/components/ui/text'

import { Input, InputField } from '@/components/input'
import { Button, ButtonText } from '@/components/button'
import { ToastMessage } from '@/components/toast-message'
import { useToast } from '@/components/ui/toast'
import { UserPhotoSelect } from '@/components/user-photo-select'
import type { AuthRoutesNavigationProps } from '@/routes/auth.routes'

import { colors } from '@/styles/colors'

import Logo from '@/assets/logo.svg'
import { createUser } from '@/https/create-user'

const MAX_IMAGE_SIZE_MB = 5

const FormSchema = z
  .object({
    avatar: z.object(
      {
        name: z.string(),
        uri: z.string(),
        type: z.string(),
      },
      { required_error: 'Selecione uma imagem' }
    ),
    name: z
      .string({ required_error: 'Nome obrigatório' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z
      .string({ required_error: 'E-mail obrigatório' })
      .email('E-mail invalido'),
    tel: z
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

  const navigation = useNavigation<AuthRoutesNavigationProps>()
  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  async function handleSelectImage(
    currentImage: FormData['avatar'],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onChange: any
  ) {
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photosSelected.canceled) return

      const photoUri = photosSelected.assets[0].uri

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        const photoSizeInMb = photoInfo.size && photoInfo.size / 1024 / 1024

        if (photoSizeInMb && photoSizeInMb > MAX_IMAGE_SIZE_MB) {
          return toast.show({
            placement: 'top',
            duration: 7000,
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Imagem muito grande"
                description={`A imagem selecionada possui um tamanho maior que ${MAX_IMAGE_SIZE_MB}MB.`}
                onClose={() => toast.close(id)}
              />
            ),
          })
        }

        const fileExtension = photoUri.split('.').pop()

        const photoFile = {
          name: `${Date.now()}-masketspace.${fileExtension}`.toLowerCase(),
          uri: photoUri,
          type: `${photosSelected.assets[0].type}/${fileExtension}`,
        }

        onChange(photoFile)

        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="success"
              title="Foto adicionada com sucesso!"
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
            title="Erro ao selecionar imagem"
            description="Ocorreu um erro ao selecionar a imagem, tente novamente"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible(prevState => !prevState)
  }

  function handleToggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(prevState => !prevState)
  }

  async function handleSignUp(data: FormData) {
    try {
      await createUser({
        data: {
          ...data,
          avatar: data.avatar as unknown as Blob,
        },
      })

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Usuário criado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      })

      navigation.navigate('signIn')
    } catch (error) {
      console.log(error)

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao criar usuário! Tente novamente ou mais tarde"
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
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
            {/* IMAGE */}
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value: avatar, onChange } }) => (
                <VStack className="gap-2 items-center">
                  <UserPhotoSelect
                    image={avatar?.uri}
                    onSelectImage={() => handleSelectImage(avatar, onChange)}
                  />

                  {errors.avatar?.message && (
                    <Text className="text-red-400 text-base font-regular leading-snug">
                      {errors.avatar.message}
                    </Text>
                  )}
                </VStack>
              )}
            />

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
              name="tel"
              render={({ field: { value, onChange } }) => (
                <Input errorMessage={errors.tel?.message}>
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
              isLoading={isSubmitting}
            >
              <ButtonText type="black">Criar</ButtonText>
            </Button>
          </VStack>
        </VStack>

        {/* BOTTOM */}
        <VStack className="pt-14 pb-20 px-12 gap-4">
          <Text className="text-center text-sm font-regular text-gray-600 leading-snug">
            Já tem uma conta?
          </Text>

          <Button type="gray" onPress={handleGoBack}>
            <ButtonText type="gray">Ir para o login</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
