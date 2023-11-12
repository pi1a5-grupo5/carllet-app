import React, {
  useEffect, useState, useRef, useContext, useMemo, useCallback,
} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text } from 'react-native';
import {
  getCurrentPositionAsync,
  watchPositionAsync,
} from 'expo-location';
import { ActionSheetContainer, CarActionSheetItem, PageContainer } from '../../components';
import haversine from 'haversine';
import {
  Actionsheet,
  Button, Icon, ScrollView, useDisclose,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { CourseService } from '../../services/course.service';
import { openToast } from '../../utils/openToast';
import { useUserContext } from '../../hooks/useUserContext';
import ActionSheet from '../../components/mols/BottomSheetModal';
import { VehiclesService } from '../../services/vehicles.service';
import { UserVehiclesContext } from '../../contexts/UserVehiclesContex';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CourseContext } from '../../contexts/CourseContext';

const Play = ({ navigation }) => {
  const { user } = useUserContext();
  const { userPrincipalVehicle, handleUpdateUserPrincipalVehicle } = useContext(UserVehiclesContext);
  const { handleUpdateCourses } = useContext(CourseContext);
  const [startTracking, setStartTracking] = useState(false);
  const [coords, setCoords] = useState({});
  const [prevCoord, setPrevCoord] = useState({});
  const [distance, setDistance] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  const mapRef = useRef(null);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleTracking = async () => {

    if (!Object.keys(userPrincipalVehicle).length > 0) {
      openToast({
        status: 'warning',
        title: 'Oops!',
        description: 'Você precisa selecionar seu veiculo principal para iniciar um percurso!',
      });
      handlePresentModalPress();
      return;
    }

    if (startTracking) {
      try {
        setStartTracking(!startTracking);

        const course = {
          userVehicleId: userPrincipalVehicle.userVehicleId,
          courseLength: distance.toFixed(2),
          courseEndTime: new Date().toISOString(),
        };
        
        const registeredCourse = await CourseService.registerCourse(course);
        if (registeredCourse) {
          handleUpdateCourses(registeredCourse);
          openToast({
            status: 'success',
            title: 'Sucesso',
            description: 'Percurso registrado com sucesso!',
          });
        }

        if (!registeredCourse) {
          openToast({
            status: 'error',
            title: 'Erro',
            description: 'Não foi possível registrar o percurso!',
          });
        }
      } catch (error) {
        openToast({
          status: 'error',
          title: 'Erro',
          description: 'Não foi possível registrar o percurso!',
        });

        console.error(error.message);
      } finally {
        navigation.navigate('Home');
      }

      setPrevCoord({});
      setDistance(0);
    }

    setStartTracking(!startTracking);
  };

  const onUpdateUserPrincipalVehicle = (vehicle) => {
    handleUpdateUserPrincipalVehicle(vehicle);
    handleCloseBottomSheet();
  };

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
    const getPosition = async () => {
      const { coords } = await getCurrentPositionAsync();
      setCoords(coords);
    };

    getPosition();
    getVehicles().then((vehicles) => {
      setVehicles(vehicles);
    })
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: 5,
      timeInterval: 1000,
      distanceInterval: 1,
    }, ({ coords }) => {
      setCoords((prevCoords) => {
        setPrevCoord(prevCoords);
        return coords;
      });

      mapRef.current?.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (startTracking) {
      const distance = haversine(prevCoord, coords, { unit: 'km' });
      setDistance((prevDistance) => prevDistance + distance);
    }
  }, [coords]);


  return (
    <PageContainer
      isSafe={false}
      isFullScreen={true}
    >
      {coords && (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={{
              width: '100%',
              height: '100%',
            }}
            region={{
              latitude: coords.latitude ?? 0,
              longitude: coords.longitude ?? 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.latitude ?? 0,
                longitude: coords.longitude ?? 0,
              }}
              title="Você está aqui"
              description="Você está aqui"
            />
          </MapView>

          <View
            style={{
              position: 'absolute',
              top: 60,
              left: 15,
              right: 15,
              padding: 16,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Text>Percurso registrado: </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
              }}>
              {distance.toFixed(2)} km
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              top: '50%',
              right: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Button
              variant={'solid'}
              backgroundColor={startTracking ? 'red.400' : 'primary.500'}
              onPress={handleTracking}
              size={'lg'}
              leftIcon={
                <Icon
                  as={MaterialIcons}
                  name={startTracking ? 'stop' : 'play-arrow'}
                  size={6}
                  color={'white'}
                />}
            >
              {startTracking ? 'Parar' : 'Iniciar'}
            </Button>
          </View>

        </>
      )}

      {!Object.keys(userPrincipalVehicle).length > 0 && vehicles.length > 0 && (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ScrollView>
            {vehicles.map((vehicle, index) => (
              <CarActionSheetItem key={vehicle.vehicleId}
                brand={vehicle.brand}
                model={vehicle.model}
                odometer={vehicle.odometer}
                rented={vehicle.rented}
                onClick={() => onUpdateUserPrincipalVehicle(vehicle)}
              />
            )
            )}
          </ScrollView>
        </BottomSheetModal>
      )}

    </PageContainer>
  );
};

export default Play;
