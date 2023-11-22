import {View} from 'react-native';
import {Box, Button, FlatList, Spinner, Text} from 'native-base';
import {BackButton, PageContainer, VehicleCard} from '../../components';
import React, {useEffect, useState, useContext} from 'react';
import {VehiclesService} from '../../services/vehicles.service';
import {UserContext} from '../../contexts/UserContext';
import {useTranslation} from 'react-i18next';
import { useUserVehicleContext } from '../../contexts/UserVehiclesContex';

const Vehicles = ({navigation}) => {
  const {userVehicles, loading} = useUserVehicleContext();
  const { t } = useTranslation();


  return (
    <PageContainer>
      <BackButton
        title={t('pages.home.vehiclesTab.title')}
        navigation={navigation}
        rightButton={
          <Button
            variant={'solid'}
            colorScheme={'primary'}
            onPress={() => navigation.navigate('NewVehicle')}
          >
            {t('pages.home.vehiclesTab.newVehicle')}
          </Button>
        }
      />

      {(loading || !loading && userVehicles.length === 0) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading && <Spinner />}
          {!loading && userVehicles.length === 0 && (
            <Box
              padding={4}
            >
              <Text
                fontSize={'xl'}
                fontWeight={'bold'}
                textAlign={'center'}
              >Voce não possui veículos cadastrados</Text>
              <Text
                textAlign={'center'}
                color={'gray.500'}
                mt={2}
                fontStyle={'italic'}
              >
                Antes de começar a usar o app, cadastre um veículo para que possamos te ajudar a fazer a gestão completa dos seus ganhos, despesas e muito mais!
              </Text>
            </Box>
          )}
        </View>
      )}

      {!loading && userVehicles.length > 0 && (
        <FlatList
          marginTop={4}
          data={userVehicles}
          renderItem={({item: vehicle}) => (
            <VehicleCard
              onPress={() => navigation.navigate('VehicleDetails', {vehicle})}
              {...vehicle}
            />
          )}
          keyExtractor={(item) => item.vehicleId}
        />
      )}
    </PageContainer>
  );
};

export default Vehicles;
