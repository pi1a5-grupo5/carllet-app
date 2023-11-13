import React, {createContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = React.useState({});
  const [isLogged, setIsLogged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const removeUserFromStorage = () => AsyncStorage.removeItem('@CARLLET:USER');
  const clearStorage = () => AsyncStorage.clear();

  const handleLogout = () => {
    setIsLogged(false);
    clearStorage();
  };

  // Get user from async storage on app load
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@CARLLET:USER');
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;

        // TODO: Check if token is valid
        if (user) {
          setUser(user);
          setIsLogged(true);
        }

        /*   // TODO: Refresh token
        if(false) {
           // TODO: Create refresh token service
           if(true) {
             // TODO: Update user on token refreshed
           }
         }  */

        else {
          setIsLogged(false);
          clearStorage();
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  // Update user on userData change
  useEffect(() => {
    if (Object.keys(user).length) {
      removeUserFromStorage();
      AsyncStorage.setItem('@CARLLET:USER', JSON.stringify({...user}));
    }
  }, [user]);


  // Clear storage on isLogged false
  useEffect(() => {
    console.log('isLogged', isLogged);
    if (!isLogged) {
      removeUserFromStorage();
    }
  }, [isLogged]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLogged,
      setIsLogged,
      handleLogout,
    }}>
      {isLoading ? <ActivityIndicator size={50} color="#FFF" /> : children}
    </UserContext.Provider>
  );
};

