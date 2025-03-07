import { api } from '@/services/api'

import type { ProductImage } from '@/dtos/product'

type CreateProductImagesRequest = {
  data: {
    product_id: string
    images: Blob[]
  }
}

export async function createProductImages({
  data,
}: CreateProductImagesRequest) {
  const { product_id, images } = data

  const formData = new FormData()

  formData.append('product_id', product_id)

  // biome-ignore lint/complexity/noForEach: <explanation>
  images.forEach(image => {
    formData.append('images', image)
  })

  const response = await api.post('/products/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return {
    images: response.data as ProductImage[],
  }
}
