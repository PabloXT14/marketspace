import { api } from '@/services/api'

import type { AllowedPaymentMethods, ProductDTO } from '@/dtos/product'

type GetProductsRequest = {
  is_new?: boolean
  accept_trade?: boolean
  payment_methods?: AllowedPaymentMethods[]
  query?: string
}

export async function getProducts({
  is_new,
  accept_trade,
  payment_methods,
  query,
}: GetProductsRequest) {
  const response = await api.get('/products', {
    params: {
      is_new,
      accept_trade,
      payment_methods,
      query,
    },
  })

  const products = response.data as ProductDTO[]

  return {
    products,
  }
}
