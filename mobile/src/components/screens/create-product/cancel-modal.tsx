import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Text } from '@/components/ui/text'

import { Button, ButtonText } from '@/components/button'

type CancelModalProps = {
  onConfirm: () => void
}

export function CancelModal({ onConfirm }: CancelModalProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  function handleClose() {
    setShowAlertDialog(false)
  }

  return (
    <>
      <Button
        className="flex-1"
        type="gray"
        onPress={() => setShowAlertDialog(true)}
      >
        <ButtonText type="gray">Cancelar</ButtonText>
      </Button>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />

        <AlertDialogContent className="bg-gray-100">
          <AlertDialogHeader>
            <Text className="text-gray-700 text-lg font-bold" size="md">
              Você tem certeza que deseja cancelar a criação?
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-gray-600 text-sm font-regular">
              Caso realmente queira cancelar, clique em "sim".
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter className="flex-row items-center gap-2">
            <Button type="gray" onPress={handleClose} className="flex-1">
              <ButtonText type="gray">Não</ButtonText>
            </Button>

            <Button
              type="black"
              onPress={() => {
                onConfirm()
                handleClose()
              }}
              className="flex-1"
            >
              <ButtonText type="black">Sim</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
