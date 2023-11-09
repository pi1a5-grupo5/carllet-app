import React from 'react'
import { Box, Button, Icon, Pressable, Text } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'

const CarActionSheetItem = ({
  brand = 'Fiat',
  model = 'Uno',
  color = 'black',
  odometer = 300,
  isLastChild,
  onClick,
}) => {

  return (
    <Pressable
      variant={'ghost'}
      flex={1}
      flexDirection={'row'}
      rounded="lg"
      width="100%"
      alignSelf="center"
      borderBottomColor={'gray.300'}
      borderBottomWidth={isLastChild ? 0 : 1}
      gap={2}
      justifyContent="space-between"
      alignItems={'center'}
      onPress={onClick}

      _pressed={
        {
          backgroundColor: 'gray.100',
        }
      }

    >
    <Box
        rounded="lg"
        maxW={'30%'}
        p={2}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Icon
          as={FontAwesome5}
          name="car"
          resizeMode="cover"
          size={70}
          color={`dark.100`}
        />
      </Box>
      <Box
        px={2}
        rounded="lg"
        flex={1}
        flexDirection="column"
      >
        <Box>
          <Text
            fontSize="md"
            fontWeight="bold"
          >
            {brand.toUpperCase()} - {model}
          </Text>
        </Box>
        <Box
          borderColor="gray.300"
          rounded="lg"
          mt={1}
        >
          <Box
            flex={1}
            flexDirection="row"
            gap={2}
            alignItems={'center'}
          >
            <Box size={18}>
              <Icon
                as={FontAwesome5}
                name="road"
                size={18}
                color={`dark.100`}
                style={{ width: '115%' }}
              />
            </Box>
            <Text>{odometer} KM</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  )
}

export default CarActionSheetItem