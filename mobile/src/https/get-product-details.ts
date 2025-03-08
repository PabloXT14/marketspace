import { api } from '@/services/api'

import type { ProductDTO } from '@/dtos/product'

type GetProductDetailsRequest = {
  id: string
}
export async function getProductDetails({ id }: GetProductDetailsRequest) {
  const response = await api.get(`/products/${id}`)

  return {
    product: response.data as ProductDTO,
  }
}
