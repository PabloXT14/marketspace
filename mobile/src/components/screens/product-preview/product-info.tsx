import { Barcode, QrCode, Money, CreditCard, Bank } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { UserPhoto } from '@/components/user-photo'
import { Tag, TagText } from '@/components/tag'

import { colors } from '@/styles/colors'

import type { CreateAdFormProps } from '../create-product/form'
import { useAuthStore } from '@/store/auth-store'
import { api } from '@/services/api'

type ProductInfoProps = {
  data: CreateAdFormProps
}

const paymentMethodsOptions = {
  boleto: {
    icon: <Barcode size={18} color={colors.gray[700]} />,
    label: 'Boleto',
  },
  pix: {
    icon: <QrCode size={18} color={colors.gray[700]} />,
    label: 'Pix',
  },
  cash: {
    icon: <Money size={18} color={colors.gray[700]} />,
    label: 'Dinheiro',
  },
  card: {
    icon: <CreditCard size={18} color={colors.gray[700]} />,
    label: 'Cartão de crédito',
  },
  deposit: {
    icon: <Bank size={18} color={colors.gray[700]} />,
    label: 'Depósito bancário',
  },
}

export function ProductInfo({ data }: ProductInfoProps) {
  const user = useAuthStore(state => state.user)

  const paymentMethods =
    data.paymentMethods as (keyof typeof paymentMethodsOptions)[]

  const numericPrice = Number(data.price.toString().replace(',', '.'))
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(Number(numericPrice))
    .replace('R$', '')
    .trim()

  return (
    <VStack className="flex-1 p-6 gap-6">
      {/* OWNER */}
      <HStack className="items-center gap-2">
        <UserPhoto
          source={`${api.defaults.baseURL}/images/${user?.avatar}`}
          alt={user?.name}
          size="xs"
        />

        <Text className="text-gray-700 text-sm font-regular leading-snug">
          {user?.name}
        </Text>
      </HStack>

      {/* DESCRIPTION */}
      <VStack className="gap-2 items-start">
        <Tag variant="secondary">
          <TagText variant="secondary">
            {data.condition === 'new' ? 'NOVO' : 'USADO'}
          </TagText>
        </Tag>

        <HStack className="w-full items-center justify-between">
          <Text
            className="flex-1 text-gray-700 text-xl font-bold leading-snug"
            numberOfLines={1}
          >
            {data.title}
          </Text>

          <HStack className="gap-1 items-baseline">
            <Text className="text-blue-500 text-sm font-bold leading-snug">
              R$
            </Text>
            <Text className="text-blue-500 text-xl font-bold leading-snug">
              {priceFormatted}
            </Text>
          </HStack>
        </HStack>

        <Text className="text-gray-600 text-sm font-regular leading-snug">
          {data.description}
        </Text>
      </VStack>

      {/* DETAILS */}
      <VStack className="gap-4">
        <HStack className="gap-2">
          <Text className="text-gray-600 text-sm font-bold leading-snug">
            Aceita troca?
          </Text>
          <Text className="text-gray-600 text-sm font-regular leading-snug">
            {data.acceptTrade ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <VStack className="gap-2">
          <Text className="text-gray-600 text-sm font-bold leading-snug">
            Meios de pagamento:
          </Text>

          {paymentMethods.map(paymentMethod => {
            if (!paymentMethodsOptions[paymentMethod]) return null

            return (
              <HStack key={paymentMethod} className="gap-2 items-center">
                {paymentMethodsOptions[paymentMethod]?.icon}
                <Text className="text-gray-600 text-sm font-regular leading-snug">
                  {paymentMethodsOptions[paymentMethod]?.label}
                </Text>
              </HStack>
            )
          })}
        </VStack>
      </VStack>
    </VStack>
  )
}
