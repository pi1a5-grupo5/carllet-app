import {Text} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {BackButton, PageContainer} from '../../components';
import {Button} from 'native-base';
import {UserVehiclesContext} from '../../contexts/UserVehiclesContex';

const VehicleDetails = ({navigation, route}) => {
  const {userPrincipalVehicle, handleUpdateUserPrincipalVehicle} = useContext(UserVehiclesContext);

  useEffect(() => {
    console.log('route.params.vehicle', route.params.vehicle);
  }, []);

  const handlePrincipalVehicle = (vehicle) => {
    handleUpdateUserPrincipalVehicle(vehicle);
  };

  return (
    <PageContainer>
      <BackButton navigation={navigation} title={'Detalhes do veiculo'} />
      <Text>VehicleDetails</Text>

      {userPrincipalVehicle && !(userPrincipalVehicle.userVehicleId === route.params.vehicle.userVehicleId) && (
        <Button
          variant={'solid'}
          colorScheme={'primary'}
          onPress={() => handlePrincipalVehicle(route.params.vehicle)}
        >
          Setar como principal
        </Button>
      )}
    </PageContainer>
  );
};

export default VehicleDetails;
