import { Center } from '@/components/ui/center'
import { Spinner } from '@/components/ui/spinner'

export function Loading() {
  return (
    <Center className="flex-1 bg-gray-200">
      <Spinner className="text-blue-500" />
    </Center>
  )
}
