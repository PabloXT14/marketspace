import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE_KEY } from './config'

type AuthTokenStorageProps = {
  token: string
  refreshToken: string
}

export async function setAuthTokenStorage({
  token,
  refreshToken,
}: AuthTokenStorageProps) {
  const storage = JSON.stringify({ token, refreshToken })

  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE_KEY, storage)
}

export async function getAuthTokenStorage() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE_KEY)

  const { token, refreshToken }: AuthTokenStorageProps = storage
    ? JSON.parse(storage)
    : null

  return { token, refreshToken }
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}
