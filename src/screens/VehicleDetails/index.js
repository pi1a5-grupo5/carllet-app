import { Text } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { BackButton, PageContainer } from '../../components';
import { Button } from 'native-base';
import { UserVehiclesContext } from '../../contexts/UserVehiclesContex';

const VehicleDetails = ({ navigation, route }) => {

  const { userPrincipalVehicle, handleUpdateUserPrincipalVehicle } = useContext(UserVehiclesContext);

  const handlePrincipalVehicle = (vehicle) => {
    handleUpdateUserPrincipalVehicle(vehicle)
  }

  return (
    <PageContainer>
      <BackButton navigation={navigation} title={'Detalhes do veiculo'} />
      <Text>VehicleDetails</Text>

      {userPrincipalVehicle && !(userPrincipalVehicle.vehicleId === route.params.vehicle.vehicleId) && (
        <Button
          variant={'solid'}
          colorScheme={'primary'}
          onPress={() => handlePrincipalVehicle(route.params.vehicle)}
        >
          Setar como principal
        </Button>
      )}

      <Button
        variant={'solid'}
        colorScheme={'primary'}
        onPress={onOpen}
      >
        Ações
      </Button>
    </PageContainer>
  );
};

export default VehicleDetails;
