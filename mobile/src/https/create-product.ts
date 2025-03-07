import type { AllowedPaymentMethods, ProductDTO } from '@/dtos/product'

import { api } from '@/services/api'

type CreateProductRequest = {
  name: string
  description: string
  price: number
  is_new: boolean
  accept_trade: boolean
  payment_methods: AllowedPaymentMethods[]
}

export async function createProduct(data: CreateProductRequest) {
  const response = await api.post('/products', data)

  return {
    product: response.data as ProductDTO,
  }
}
