import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBarCustomButton} from '../../../components';


const Tab = createBottomTabNavigator();

const CustomTabNavigation = ({routes, initialRoute}) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
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
      {routes.map(({name, component, icon, isCenter}, index) => {
        return (
          <Tab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              headerShown: false,
              tabBarButton: (props) => <TabBarCustomButton {...props} item={{
                name,
                component,
                icon,
                isCenter,
              }} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default CustomTabNavigation;
