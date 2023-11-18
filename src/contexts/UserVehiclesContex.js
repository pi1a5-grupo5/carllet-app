import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VehiclesService } from '../services/vehicles.service';
import { UserContext } from './UserContext';

export const UserVehiclesContext = createContext(null);

export const useUserVehicleContext = () => React.useContext(UserVehiclesContext);

export const UserVehiclesProvider = ({ children }) => {
  const { user } = React.useContext(UserContext);
  const [userVehicles, setUserVehicles] = React.useState([]);
  const [userPrincipalVehicle, setUserPrincipalVehicle] = React.useState({});

  const removeUserVehicles = async () => await AsyncStorage.removeItem('@CARLLET:USER_VEHICLES');

  const handleUpdateUserPrincipalVehicle = (vehicle) => {
    setUserPrincipalVehicle(vehicle);
  };



  // Update userPrincipalVehicle on userPrincipalVehicleData change;
  useEffect(() => {
    if (Object.keys(userPrincipalVehicle).length) {
      removeUserVehicles();
      AsyncStorage.setItem('@CARLLET:USER_VEHICLES', JSON.stringify({ ...userPrincipalVehicle }));
    }
  }, [userPrincipalVehicle]);

  // Get user principal vehicle from async storage on app load
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@CARLLET:USER_VEHICLES');
        const userPrincipalVehicle = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (userPrincipalVehicle) {
          setUserPrincipalVehicle(userPrincipalVehicle);
        }
      } catch (error) {
        console.error(error);
      }
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

    getUserData();
    getVehicles().then((vehicles) => {
      setUserVehicles(vehicles);
    });
  }, []);

  return (
    <UserVehiclesContext.Provider
      value={{
        userPrincipalVehicle,
        handleUpdateUserPrincipalVehicle,
        userVehicles,
        setUserVehicles
      }}>
      {children}
    </UserVehiclesContext.Provider>
  );
};
