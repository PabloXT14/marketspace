import { Center } from '../ui/center'
import { Text } from '../ui/text'

type ListEmptyProps = {
  message: string
}

export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <Center className="flex-1">
      <Text className="text-gray-500 text-sm font-regular leading-snug">
        {message}
      </Text>
    </Center>
  )
}
