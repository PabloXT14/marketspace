import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Switch as UISwitch } from '@/components/ui/switch'
import { colors } from '@/styles/colors'

type SwitchProps = ComponentProps<typeof UISwitch>

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <UISwitch
      size="lg"
      trackColor={{ true: colors.blue[500], false: colors.gray[300] }}
      thumbColor={colors.gray[100]}
      className={twMerge(className)}
      {...props}
    />
  )
}
