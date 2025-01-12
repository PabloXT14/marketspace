import type { ComponentProps } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { XCircle } from 'phosphor-react-native'

import { Icon } from '@/components/ui/icon'
import { colors } from '@/styles/colors'

type TagVariants = {
  variant?: 'primary' | 'secondary'
}

type TagProps = ComponentProps<typeof TouchableOpacity> & TagVariants

function Tag({ variant = 'primary', className, ...props }: TagProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'bg-blue-500 rounded-full pl-4 pr-2 py-2 items-center flex-row gap-2',
        variant === 'secondary' && 'bg-gray-300 px-4 py-2',
        className
      )}
      activeOpacity={0.7}
      {...props}
    />
  )
}

type TextProps = ComponentProps<typeof Text> & TagVariants

function TagText({ variant = 'primary', className, ...props }: TextProps) {
  return (
    <Text
      className={twMerge(
        'text-white text-xs font-bold leading-snug uppercase',
        variant === 'secondary' && 'text-gray-500',
        className
      )}
      {...props}
    />
  )
}

function CloseIcon() {
  return <XCircle size={16} weight="fill" color={colors.gray[200]} />
}

type TagCloseIconProps = ComponentProps<typeof Icon> & TagVariants

function TagCloseIcon({ className, variant, ...props }: TagCloseIconProps) {
  if (variant === 'secondary') {
    return null
  }

  return (
    <Icon as={CloseIcon} size="md" className={twMerge(className)} {...props} />
  )
}

export { Tag, TagText, TagCloseIcon }
