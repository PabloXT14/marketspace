import { TouchableOpacity, View } from 'react-native'
import { MagnifyingGlass, Sliders } from 'phosphor-react-native'

import { Input, InputField } from '@/components/input'

import { colors } from '@/styles/colors'

export function Search() {
  return (
    <Input>
      <InputField placeholder="Buscar anúncio" />

      <TouchableOpacity>
        <MagnifyingGlass size={20} color={colors.gray[600]} weight="bold" />
      </TouchableOpacity>

      {/* DIVIDER */}
      <View className="w-px h-6 mx-2 bg-gray-400" />

      <TouchableOpacity>
        <Sliders size={20} color={colors.gray[600]} weight="bold" />
      </TouchableOpacity>
    </Input>
  )
}
