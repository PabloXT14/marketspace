import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import {
  Input as GlueStackInput,
  InputField as GlueStackInputField,
} from '@/components/ui/input'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control'

import { colors } from '@/styles/colors'

type InputProps = {
  children?: ReactNode
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

function Input({
  children,
  errorMessage = null,
  isInvalid = false,
  isReadOnly = false,
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} className="w-full">
      <GlueStackInput
        className={twMerge(
          'h-14 w-full px-4 flex-row items-center gap-2 bg-gray-100 border border-transparent rounded-lg data-[focus=true]:border-gray-500',
          isReadOnly && 'opacity-40'
        )}
        isReadOnly={isReadOnly}
        focusable
      >
        {children}
      </GlueStackInput>

      <FormControlError>
        <FormControlErrorText className="text-red-400">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}

type InputFieldProps = ComponentProps<typeof GlueStackInputField>

function InputField({ ...props }: InputFieldProps) {
  return (
    <GlueStackInputField
      className={twMerge(
        'flex-1 p-0 text-gray-600 text-base font-regular rounded-lg'
      )}
      placeholderTextColor={colors.gray[400]}
      {...props}
    />
  )
}

export { Input, InputField }
