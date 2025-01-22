import { Barcode, QrCode, Money, CreditCard, Bank } from 'phosphor-react-native'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { UserPhoto } from '@/components/user-photo'
import { Tag, TagText } from '@/components/tag'

import { colors } from '@/styles/colors'

export function ProductInfo() {
  return (
    <VStack className="flex-1 p-6 gap-6">
      {/* OWNER */}
      <HStack className="items-center gap-2">
        <UserPhoto
          source={'https://github.com/orodrigogo.png'}
          alt="User photo"
          size="xs"
        />

        <Text className="text-gray-700 text-sm font-regular leading-snug">
          Rodrigo Gonçalves
        </Text>
      </HStack>

      {/* DESCRIPTION */}
      <VStack className="gap-2 items-start">
        <Tag variant="secondary">
          <TagText variant="secondary">Novo</TagText>
        </Tag>

        <HStack className="w-full items-center justify-between">
          <Text
            className="flex-1 text-gray-700 text-xl font-bold leading-snug"
            numberOfLines={1}
          >
            Bicicleta
          </Text>

          <HStack className="gap-1 items-center">
            <Text className="text-blue-500 text-sm font-bold leading-snug">
              R$
            </Text>
            <Text className="text-blue-500 text-xl font-bold leading-snug">
              120,00
            </Text>
          </HStack>
        </HStack>

        <Text className="text-gray-600 text-sm font-regular leading-snug">
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>
      </VStack>

      {/* DETAILS */}
      <VStack className="gap-4">
        <HStack className="gap-2">
          <Text className="text-gray-600 text-sm font-bold leading-snug">
            Aceita troca?
          </Text>
          <Text className="text-gray-600 text-sm font-regular leading-snug">
            Sim
          </Text>
        </HStack>

        <VStack className="gap-2">
          <Text className="text-gray-600 text-sm font-bold leading-snug">
            Meios de pagamento:
          </Text>

          <HStack className="gap-2 items-center">
            <Barcode size={18} color={colors.gray[700]} />
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              Boleto
            </Text>
          </HStack>

          <HStack className="gap-2 items-center">
            <QrCode size={18} color={colors.gray[700]} />
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              Pix
            </Text>
          </HStack>

          <HStack className="gap-2 items-center">
            <Money size={18} color={colors.gray[700]} />
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              Dinheiro
            </Text>
          </HStack>

          <HStack className="gap-2 items-center">
            <CreditCard size={18} color={colors.gray[700]} />
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              Cartão de Crédito
            </Text>
          </HStack>

          <HStack className="gap-2 items-center">
            <Bank size={18} color={colors.gray[700]} />
            <Text className="text-gray-600 text-sm font-regular leading-snug">
              Deposito Bancário
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
