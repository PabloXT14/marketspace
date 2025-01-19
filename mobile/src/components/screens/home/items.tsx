import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

import { Search } from './search'

export function Items() {
  return (
    <VStack className="w-full gap-6">
      <VStack className="gap-3">
        {/* TITLE */}
        <Text className="text-gray-500 text-sm font-regular leading-snug">
          Compre produtos variados
        </Text>

        <Search />
      </VStack>
    </VStack>
  )
}
