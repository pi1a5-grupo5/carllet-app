import {
  Alert, VStack, HStack, IconButton, useToast, Text,
} from 'native-base';
import {CloseIcon} from 'native-base';
import React from 'react';

const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
  ...rest
}) => {
  const toast = useToast();

  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      marginX={5}
      flexDirection="row"
      status={status ? status : 'info'}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="bold"
              flexShrink={1}
              color={variant === 'solid' ? 'lightText' : variant !== 'outline' ? 'darkText' : null}>
              {title}
            </Text>
          </HStack>
          {
            isClosable ?
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{color: variant === 'solid' ? 'lightText' : 'darkText'}}
                onPress={() => toast.close(id)} /> :
              null
          }
        </HStack>
        <Text px="6" color={variant === 'solid' ? 'lightText' : variant !== 'outline' ? 'darkText' : null}>
          {description}
        </Text>
      </VStack>
    </Alert>
  );
};

export default ToastAlert;
