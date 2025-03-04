import { useCallback, useRef, useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Sliders, X } from 'phosphor-react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'

import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Button, ButtonText } from '@/components/button'

import { Tag, TagText, TagCloseIcon } from '@/components/tag'
import { Switch } from '@/components/switch'
import { Checkbox, CheckboxGroup } from '@/components/checkbox'

import { colors } from '@/styles/colors'

import type { FilterOptions } from '@/screens/home'

type FilterProps = {
  filterOptions: FilterOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
}

function Backdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // Remove o backdrop ao fechar o bottom sheet
      appearsOnIndex={0} // Mostra o backdrop quando o bottom sheet abre
      opacity={0.6} // Ajuste da opacidade
    />
  )
}

export function Filter({ filterOptions, setFilterOptions }: FilterProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const dimensions = useWindowDimensions()

  const snapPoints = {
    min: dimensions.height - 230,
    max: dimensions.height - 230,
  }

  const [isNew, setIsNew] = useState<boolean | null>(filterOptions.is_new)
  const [acceptTrade, setAcceptTrade] = useState(filterOptions.accept_trade)
  const [paymentMethods, setPaymentMethods] = useState(
    filterOptions.payment_methods
  )

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present()
  }

  const handleCloseModalPress = () => {
    bottomSheetModalRef.current?.close()
  }

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index)
  }, [])

  function handleApplyFilters() {
    setFilterOptions({
      is_new: isNew,
      accept_trade: acceptTrade,
      payment_methods: paymentMethods,
    })

    handleCloseModalPress()
  }

  function handleClearFilters() {
    setIsNew(null)
    setAcceptTrade(false)
    setPaymentMethods(['pix', 'card', 'deposit', 'cash', 'boleto'])

    setFilterOptions({
      is_new: true,
      accept_trade: false,
      payment_methods: ['pix', 'card', 'deposit', 'cash', 'boleto'],
    })
  }

  return (
    <>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <Sliders size={20} color={colors.gray[600]} weight="bold" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={[snapPoints.min, snapPoints.max]}
        handleIndicatorStyle={{
          backgroundColor: colors.gray[400],
          width: 56,
        }}
        backgroundStyle={{
          backgroundColor: colors.gray[200],
        }}
        backdropComponent={Backdrop}
        enableOverDrag={false}
        enableDynamicSizing={false}
      >
        {/* CONTENT */}
        <VStack className="flex-1 gap-16 w-full px-6 pt-10 pb-8">
          {/* ITEMS */}
          <VStack className="flex-1 gap-6">
            {/* HEADER */}
            <HStack className="justify-between">
              <Text className="text-gray-700 text-lg font-bold leading-snug">
                Filtrar anúncios
              </Text>

              <TouchableOpacity onPress={handleCloseModalPress}>
                <X size={24} color={colors.gray[400]} />
              </TouchableOpacity>
            </HStack>

            {/* CONDITION */}
            <VStack className="gap-3">
              <Text className="text-gray-600 text-sm font-bold leading-snug">
                Condição
              </Text>

              <HStack className="gap-2">
                <Tag
                  onPress={() =>
                    setIsNew(prev => (prev === true ? null : true))
                  }
                  variant={isNew === true ? 'primary' : 'secondary'}
                >
                  <TagText variant={isNew === true ? 'primary' : 'secondary'}>
                    Novo
                  </TagText>
                  <TagCloseIcon
                    variant={isNew === true ? 'primary' : 'secondary'}
                  />
                </Tag>

                <Tag
                  onPress={() =>
                    setIsNew(prev => (prev === false ? null : false))
                  }
                  variant={isNew === false ? 'primary' : 'secondary'}
                >
                  <TagText variant={isNew === false ? 'primary' : 'secondary'}>
                    Usado
                  </TagText>
                  <TagCloseIcon
                    variant={isNew === false ? 'primary' : 'secondary'}
                  />
                </Tag>
              </HStack>
            </VStack>

            {/* TRADE */}
            {/* sem gap pois o switch tem espaçamento interno que não da para alterar */}
            <VStack>
              <Text className="text-gray-600 text-sm font-bold leading-snug">
                Aceita troca
              </Text>
              <HStack>
                <Switch
                  defaultValue={acceptTrade}
                  // value={acceptTrade}
                  onValueChange={newValue => {
                    setAcceptTrade(newValue)
                  }}
                />
              </HStack>
            </VStack>

            {/* PAYMENT */}
            <VStack className="gap-3">
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

          {/* ACTIONS */}
          <HStack className="gap-3">
            <Button type="gray" className="flex-1" onPress={handleClearFilters}>
              <ButtonText type="gray">Resetar filtros</ButtonText>
            </Button>

            <Button
              type="black"
              className="flex-1"
              onPress={handleApplyFilters}
            >
              <ButtonText type="black">Aplicar filtros</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </BottomSheetModal>
    </>
  )
}
