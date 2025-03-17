import { ScrollView } from 'react-native'

import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/edit-product/header'
import { Form } from '@/components/screens/edit-product/form'

export function EditProduct() {
  return (
    <VStack className="bg-gray-200 flex-1 pt-9">
      <Header />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Form />
      </ScrollView>
    </VStack>
  )
}
