import { api } from '@/services/api'

type UpdateProductVisibilityRequest = {
  id: string
  is_active: boolean
}

export async function updateProductVisibility({
  id,
  is_active,
}: UpdateProductVisibilityRequest) {
  await api.patch(`/products/${id}`, { is_active })
}
