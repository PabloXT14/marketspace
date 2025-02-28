import { useAuthStore } from '@/store/auth-store'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.2.123:3333',
})

// Adicionando interceptador para renovar token automaticamente
api.interceptors.response.use(
  response => response,
  async requestError => {
    const originalRequest = requestError.config

    const isTokenExpired =
      requestError.response?.data?.message === 'token.expired'
    const isTokenInvalid =
      requestError.response?.data?.message === 'token.invalid'

    if (
      requestError.response.status === 401 &&
      !originalRequest._retry &&
      (isTokenExpired || isTokenInvalid)
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) throw new Error('Refresh token não encontrado')

        const response = await api.post('/sessions/refresh-token', {
          refresh_token: refreshToken,
        })

        const newAccessToken = response.data.token

        // Atualiza o token no Zustand e AsyncStorage
        useAuthStore.getState().setTokens(newAccessToken, refreshToken)

        // Atualiza o token no header da requisição e refaz a requisição original
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (error) {
        console.log('Erro ao renovar token: ', error)
        useAuthStore.getState().signOut()
      }
    }

    return Promise.reject(requestError)
  }
)

export { api }
