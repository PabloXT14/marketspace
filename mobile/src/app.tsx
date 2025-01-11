import { useState } from 'react'
import { View } from 'react-native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Loading } from '@/components/loading'
import { Input } from '@/components/input'
import { Checkbox, CheckboxGroup } from '@/components/checkbox'
import { Radio, RadioGroup } from '@/components/radio'

import Logo from '@/assets/logo.svg'
import '../global.css'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  const [checkboxValuesSelected, setCheckboxValuesSelected] = useState([
    'check-1',
  ])
  const [radioSelected, setRadioSelected] = useState('')

  // console.log('CHECKBOX VALUES: ', checkboxValuesSelected)
  // console.log('RADIO SELECTED: ', radioSelected)

  return (
    <GluestackUIProvider mode="light">
      {fontsLoaded ? (
        <View className="flex-1 justify-center items-center p-4">
          <Logo />

          <View className="gap-4 w-full">
            <Input placeholder="Name" />

            <Input placeholder="Email" />

            <CheckboxGroup
              value={checkboxValuesSelected}
              onChange={keys => setCheckboxValuesSelected(keys)}
              className="gap-2"
            >
              <Checkbox value="check-1" label="Checkbox 1" />
              <Checkbox value="check-2" label="Checkbox 2" />
              <Checkbox value="check-3" label="Checkbox 3" />
            </CheckboxGroup>

            <RadioGroup
              value={radioSelected}
              onChange={value => setRadioSelected(value)}
            >
              <Radio value="radio-1" label="Radio 1" />
              <Radio value="radio-2" label="Radio 2" />
              <Radio value="radio-3" label="Radio 3" />
            </RadioGroup>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  )
}
