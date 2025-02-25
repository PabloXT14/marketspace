import AsyncStorage from '@react-native-async-storage/async-storage'

import { TOKEN_STORAGE_KEY } from './config'

export async function setAuthTokenStorage(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export async function getAuthTokenStorage() {
  const storage = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)

  const token = storage ? storage : ''

  return { token }
}

export async function removeAuthTokenStorage() {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
}
