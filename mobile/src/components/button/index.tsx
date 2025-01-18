import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import {
  Button as GlueStackButton,
  ButtonText as GlueStackButtonText,
  ButtonSpinner,
} from '@/components/ui/button'

const buttonStyle = tv({
  base: 'flex-row items-center justify-center gap-2 w-full py-3 px-4 rounded-lg min-h-14 data-[active=true]:bg-inherit data-[active=true]:opacity-70',
  variants: {
    type: {
      black: 'bg-gray-700',
      blue: 'bg-blue-500',
      gray: 'bg-gray-300',
    },
  },
  defaultVariants: {
    type: 'blue',
  },
})

type ButtonProps = VariantProps<typeof buttonStyle> &
  ComponentProps<typeof GlueStackButton> & {
    isLoading?: boolean
  }

function Button({
  children,
  isLoading,
  type,
  className,
  ...props
}: ButtonProps) {
  return (
    <GlueStackButton
      className={buttonStyle({ type, class: className })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner
          className={twMerge(
            'text-gray-100',
            type === 'gray' && 'text-gray-600'
          )}
        />
      ) : (
        children
      )}
    </GlueStackButton>
  )
}

type ButtonTextProps = VariantProps<typeof buttonStyle> &
  ComponentProps<typeof GlueStackButtonText>

function ButtonText({ className, type, ...props }: ButtonTextProps) {
  return (
    <GlueStackButtonText
      className={twMerge(
        'text-gray-100 font-bold text-sm leading-snug data-[active=true]:text-inherit',
        type === 'gray' && 'text-gray-600',
        className
      )}
      {...props}
    />
  )
}

export { Button, ButtonText }
