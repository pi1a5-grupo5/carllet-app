import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserVehiclesContext = createContext(null);

export const UserVehiclesProvider = ({ children }) => {
  const [userPrincipalVehicle, setUserPrincipalVehicle] = React.useState({});

  const removeUserVehicles = async () => await AsyncStorage.removeItem('@CARLLET:USER_VEHICLES');

  const handleUpdateUserPrincipalVehicle = (vehicle) => {
    setUserPrincipalVehicle(vehicle);
  }

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
    getUserData();
  }, []);

  return (
    <UserVehiclesContext.Provider
      value={{
        userPrincipalVehicle,
        handleUpdateUserPrincipalVehicle,
      }}>
      {children}
    </UserVehiclesContext.Provider>
  );
};
