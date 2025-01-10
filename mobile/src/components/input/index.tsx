import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Input as GlueStackInput, InputField } from '@/components/ui/input'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control'

import { colors } from '@/styles/colors'

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Input({
  errorMessage = null,
  isInvalid = false,
  isReadOnly = false,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} className="w-full">
      <GlueStackInput
        className={twMerge(
          'h-14 border border-transparent rounded-lg data-[focus=true]:border-gray-500',
          isReadOnly && 'opacity-40'
        )}
        isReadOnly={isReadOnly}
        focusable
      >
        <InputField
          className={twMerge(
            'px-4 text-gray-600 bg-gray-100 text-base font-regular leading-snug rounded-lg'
          )}
          placeholderTextColor={colors.gray[400]}
          {...props}
        />
      </GlueStackInput>

      <FormControlError>
        <FormControlErrorText className="text-red-400">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
