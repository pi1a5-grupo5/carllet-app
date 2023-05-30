import React, { createContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [isLogged, setIsLogged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const clearStorage = () => AsyncStorage.removeItem('@CARLLET:USER')

  const handleLogout = () => {
    setIsLoading(true)
    setUser({})
    setIsLogged(false)
    setIsLoading(false)
  }

  // Get user from async storage on app load
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@CARLLET:USER')

        const user = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (user) {
          setUser(user)
          setIsLogged(true)
        } else {
          setIsLogged(false)
          clearStorage()
        }

        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }

    getUserData();
  }, [])

  // Update user on userData change

  useEffect(() => {
    if (Object.keys(user).length) {
      clearStorage();
      AsyncStorage.setItem('@CARLLET:USER', JSON.stringify({
        ...user,
      }))
    }
  }, [user])
  

  // Clear storage on isLogged false

  useEffect(() => {
    if (!isLogged) {
      clearStorage()
    }
  }, [isLogged])


  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged, handleLogout }}>
      {isLoading ? <ActivityIndicator size={50} color="#FFF" /> : children}
    </UserContext.Provider>
  );
}

