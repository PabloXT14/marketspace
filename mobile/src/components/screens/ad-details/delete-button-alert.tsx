import { useState } from 'react'
import { TrashSimple } from 'phosphor-react-native'
import { AxiosError } from 'axios'
import { useNavigation } from '@react-navigation/native'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/components/ui/alert-dialog'

import { Button, ButtonText } from '@/components/button'
import { Text } from '@/components/ui/text'
import { ToastMessage } from '@/components/toast-message'
import { useToast } from '@/components/ui/toast'

import { colors } from '@/styles/colors'

import { deleteProduct } from '@/https/delete-product'
import type { AppRoutesNavigationProps } from '@/routes/app.routes'

type DeleteButtonAlertProps = {
  productId: string
}

export function DeleteButtonAlert({ productId }: DeleteButtonAlertProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AppRoutesNavigationProps>()

  const toast = useToast()

  async function handleDeleteProduct() {
    try {
      setIsLoading(true)

      await deleteProduct({ productId })

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title="Produto deletado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      })

      navigation.navigate('myAds')
    } catch (error) {
      console.log(error)

      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'Tente novamente, ou mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao deletar produto"
            description={errorMessage}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
      setShowAlertDialog(false)
    }
  }

  function handleClose() {
    setShowAlertDialog(false)
  }

  return (
    <>
      <Button type="gray" onPress={() => setShowAlertDialog(true)}>
        <TrashSimple size={20} color={colors.gray[500]} />

        <ButtonText type="gray">Excluir anúncio</ButtonText>
      </Button>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />

        <AlertDialogContent className="bg-gray-100">
          <AlertDialogHeader>
            <Text className="text-gray-700 text-lg font-bold" size="md">
              Você tem certeza que deletar o produto?
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody className="mt-3 mb-4">
            <Text className="text-gray-600 text-sm font-regular">
              Caso não queira, clique em cancelar.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter className="flex-row items-center gap-2">
            <Button type="gray" onPress={handleClose} className="flex-1">
              <ButtonText type="gray">Cancelar</ButtonText>
            </Button>
            <Button
              type="black"
              isLoading={isLoading}
              onPress={handleDeleteProduct}
              className="flex-1"
            >
              <ButtonText type="black">Deletar</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
