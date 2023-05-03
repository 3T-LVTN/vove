import { StyleSheet } from 'react-native';
import {
  Lato_700Bold,
  Lato_400Regular,
  useFonts,
} from '@expo-google-fonts/lato';

export const InitializeFonts = () => {
  useFonts({
    Lato_700Bold,
    Lato_400Regular,
  });
};

export const TextStyle = StyleSheet.create({
  h1: {
    // fontFamily: 'Lato_700Bold',
    fontSize: 30,
    lineHeight: 36,
  },
  h2: {
    // fontFamily: 'Lato_700Bold',
    fontSize: 22,
    lineHeight: 30,
  },
  h3: {
    // fontFamily: 'Lato_700Bold',
    fontSize: 16,
    lineHeight: 22,
  },
  h4: {
    // fontFamily: 'Lato_700Bold',
    fontSize: 14,
    lineHeight: 20,
  },
  display: {
    // fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLarge: {
    // fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  bodySmall: {
    // fontFamily: 'Lato_400Regular',
    fontSize: 12,
    lineHeight: 20,
  },
  label: {
    // fontFamily: 'Lato_700Bold',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
