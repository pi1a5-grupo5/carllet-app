import { View } from 'react-native';
import { Box, Button, Spinner, Text } from 'native-base';
import { PageContainer } from '../../components';
import React, { useEffect, useState } from 'react';
import { VehiclesService } from '../../services/vehicles.service';

const Vehicles = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVehicles = async () => {
    try {
      const vehicles = await VehiclesService.getVehiclesByUser(1);

      if (vehicles.length > 0) {
        return vehicles;
      }

      return [];
    } catch (error) {
      throw new Error(error);
    }
  };


  useEffect(() => {
    getVehicles().then((vehicles) => {
      setVehicles(vehicles);
    }).catch((error) => {
      setVehicles([]);
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);


  return (
    <PageContainer>
      <Box
        mb={4}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Text
          fontSize={'xl'}
          fontWeight={'bold'}
        >Veículos</Text>
        <Button
          variant={'solid'}
          colorScheme={'primary'}
          onPress={() => navigation.navigate('NewVehicle')}
        >
          Novo veículo
        </Button>
      </Box>

      {(loading || !loading && vehicles.length === 0) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          {loading && <Spinner />}
          {!loading && vehicles.length === 0 && (
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
    </PageContainer>
  );
};

export default Vehicles;
