import React from 'react'
import { useUserContext } from '../../../hooks/useUserContext'
import { Avatar, Box, Button, Modal, Spinner, Text } from 'native-base'
import { AVATARS } from '../../../constants/avatars.constants'

const SelectAvatar = ({
  isOpen,
  onClose,
}) => {

  const { handleUserAvatar } = useUserContext()
  const [isLoading, setIsLoading] = React.useState(false)

  const updateAvatar = async (avatar) => {
    setIsLoading(true)
    await handleUserAvatar(avatar)
      .finally(() => {
        onClose?.()
        setIsLoading(false)
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      borderRadius={8}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Alterar avatar</Modal.Header>
        <Modal.Body
          justifyContent={'center'}
          alignItems={'center'}
          p={0}
        >
          <Box
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            position={'relative'}
            p={2}
          >
            {AVATARS.map((avatar, index) => (
              <Button
                key={index}
                variant={'ghost'}
                onPress={() => updateAvatar(avatar.name)}
                isDisabled={isLoading}
              >
                <Avatar
                  size={'lg'}
                  source={{
                    uri: avatar.uri,
                  }}
                  borderColor={'white'}
                  background={'primary.100'}
                />
              </Button>
            ))}
            {isLoading && (
              <Box
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={0}
                justifyContent={'center'}
                alignItems={'center'}
                bg={'rgba(80,80,80,0.1)'}
              >
                <Spinner color={'primary.500'} size={'sm'} />
              </Box>
            )}
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default SelectAvatar