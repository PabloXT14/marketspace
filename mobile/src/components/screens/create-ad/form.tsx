import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Plus, X } from 'phosphor-react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

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

const MAX_IMAGE_SIZE_MB = 5

export function Form() {
  const toast = useToast()

  const [radioSelected, setRadioSelected] = useState('')
  const [paymentMethods, setPaymentMethods] = useState([])

  const [images, setImages] = useState<string[]>([])

  async function handleSelectImage() {
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

        setImages(prevState => [...prevState, photoUri])

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

  function handleRemoveImage(image: string) {
    setImages(prevState => prevState.filter(imageUrl => imageUrl !== image))
  }

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
          <HStack className="gap-2">
            {images.map(image => (
              <VStack
                key={image}
                className="relative size-28 rounded-lg overflow-hidden"
              >
                <Image
                  source={{ uri: image }}
                  alt="Product image"
                  className="object-cover w-full h-full"
                />

                <TouchableOpacity
                  className="absolute rounded-full p-1 bg-gray-600 top-1.5 right-1.5"
                  onPress={() => handleRemoveImage(image)}
                >
                  <X size={16} color={colors.gray[100]} />
                </TouchableOpacity>
              </VStack>
            ))}

            {images.length < 3 && (
              <TouchableOpacity
                onPress={handleSelectImage}
                className="size-28 rounded-lg bg-gray-300 items-center justify-center"
              >
                <Plus size={24} color={colors.gray[400]} />
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>

        {/* ABOUT PRODUCT */}
        <VStack className="gap-4">
          <Text className="text-gray-600 text-base font-bold leading-snug">
            Sobre o produto
          </Text>

          <Input>
            <InputField placeholder="Título do anúncio" />
          </Input>

          <Input className="h-40">
            <InputField
              placeholder="Descrição do produto"
              multiline
              numberOfLines={6}
              className="align-top p-0"
            />
          </Input>

          <RadioGroup
            value={radioSelected}
            onChange={setRadioSelected}
            className="flex-row gap-5 items-center"
          >
            <Radio value="new" label="Produto novo" />
            <Radio value="used" label="Produto usado" />
          </RadioGroup>
        </VStack>

        {/* SELL */}
        <VStack className="gap-4 mb-6">
          <Text className="text-gray-600 text-base font-bold leading-snug">
            Venda
          </Text>

          <Input>
            <Text className="text-gray-700 text-base font-regular leading-snug">
              R$
            </Text>

            <InputField placeholder="Valor do produto" />
          </Input>

          <VStack className="items-start">
            <Text className="text-gray-600 text-sm font-bold leading-snug">
              Aceita troca?
            </Text>

            <Switch />
          </VStack>

          <VStack className="gap-3 items-start">
            <Text className="text-gray-600 text-sm font-bold leading-snug">
              Meios de pagamento aceitos
            </Text>

            <CheckboxGroup
              value={paymentMethods}
              onChange={setPaymentMethods}
              className="gap-2"
            >
              <Checkbox value="boleto" label="Boleto" />
              <Checkbox value="pix" label="Pix" />
              <Checkbox value="cash" label="Dinheiro" />
              <Checkbox value="card" label="Cartão de crédito" />
              <Checkbox value="deposit" label="Depósito de volta" />
            </CheckboxGroup>
          </VStack>
        </VStack>
      </VStack>

      {/* MENU ACTION */}
      <HStack className="bg-gray-100 px-6 py-7 gap-3">
        <Button className="flex-1" type="gray">
          <ButtonText type="gray">Cancelar</ButtonText>
        </Button>

        <Button className="flex-1" type="black">
          <ButtonText type="black">Avançar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  )
}
