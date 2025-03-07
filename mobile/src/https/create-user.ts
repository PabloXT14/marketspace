import { api } from '@/services/api'

type CreateUserRequest = {
  data: {
    name: string
    email: string
    tel: string
    password: string
    avatar: Blob
  }
}

export async function createUser({ data }: CreateUserRequest) {
  const { name, email, tel, password, avatar } = data

  const formData = new FormData()

  formData.append('name', name)
  formData.append('email', email)
  formData.append('tel', tel)
  formData.append('password', password)
  formData.append('avatar', avatar)

  await api.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
