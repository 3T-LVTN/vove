/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { MainStack } from '../navigation/main.navigator';
import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from '@expo-google-fonts/lato';

export function App() {
  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <MainStack></MainStack>;
}

export default App;
