import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Plus, X } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { isEqual } from 'lodash'

import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { useToast } from '@/components/ui/toast'
import { Image } from '@/components/ui/image'

import { Input, InputField } from '@/components/input'
import { Radio, RadioGroup } from '@/components/radio'
import { Checkbox, CheckboxGroup } from '@/components/checkbox'
import { Button, ButtonText } from '@/components/button'
import { ToastMessage } from '@/components/toast-message'

import { colors } from '@/styles/colors'
import { Switch } from '@/components/switch'

import type { AppRoutesNavigationProps } from '@/routes/app.routes'

import { CancelModal } from './cancel-modal'
import { Loading } from '@/components/loading'

import { formatCurrencyMask } from '@/utils/format-currency-mask'
import { api } from '@/services/api'
import { useProductStore } from '@/store/product-store'

const MAX_IMAGE_SIZE_MB = 5
const USER_NAME = 'John Doe'

const FormSchema = z.object({
  title: z
    .string({ required_error: 'O titulo é obrigatório' })
    .min(1, 'O titulo é obrigatório'),
  description: z
    .string({ required_error: 'A descrição é obrigatória' })
    .min(1, 'A descrição é obrigatória'),
  images: z
    .array(
      z.object({
        name: z.string(),
        uri: z.string(),
        type: z.string(),
      }),
      { required_error: 'Selecione pelo menos uma imagem' }
    )
    .min(1, 'Selecione pelo menos uma imagem'),
  condition: z.enum(['new', 'used'], {
    required_error: 'Selecione uma condição',
  }),
  price: z
    .string({ required_error: 'O preço é obrigatório' })
    .min(1, 'O preço é obrigatório')
    .refine(value => Number(value.replace(/\D/g, '')) > 0, {
      message: 'O preço deve ser maior que zero',
    }),
  acceptTrade: z.boolean(),
  paymentMethods: z
    .array(z.string(), {
      required_error: 'Selecione pelo menos um meio de pagamento',
    })
    .min(1, 'Selecione pelo menos um meio de pagamento'),
})

type FormData = z.infer<typeof FormSchema>

