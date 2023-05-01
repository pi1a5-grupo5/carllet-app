import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, TextInput, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const removeExpoTokenString = (token) => {
    return token.replace('ExponentPushToken[', '').replace(']', '');
  }

  const handleFormSubmit = (values) => {
    
    const deviceId = removeExpoTokenString(expoPushToken);

    const userData = {
      ...values,
      deviceId
    }

    fetch('https://pocv2.azurewebsites.net/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setUserInfo(userData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>PI1A5 - Carllet App</Text>
      </View>

      {userInfo && (
        <View
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Device Token: {removeExpoTokenString(expoPushToken)}</Text>
          <Text>User Info - </Text>
          <Text>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      )}

      {!userInfo && (
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={values => handleFormSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: 200,
                  marginBottom: 10,
                }}
                placeholder='Name'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: 200,
                  marginBottom: 10,
                }}
                placeholder='Email'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: 200,
                  marginBottom: 10,
                }}
                placeholder='Password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              <Button
                style={{
                  marginTop: 10
                }}
                onPress={handleSubmit}
                title="Submit"
              />
            </View>
          )}
        </Formik>
      )}
    </SafeAreaView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}