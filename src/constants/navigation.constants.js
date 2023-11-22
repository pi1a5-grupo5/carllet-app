import {
  BudgetScreen,
  DevelopmentScreen,
  ForecastScreen,
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
    name: 'menuItems.forecast',
    component: ForecastScreen,
    icon: 'show-chart',
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
    icon: 'stacked-bar-chart',
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
