import {
  Box, Text, Icon, Pressable, Tag, HStack, Image, View, Button, VStack, Badge,
} from 'native-base';
import React, { useContext } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { UserVehiclesContext } from '../../../contexts/UserVehiclesContex';
import { useTranslation } from 'react-i18next';
import { createVehicleImageURI } from '../../../constants/vehicleImage.constant';

const VehicleCard = ({
  color = 'gray',
  vehicleBrandName = 'Chevrolet',
  vehicleTypeName = 'Onix',
  fabricationYear = 2021,
  odometer = 300,
  rented,
  id,
  onPress,
  vehicleId,
  userVehicleId,
  ...props
}) => {
  const { userPrincipalVehicle } = useContext(UserVehiclesContext);
  const { t } = useTranslation();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingTop: 24,
        paddingBottom: (userPrincipalVehicle.userVehicleId === userVehicleId) ? 62 : 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        borderWidth: (userPrincipalVehicle.userVehicleId === userVehicleId) ? 2 : 0,
        borderColor: (userPrincipalVehicle.userVehicleId === userVehicleId) ? 'primary.500' : 'transparent',
      }}
    >
      <Box>
        <Text
          fontSize={'xl'}
          fontWeight={'bold'}
          textAlign={'center'}
          color={'black'}
        >
          {vehicleBrandName} {vehicleTypeName}
        </Text>
        <Text
          fontSize={'sm'}
          textAlign={'center'}
          color={'gray.500'}
        >
          {fabricationYear} - {t('Eddition')}
        </Text>
      </Box>
      <Image
        source={{ uri: createVehicleImageURI({ model: 'onix', brand: 'chevrolet', color: 'gray' }) }}
        alt={'vehicle'}
        resizeMode={'contain'}
        height={200}
        width={'100%'}
        borderRadius={8}
      />

      <Box
        mt={4}
        flexDirection={'row'}
        gap={5}
        width={'100%'}
        paddingX={4}
      >
        <VStack
          space={1}
        >
          <Box
            bg={'primary.100'}
            p={2}
            borderRadius={'full'}
            width={10}
            height={10}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Icon
              as={<FontAwesome5 name={'tachometer-alt'} />}
              color={'white'}
              style={{ width: '115%' }}
              ml={2.5}
            />
          </Box>
          <Text
            fontSize={'sm'}
            color={'gray.400'}
          >
            {t('Odometer')}
          </Text>
          <Text
            fontSize={'md'}
            fontWeight={'bold'}
          >
            {odometer} km
          </Text>
        </VStack>
        <VStack
          space={1}
        >
          <Box
            bg={'primary.100'}
            p={2}
            borderRadius={'full'}
            width={10}
            height={10}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Icon
              as={<MaterialIcons name={'format-paint'} />}
              color={'white'}
            />
          </Box>
          <Text
            fontSize={'sm'}
            color={'gray.400'}
          >
            {t('Color')}
          </Text>

          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >

            <Box
              bg={`${color}.500`}
              borderRadius={'full'}
              width={2}
              height={2}
            />
            <Text
              fontSize={'md'}
              fontWeight={'bold'}
              ml={2}
            >
              {t(`colors.${color}`)}
            </Text>
          </Box>
        </VStack>

      </Box>
      {!(userPrincipalVehicle.userVehicleId === userVehicleId) && (
        <Box
          width={'100%'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
        >
          <Button
            variant={'ghost'}
            colorScheme={'primary'}
            onPress={onPress}
            mt={4}
          >
            {t('Set as principal')}
          </Button>
        </Box>
      )}
    </View>
  );
};

export default VehicleCard;
