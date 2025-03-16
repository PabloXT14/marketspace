import { api } from '@/services/api'

type DeleteProductImagesRequest = {
  productImagesIds: string[]
}

export async function deleteProductImages({
  productImagesIds,
}: DeleteProductImagesRequest) {
  await api.delete('/products/images', {
    data: {
      productImagesIds,
    },
  })
}
