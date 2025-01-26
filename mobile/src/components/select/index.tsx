import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { CaretDown } from 'phosphor-react-native'

import {
  Select as UISelect,
  SelectTrigger as UISelectTrigger,
  SelectInput as UISelectInput,
  SelectIcon as UISelectIcon,
  SelectPortal as UISelectPortal,
  SelectBackdrop as UISelectBackdrop,
  SelectContent as UISelectContent,
  SelectDragIndicatorWrapper as UISelectDragIndicatorWrapper,
  SelectDragIndicator as UISelectDragIndicator,
  SelectItem as UISelectItem,
} from '@/components/ui/select'

import { colors } from '@/styles/colors'

function Select({ ...props }: ComponentProps<typeof UISelect>) {
  return <UISelect {...props} />
}

function SelectTrigger({
  className,
  ...props
}: ComponentProps<typeof UISelectTrigger>) {
  return (
    <UISelectTrigger
      className={twMerge(
        'min-h-12 min-w-40 justify-between pr-3 border border-gray-300 rounded-lg',
        className
      )}
      {...props}
    />
  )
}

function SelectInput({
  className,
  ...props
}: ComponentProps<typeof UISelectInput>) {
  return (
    <UISelectInput
      className={twMerge(
        'text-gray-700 placeholder:text-gray-500 px-3 py-2 text-sm font-regular leading-snug',
        className
      )}
      {...props}
    />
  )
}

function SelectIcon({
  className,
  ...props
}: ComponentProps<typeof UISelectIcon>) {
  return (
    <UISelectIcon
      className={twMerge('fill-gray-500', className)}
      as={CaretDown}
      size="md"
      {...props}
    />
  )
}

function SelectPortal({
  className,
  ...props
}: ComponentProps<typeof UISelectPortal>) {
  return <UISelectPortal className={twMerge(className)} {...props} />
}

function SelectBackdrop({
  className,
  ...props
}: ComponentProps<typeof UISelectBackdrop>) {
  return <UISelectBackdrop className={twMerge(className)} {...props} />
}

function SelectContent({
  className,
  ...props
}: ComponentProps<typeof UISelectContent>) {
  return <UISelectContent className={twMerge('p-4', className)} {...props} />
}

function SelectDragIndicatorWrapper({
  className,
  ...props
}: ComponentProps<typeof UISelectDragIndicatorWrapper>) {
  return (
    <UISelectDragIndicatorWrapper className={twMerge(className)} {...props} />
  )
}

function SelectDragIndicator({
  className,
  ...props
}: ComponentProps<typeof UISelectDragIndicator>) {
  return <UISelectDragIndicator className={twMerge(className)} {...props} />
}

function SelectItem({
  className,
  ...props
}: ComponentProps<typeof UISelectItem>) {
  return (
    <UISelectItem
      className={twMerge('group rounded-lg', className)}
      {...props}
      textStyle={{
        className: 'group-data-[checked=true]:font-bold',
      }}
    />
  )
}

export {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
}