export function Form() {
  const toast = useToast()
  const navigate = useNavigation<AppRoutesNavigationProps>()

  const product = useProductStore(state => state.product)
  const setProductPreview = useProductStore(state => state.setProductPreview)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, defaultValues },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      images: [],
    },
  })

  async function handleSelectImage(
    currentImages: FormData['images'],
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
          name: `${USER_NAME}-${Date.now()}.${fileExtension}`.toLowerCase(),
          uri: photoUri,
          type: `${photosSelected.assets[0].type}/${fileExtension}`,
        }

        onChange([...currentImages, photoFile])

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
            title="Erro ao selecionar foto"
            description="Tente novamente ou mais tarde."
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  async function handleGoToAdPreview(data: FormData) {
    setProductPreview(data)

    navigate.navigate('productPreview', {
      action: 'update',
    })
  }

  function handleCancel() {
    reset()
    navigate.goBack()
  }

  async function setProductDataOnForm() {
    setIsLoading(true)

    const formattedPrice = formatCurrencyMask(
      (product?.price >= 1 ? product.price * 100 : product.price).toString()
    )

    reset({
      images: product.product_images.map(image => ({
        name: image?.path,
        type: `image/${image?.path.split('.').pop()}`,
        uri: `${api.defaults.baseURL}/images/${image.path}`,
      })),

      title: product.name,
      description: product.description,
      condition: product.is_new ? 'new' : 'used',
      price: formattedPrice,
      acceptTrade: product.accept_trade,
      paymentMethods: product.payment_methods.map(method => method.key),
    })

    setIsLoading(false)
  }

  useEffect(() => {
    setProductDataOnForm()
  }, [product])

  if (isLoading) {
    return <Loading />
  }

  const formValues = watch()
  const isModified = !isEqual(defaultValues, formValues)

  // console.log('Current form values: ', formValues)
  // console.log('Default values: ', defaultValues)

  return (
    <VStack className="flex-1">
      {/* CONTENT */}
      <VStack className="px-6 gap-8">
        {/* IMAGES */}
        <VStack className="gap-4">
          <VStack className="gap-1">
            <Text className="text-gray-600 text-base font-bold leading-snug">
              Imagens
            </Text>

            <Text className="text-gray-500 text-sm font-regular leading-snug">
              Escola até 3 imagens para mostrar o quanto o seu produto é
              incrível.
            </Text>
          </VStack>

          {/* UPLOAD */}
          <Controller
            control={control}
            name="images"
            render={({ field: { value: images, onChange } }) => (
              <VStack className="gap-2">
                <HStack className="gap-2">
                  {images?.map(image => (
                    <VStack
                      key={image.name}
                      className="relative size-28 rounded-lg overflow-hidden"
                    >
                      <Image
                        source={{ uri: image.uri }}
                        alt="Product image"
                        className="object-cover w-full h-full"
                      />

                      <TouchableOpacity
                        className="absolute rounded-full p-1 bg-gray-600 top-1.5 right-1.5"
                        onPress={() =>
                          onChange(images.filter(img => img.uri !== image.uri))
                        }
                      >
                        <X size={16} color={colors.gray[100]} />
                      </TouchableOpacity>
                    </VStack>
                  ))}

                  {images?.length < 3 && (
                    <TouchableOpacity
                      onPress={() => handleSelectImage(images, onChange)}
                      className="size-28 rounded-lg bg-gray-300 items-center justify-center"
                    >
                      <Plus size={24} color={colors.gray[400]} />
                    </TouchableOpacity>
                  )}
                </HStack>

                {errors.images?.message && (
                  <Text className="text-red-400 text-base font-regular leading-snug">
                    {errors.images.message}
                  </Text>
                )}
              </VStack>
            )}
          />
        </VStack>

        {/* ABOUT PRODUCT */}
        <VStack className="gap-4">
          <Text className="text-gray-600 text-base font-bold leading-snug">
            Sobre o produto
          </Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <Input errorMessage={errors.title?.message}>
                <InputField
                  placeholder="Título do anúncio"
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Input
                className="h-40"
                errorMessage={errors.description?.message}
              >
                <InputField
                  placeholder="Descrição do produto"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={6}
                  className="align-top p-0"
                />
              </Input>
            )}
          />

          <Controller
            control={control}
            name="condition"
            render={({ field: { value, onChange } }) => (
              <VStack className="items-start gap-1">
                <RadioGroup
                  value={value}
                  onChange={onChange}
                  className="flex-row gap-5 items-center"
                >
                  <Radio value="new" label="Produto novo" />
                  <Radio value="used" label="Produto usado" />
                </RadioGroup>

                {errors.condition?.message && (
                  <Text className="text-red-400 text-base font-regular leading-snug">
                    {errors.condition.message}
                  </Text>
                )}
              </VStack>
            )}
          />
        </VStack>

        {/* SELL */}
        <VStack className="gap-4 mb-6">
          <Text className="text-gray-600 text-base font-bold leading-snug">
            Venda
          </Text>

          <Controller
            control={control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <Input errorMessage={errors.price?.message}>
                <Text className="text-gray-700 text-base font-regular leading-none">
                  R$
                </Text>

                <InputField
                  placeholder="Valor do produto"
                  value={value}
                  onChangeText={value => {
                    const formattedValue = formatCurrencyMask(value)

                    onChange(formattedValue)
                  }}
                  keyboardType="numeric"
                />
              </Input>
            )}
          />

          <VStack className="items-start">
            <Text className="text-gray-600 text-sm font-bold leading-snug">
              Aceita troca?
            </Text>

            <Controller
              control={control}
              name="acceptTrade"
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onValueChange={onChange} />
              )}
            />
          </VStack>

          <VStack className="gap-3 items-start">
            <Text className="text-gray-600 text-sm font-bold leading-snug">
              Meios de pagamento aceitos
            </Text>

            <Controller
              control={control}
              name="paymentMethods"
              render={({ field: { value, onChange } }) => (
                <CheckboxGroup
                  value={value}
                  onChange={onChange}
                  className="gap-2"
                >
                  <Checkbox value="boleto" label="Boleto" />
                  <Checkbox value="pix" label="Pix" />
                  <Checkbox value="cash" label="Dinheiro" />
                  <Checkbox value="card" label="Cartão de crédito" />
                  <Checkbox value="deposit" label="Depósito de volta" />
                  {errors.paymentMethods?.message && (
                    <Text className="text-red-400 text-base font-regular leading-snug">
                      {errors.paymentMethods.message}
                    </Text>
                  )}
                </CheckboxGroup>
              )}
            />
          </VStack>
        </VStack>
      </VStack>

      {/* MENU ACTION */}
      <HStack className="bg-gray-100 px-6 py-7 gap-3">
        <CancelModal onConfirm={handleCancel} />

        <Button
          className="flex-1"
          type="black"
          isDisabled={!isModified}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleGoToAdPreview)}
        >
          <ButtonText type="black">Avançar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  )
}
