import { VStack } from '@/components/ui/vstack'

import { Header } from '@/components/screens/home/header'
import { Sell } from '@/components/screens/home/sell'

export function Home() {
  return (
    <VStack className="flex-1 gap-10 pt-9 px-6">
      <Header />

      <Sell />
    </VStack>
  )
}
