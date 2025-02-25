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

type AuthState = {
  user: UserDTO | null
  token: string | null
  isLoading: boolean
  signIn: (user: UserDTO, token: string) => Promise<void>
  signOut: () => Promise<void>
  loadAuthData: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isLoading: true,

  signIn: async (user: UserDTO, token: string) => {
    try {
      await setUserStorage(user)
      await setAuthTokenStorage(token)

      set({ user, token })
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
      const { token } = await getAuthTokenStorage()

      if (user && token) {
        set({ user, token })
      }
    } catch (error) {
      console.log('Erro ao carregar credenciais: ', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
