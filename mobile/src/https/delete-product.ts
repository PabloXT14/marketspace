import { api } from '@/services/api'

type DeleteProductRequest = {
  productId: string
}

export async function deleteProduct({ productId }: DeleteProductRequest) {
  await api.delete(`/products/${productId}`)
}
