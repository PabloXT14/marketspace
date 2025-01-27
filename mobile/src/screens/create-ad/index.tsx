import { ScrollView } from 'react-native'

import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/create-ad/header'
import { Form } from '@/components/screens/create-ad/form'

export function CreateAd() {
  return (
    <VStack className="bg-gray-200 flex-1 pt-9">
      <Header />

      <ScrollView>
        <Form />
      </ScrollView>
    </VStack>
  )
}
