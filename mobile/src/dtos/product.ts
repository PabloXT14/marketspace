export type AllowedPaymentMethods =
  | 'pix'
  | 'card'
  | 'deposit'
  | 'cash'
  | 'boleto'

type PaymentMethod = {
  key: AllowedPaymentMethods
  name: string
}

type ProductImage = {
  id: string
  path: string
}

export type ProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: PaymentMethod[]
  product_images: ProductImage[]
  user_id?: string
  user: {
    avatar: string
    name: string
    tel: string
  }
  is_active?: boolean
  created_at?: string
  updated_at?: string
}
