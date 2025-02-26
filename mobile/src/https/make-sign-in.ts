import type { UserDTO } from '@/dtos/user'
import { api } from '@/services/api'

type MakeSignInRequest = {
  email: string
  password: string
}

type MakeSignInResponse = {
  token: string
  user: UserDTO
  refresh_token: string
}

export async function makeSignIn({
  email,
  password,
}: MakeSignInRequest): Promise<MakeSignInResponse> {
  const response = await api.post('/sessions', {
    email,
    password,
  })

  const { token, user, refresh_token } = response.data

  return {
    token,
    user,
    refresh_token,
  }
}
