import { Dimensions, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { X } from 'phosphor-react-native'

import { Toast, ToastDescription, ToastTitle } from '../ui/toast'
import { VStack } from '../ui/vstack'

import { colors } from '@/styles/colors'
import { HStack } from '../ui/hstack'

type ToastMessageProps = {
  id: string
  title: string
  description?: string
  action?: 'error' | 'success'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action,
  onClose,
}: ToastMessageProps) {
  const screenWidth = Dimensions.get('screen').width

  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      className={twMerge(
        'mt-10',
        action === 'error' && 'bg-red-400',
        action === 'success' && 'bg-success-500'
      )}
      style={{ width: screenWidth - 40 }}
    >
      <VStack>
        <HStack className="items-center gap-4 justify-between">
          <ToastTitle numberOfLines={1}>{title}</ToastTitle>
          <TouchableOpacity className="" onPress={onClose}>
            <X size={16} color={colors.gray[100]} />
          </TouchableOpacity>
        </HStack>

        {description && (
          <ToastDescription className="text-gray-100 text-sm font-regular leading-snug">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
