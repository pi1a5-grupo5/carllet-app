import {extendTheme} from 'native-base';

export const theme = extendTheme({
  breakpoints: {
    base: 0,
    sm: 280,
    md: 320,
    lg: 768,
    xl: 1024,
  },
  colors: {
    primary: {
      50: '#C0DFD3',
      100: '#9CCBB8',
      200: '#7CB69D',
      300: '#6AA68B',
      400: '#5F967C',
      500: '#588970',
      600: '#507963',
      700: '#486856',
      800: '#3A4C40',
      900: '#2C362B',
    },
  },
  fontConfig: {
    Roboto: {
      100: {normal: 'Roboto_100Thin'},
      300: {normal: 'Roboto_300Light'},
      400: {normal: 'Roboto_400Regular'},
      700: {normal: 'Roboto_700Bold'},
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
});
