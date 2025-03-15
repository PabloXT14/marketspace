import { create } from 'zustand'

import type { ProductDTO } from '@/dtos/product'
import type { CreateAdFormProps } from '@/components/screens/create-ad/form'

type ProductStore = {
  product: ProductDTO
  setProduct: (product: ProductDTO) => void
  productPreview: CreateAdFormProps
  setProductPreview: (product: CreateAdFormProps) => void
}

export const useProductStore = create<ProductStore>(set => ({
  product: {} as ProductDTO,
  setProduct: product => set({ product }),

  productPreview: {} as CreateAdFormProps,
  setProductPreview: product => set({ productPreview: product }),
}))
