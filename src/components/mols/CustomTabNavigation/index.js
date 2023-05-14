import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Play, Profile, Veicles } from '../../../screens'
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { TabBarCustomButton } from '../../../components';
import { APP_ROUTES, INITIAL_ROUTE } from '../../../constants/navigation.constants';


const Tab = createBottomTabNavigator();

const CustomTabNavigation = ({ routes = APP_ROUTES }) => {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
        },
      }}
    >
      {routes.map(({ name, component, icon, isCenter }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            headerShown: false,
             tabBarButton: (props) => <TabBarCustomButton {...props} item={{ name, component, icon, isCenter }} />, 
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default CustomTabNavigation