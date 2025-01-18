import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/home/header'

export function Home() {
  return (
    <VStack className="flex-1 pt-9 px-6">
      <Header />
    </VStack>
  )
}
