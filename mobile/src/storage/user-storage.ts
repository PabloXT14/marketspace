import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE_KEY } from './config'
import type { UserDTO } from '@/dtos/user'

export async function setUserStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export async function getUserStorage() {
  const storage = await AsyncStorage.getItem(USER_STORAGE_KEY)

  const user: UserDTO = storage ? JSON.parse(storage) : null

  return { user }
}

export async function removeUserStorage() {
  await AsyncStorage.removeItem(USER_STORAGE_KEY)
}
