import { View } from 'react-native';
import { Box, Button, FlatList, Spinner, Text } from 'native-base';
import { PageContainer, VehicleCard } from '../../components';
import React, { useEffect, useState, useContext } from 'react';
import { VehiclesService } from '../../services/vehicles.service';
import { UserContext } from '../../contexts/UserContext';

const Vehicles = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const getVehicles = async () => {
    try {
      const vehicles = await VehiclesService.getVehiclesByUser(user?.id);

      if (!vehicles.length === 0 || !vehicles) {
        return [];
      }
      return vehicles;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getVehicles().then((vehicles) => {
      setVehicles(vehicles);
    }).catch((error) => {
      setVehicles([]);
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

      {!loading && vehicles.length > 0 && (
        <FlatList
          data={vehicles}
          renderItem={({ item: vehicle }) => (
            <VehicleCard
              onPress={() => navigation.navigate('VehicleDetails', { vehicle })}
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
