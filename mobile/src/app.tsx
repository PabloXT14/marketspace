import { useState } from 'react'
import { View } from 'react-native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'

import { Loading } from '@/components/loading'
import { Input } from '@/components/input'
import { Checkbox, CheckboxGroup } from '@/components/checkbox'
import { Radio, RadioGroup } from '@/components/radio'
import { Tag, TagText, TagCloseIcon } from '@/components/tag'

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

  const [tags, setTags] = useState(['novo', 'usado'])
  const [tagsSelected, setTagsSelected] = useState<string[]>([])

  // console.log('CHECKBOX VALUES: ', checkboxValuesSelected)
  // console.log('RADIO SELECTED: ', radioSelected)

  function handleToggleTag(tag: string) {
    if (tagsSelected.includes(tag)) {
      setTagsSelected(tagsSelected.filter(t => t !== tag))
    } else {
      setTagsSelected([...tagsSelected, tag])
    }
  }

  return (
    <GluestackUIProvider mode="light">
      {fontsLoaded ? (
        <VStack className="flex-1 justify-center items-center p-4 gap-3">
          <Logo />

          <VStack className="gap-4 w-full">
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
          </VStack>

          <HStack className="gap-4 w-full items-start">
            {tags.map(tag => (
              <Tag
                key={tag}
                variant={tagsSelected.includes(tag) ? 'primary' : 'secondary'}
                onPress={() => handleToggleTag(tag)}
              >
                <TagText
                  variant={tagsSelected.includes(tag) ? 'primary' : 'secondary'}
                >
                  {tag}
                </TagText>

                <TagCloseIcon
                  variant={tagsSelected.includes(tag) ? 'primary' : 'secondary'}
                />
              </Tag>
            ))}
          </HStack>
        </VStack>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  )
}
