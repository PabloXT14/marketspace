import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Image } from '@/components/ui/image'

type UserPhotoProps = ComponentProps<typeof Image>

export function UserPhoto({ className, ...props }: UserPhotoProps) {
  return (
    <Image
      className={twMerge('rounded-full border-2 border-blue-500', className)}
      {...props}
    />
  )
}
