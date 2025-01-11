import type { ComponentProps } from 'react'
import { Check } from 'phosphor-react-native'

import {
  Checkbox as UICheckbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import { colors } from '@/styles/colors'

type CheckboxProps = ComponentProps<typeof UICheckbox> & {
  label: string
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <UICheckbox size="lg" {...props}>
      <CheckboxIndicator className="border-2 data-[checked=true]:bg-blue-500 data-[checked=true]:border-blue-500 data-[active=true]:data-[checked=true]:bg-blue-500 data-[active=true]:data-[checked=true]:border-blue-500">
        {/* <CheckboxIcon as={Check} className="fill-white" size="md" /> */}
        <Check size={14} weight="bold" color={colors.white} />
      </CheckboxIndicator>

      <CheckboxLabel className="text-base font-regular leading-snug text-gray-600">
        {label}
      </CheckboxLabel>
    </UICheckbox>
  )
}
