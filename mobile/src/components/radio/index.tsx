import type { ComponentProps } from 'react'
import { Circle } from 'phosphor-react-native'

import {
  Radio as UIRadio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  RadioGroup,
} from '@/components/ui/radio'

import { colors } from '@/styles/colors'

type RadioProps = ComponentProps<typeof UIRadio> & {
  label: string
}

function CircleIcon() {
  return <Circle size={14} weight="fill" color={colors.blue[500]} />
}

function Radio({ label, ...props }: RadioProps) {
  return (
    <UIRadio size="lg" {...props}>
      <RadioIndicator className="border-2 border-gray-400 data-[checked=true]:border-blue-500 data-[active=true]:border-blue-500">
        <RadioIcon as={CircleIcon} />
      </RadioIndicator>

      <RadioLabel className="text-base font-regular leading-snug text-gray-600">
        {label}
      </RadioLabel>
    </UIRadio>
  )
}

export { Radio, RadioGroup }
