import {Text} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {BackButton, PageContainer} from '../../components';
import {Button} from 'native-base';
import {UserVehiclesContext} from '../../contexts/UserVehiclesContex';
import {useTranslation} from 'react-i18next';

const VehicleDetails = ({navigation, route}) => {
  const {userPrincipalVehicle, handleUpdateUserPrincipalVehicle} = useContext(UserVehiclesContext);
  const {t} = useTranslation();

  const handlePrincipalVehicle = (vehicle) => {
    handleUpdateUserPrincipalVehicle(vehicle);
  };

  return (
    <PageContainer>
      <BackButton navigation={navigation} title={t('pages.home.vehiclesTab.vehicleDetails')} />
      <Text>VehicleDetails</Text>

      {userPrincipalVehicle && !(userPrincipalVehicle.userVehicleId === route.params.vehicle.userVehicleId) && (
        <Button
          variant={'solid'}
          colorScheme={'primary'}
          onPress={() => handlePrincipalVehicle(route.params.vehicle)}
        >
          {t('pages.home.vehiclesTab.primaryVehicle')}
        </Button>
      )}
    </PageContainer>
  );
};

export default VehicleDetails;
