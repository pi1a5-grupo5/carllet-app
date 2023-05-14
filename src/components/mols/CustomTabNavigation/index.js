import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Play, Profile, Veicles } from '../../../screens'
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { TabBarCustomButton } from '../../../components';


const Tab = createBottomTabNavigator();

export const APP_ROUTES = [
  { name: 'Home', component: Home, icon: "home" },
  { name: 'Veiculos', component: Veicles, icon: "directions-car" },
  { name: 'Play', component: Play, icon: "play-arrow", isCenter: true },
  { name: 'Metas', component: Home, icon: "bar-chart" },
  { name: 'Perfil', component: Profile, icon: "person" },
]

export const INITIAL_ROUTE = 'Play'

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
          left: 25,
          right: 25,
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
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                as={<MaterialIcons name={icon} />}
                color={color}
              />
            ),
             tabBarButton: (props) => <TabBarCustomButton {...props} item={{ name, component, icon, isCenter }} />, 
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default CustomTabNavigation