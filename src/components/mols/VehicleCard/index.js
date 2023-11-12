import {
  Box, Text, Icon, Pressable, Tag, HStack,
} from 'native-base';
import React, { useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserVehiclesContext } from '../../../contexts/UserVehiclesContex';

const VehicleCard = ({
  color = 'gray',
  vehicleBrandName = 'Chevrolet',
  vehicleTypeName = 'Camaro',
  odometer = 300,
  rented,
  id,
  onPress,
  vehicleId,
  ...props
}) => {

  const { userPrincipalVehicle } = useContext(UserVehiclesContext);

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
      gap={2}
      flexDirection="row"
      justifyContent="space-between"
      alignItems={'center'}

      onPress={() => {
        onPress?.(id);
      }}
      _pressed={
        { bg: 'light.100' }
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
            {vehicleBrandName.toUpperCase()} - {vehicleTypeName}
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
          <Box
            marginTop={5}
          >
            <HStack
              space={2}
            >
              <Tag
                size="sm"
                variant="solid"
                px={2}
              >
                {rented ? 'Alugado' : 'Próprio'}
              </Tag> 
              {userPrincipalVehicle && userPrincipalVehicle.vehicleId === vehicleId && (
                <Tag
                  size="sm"
                  variant="solid"
                  px={2}
                >
                  Principal
                </Tag>
              )}
            </HStack>
          </Box>
        </Box>
      </Box>
    </Pressable >
  );
};

export default VehicleCard;
