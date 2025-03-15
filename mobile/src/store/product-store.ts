import { create } from 'zustand'

import type { ProductDTO } from '@/dtos/product'

type ProductStore = {
  product: ProductDTO
  setProduct: (product: ProductDTO) => void
}

export const useProductStore = create<ProductStore>(set => ({
  product: {} as ProductDTO,
  setProduct: product => set({ product }),
}))
