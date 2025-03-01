import { api } from '@/services/api'

import type { AllowedPaymentMethods, ProductDTO } from '@/dtos/product'

export async function getUserProducts() {
  const response = await api.get('/users/products')

  const products = response.data as ProductDTO[]

  return {
    products,
  }
}
