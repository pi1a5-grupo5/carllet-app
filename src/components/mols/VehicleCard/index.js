import { Box, Text, Image, Icon, Pressable } from 'native-base'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const VehicleCard = ({
  color = 'gray',
  brand = 'Chevrolet',
  model = 'Camaro',
  odometer,
  rented,
  id,
  ...props
}) => {

  const { navigation } = props

  return (
    <Pressable
      bg="white"
      shadow={1}
      rounded="lg"
      width="100%"
      alignSelf="center"
      p={2}
      mb={2}
      flex={1}
      flexDirection="row"
      justifyContent="space-between"
      alignItems={"center"}

      onPress={() => {
        console.log('VehicleCard pressed')
        navigation.navigate('VehicleDetails', { id })
      }}
      _pressed={
        {
          bg: 'light.100'
        }
      }
    >
      <Box
        rounded="lg"
        width={"25%"}
        p={2}
      >
        <Icon
          as={FontAwesome5}
          name="car"
          resizeMode="cover"
          size={75}
          color={`dark.100`}
        />
      </Box>
      <Box
        p={2}
        width={"75%"}
        rounded="lg"
        flex={1}
        flexDirection="column"
      >
        <Box>
          <Text
            fontSize="md"
            fontWeight="bold"
          >
            {brand} - {model}
          </Text>
        </Box>
        <Box>
          <Box
            mt={2}
            flex={1}
            flexDirection="row"
            gap={2}
          >
            <Text
              fontWeight="bold"
            >
              Hodometro:
            </Text>
            <Text>
              {odometer ?? 0} km registrados
            </Text>
          </Box>

          <Box
            mt={2}
            flex={1}
            flexDirection="row"
            gap={2}
          >
            <Text
              fontWeight="bold"
            >
              Alugado:
            </Text>
            <Text fontWeight="light">{rented ? 'Sim' : 'Não'}</Text>
          </Box>


        </Box>
      </Box>
    </Pressable >
  )
}

export default VehicleCard