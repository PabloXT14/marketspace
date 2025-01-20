import React, { useCallback, useRef } from 'react'
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

export function Filter() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const dimensions = useWindowDimensions()

  const snapPoints = {
    min: dimensions.height - 230,
    max: dimensions.height - 230,
  }

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present()
  }

  const handleCloseModalPress = () => {
    bottomSheetModalRef.current?.close()
  }

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index)
  }, [])

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
                <Tag>
                  <TagText>Novo</TagText>
                  <TagCloseIcon />
                </Tag>

                <Tag variant="secondary">
                  <TagText variant="secondary">Usado</TagText>
                  <TagCloseIcon variant="secondary" />
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
                <Switch />
              </HStack>
            </VStack>

            {/* PAYMENT */}
            <VStack className="gap-3">
              <Text className="text-gray-600 text-sm font-bold leading-snug">
                Meios de pagamento aceitos
              </Text>

              <CheckboxGroup
                value={[
                  'boleto',
                  'pix',
                  'dinheiro',
                  'credit-card',
                  'back-deposit',
                ]}
                className="gap-2"
              >
                <Checkbox value="boleto" label="Boleto" />
                <Checkbox value="pix" label="Pix" />
                <Checkbox value="dinheiro" label="Dinheiro" />
                <Checkbox value="credit-card" label="Cartão de crédito" />
                <Checkbox value="back-deposit" label="Depósito de volta" />
              </CheckboxGroup>
            </VStack>
          </VStack>

          {/* ACTIONS */}
          <HStack className="gap-3">
            <Button type="gray" className="flex-1">
              <ButtonText type="gray">Resetar filtros</ButtonText>
            </Button>

            <Button type="black" className="flex-1">
              <ButtonText type="black">Aplicar filtros</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </BottomSheetModal>
    </>
  )
}
