import {
  BudgetScreen,
  DevelopmentScreen,
  HomeScreen,
  PlayScreen,
  ProfileScreen,
  VehiclesScreen,
} from '../screens';

const APP_ROUTES = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
  },
  {
    name: 'menuItems.vehicles',
    component: VehiclesScreen,
    icon: 'directions-car',
  },
  {
    name: 'Play',
    component: PlayScreen,
    icon: 'location-on',
    isCenter: true,
  },
  {
    name: 'menuItems.control',
    component: BudgetScreen,
    icon: 'bar-chart',
  },
  {
    name: 'menuItems.profile',
    component: ProfileScreen,
    icon: 'person',
  },
];

const INITIAL_ROUTE = 'Home';

export {
  APP_ROUTES,
  INITIAL_ROUTE,
};
