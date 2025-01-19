export type ProductDTO = {
  id: string
  title: string
  price: number
  imageUrl: string
  condition: 'new' | 'used'
  seller: string
  sellerImageUrl: string
  isAdActive: boolean
}
