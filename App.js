import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { NativeBaseProvider } from "native-base";
import { theme } from './src/theme/theme';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/contexts/UserContext';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';


import Routes from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const requestLocationPermission = async () => {
    const granted = await Promise.all([
      Location.requestForegroundPermissionsAsync(),
      Location.requestBackgroundPermissionsAsync()
    ])

    if (!granted) {
      alert('Precisamos da sua permissão para acessar a localização!');
    }

    return granted;
  }

  useEffect(() => {
    requestLocationPermission().then(granted => {
      console.log(granted)
    })
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <UserProvider>
          <Routes />
        </UserProvider>
      </NativeBaseProvider >
    </NavigationContainer>
  );
}
