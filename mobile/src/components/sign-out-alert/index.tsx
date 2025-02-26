import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SignOut } from 'phosphor-react-native'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/components/ui/alert-dialog'
import { Button, ButtonText } from '../button'
import { Text } from '../ui/text'

import { useAuthStore } from '@/store/auth-store'

import { colors } from '@/styles/colors'

export function SignOutAlert() {
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  const signOut = useAuthStore(state => state.signOut)

  async function handleSignOut() {
    await signOut()
  }

  function handleClose() {
    setShowAlertDialog(false)
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowAlertDialog(true)}
        className="items-center justify-center"
      >
        <SignOut size={24} color={colors.red[400]} />
      </TouchableOpacity>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />

        <AlertDialogContent className="bg-gray-100">
          <AlertDialogHeader>
            <Text className="text-gray-700 text-lg font-bold" size="md">
              Você tem certeza que deseja sair?
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-gray-600 text-sm font-regular">
              Caso queira continuar logado, clique em cancelar.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter className="flex-row items-center gap-2">
            <Button type="gray" onPress={handleClose} className="flex-1">
              <ButtonText type="gray">Cancelar</ButtonText>
            </Button>
            <Button type="black" onPress={handleSignOut} className="flex-1">
              <ButtonText type="black">Sair</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
