import {
  BudgetScreen,
  DevelopmentScreen,
  HomeScreen,
  PlayScreen,
  ProfileScreen,
} from '../screens';

const APP_ROUTES = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
  },
  {
    name: 'Veiculos',
    component: DevelopmentScreen,
    icon: 'directions-car',
  },
  {
    name: 'Play',
    component: PlayScreen,
    icon: 'location-on',
    isCenter: true,
  },
  {
    name: 'Budget',
    component: BudgetScreen,
    icon: 'bar-chart',
  },
  {
    name: 'Perfil',
    component: ProfileScreen,
    icon: 'person',
  },
];

const INITIAL_ROUTE = 'Home';

export {
  APP_ROUTES,
  INITIAL_ROUTE,
};
