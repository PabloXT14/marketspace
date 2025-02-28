import { create } from 'zustand'

import type { UserDTO } from '@/dtos/user'

import {
  getUserStorage,
  removeUserStorage,
  setUserStorage,
} from '@/storage/user-storage'
import {
  setAuthTokenStorage,
  removeAuthTokenStorage,
  getAuthTokenStorage,
} from '@/storage/auth-token-storage'
import { api } from '@/services/api'

type AuthState = {
  user: UserDTO | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  signIn: (user: UserDTO, token: string, refreshToken: string) => Promise<void>
  signOut: () => Promise<void>
  loadAuthData: () => Promise<void>
  setTokens: (token: string, refreshToken: string) => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  refreshToken: null,
  isLoading: true,

  signIn: async (user: UserDTO, token: string, refreshToken: string) => {
    try {
      await setUserStorage(user)
      await setAuthTokenStorage({ token, refreshToken })

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      set({ user, token, refreshToken })
    } catch (error) {
      console.log('Erro ao salvar credenciais: ', error)
    }
  },

  signOut: async () => {
    try {
      await removeUserStorage()
      await removeAuthTokenStorage()

      set({ user: null, token: null })
    } catch (error) {
      console.log('Erro ao remover credenciais: ', error)
    }
  },

  loadAuthData: async () => {
    try {
      const { user } = await getUserStorage()
      const { token, refreshToken } = await getAuthTokenStorage()

      if (user && token && refreshToken) {
        set({ user, token, refreshToken })

        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.log('Erro ao carregar credenciais: ', error)
    } finally {
      set({ isLoading: false })
    }
  },

  setTokens: async (token: string, refreshToken: string) => {
    try {
      await setAuthTokenStorage({ token, refreshToken })
      set({ token, refreshToken })

      console.log('Token atualizado com sucesso')
    } catch (error) {
      console.log('Erro ao salvar credenciais: ', error)
    }
  },
}))
