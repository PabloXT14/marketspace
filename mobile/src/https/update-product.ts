import type { AllowedPaymentMethods } from '@/dtos/product'

import { api } from '@/services/api'

type UpdateProductRequest = {
  product_id: string
  data: {
    name?: string
    description?: string
    is_new?: boolean
    price?: number
    accept_trade?: boolean
    payment_methods?: AllowedPaymentMethods[]
  }
}

export async function updateProduct({
  data,
  product_id,
}: UpdateProductRequest) {
  await api.put(`/products/${product_id}`, data)
}
