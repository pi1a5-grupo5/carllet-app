import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import { CustomTabNavigation } from '../../components/mols';
import { APP_ROUTES, INITIAL_ROUTE } from '../../constants/navigation.constants';

const Stack = createNativeStackNavigator();

const SecuredRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
    >
      <Stack.Screen
        name="Start"
        options={{ headerShown: false }}
      >
        {() => (
          <CustomTabNavigation
            routes={APP_ROUTES}
            initialRoute={INITIAL_ROUTE}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Veiculos"
        component={APP_ROUTES[1].component}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  )
}

export default SecuredRoutes