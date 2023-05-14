import { Home, Veicles, Play, Profile } from '../screens'

export const APP_ROUTES = [
  { name: 'Home', component: Home, icon: "home" },
  { name: 'Veiculos', component: Veicles, icon: "directions-car" },
  { name: 'Play', component: Play, icon: "location-on", isCenter: true },
  { name: 'Metas', component: Home, icon: "bar-chart" },
  { name: 'Perfil', component: Profile, icon: "person" },
]

export const INITIAL_ROUTE = 'Play'