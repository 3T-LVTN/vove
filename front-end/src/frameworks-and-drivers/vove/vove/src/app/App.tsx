/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {Login} from "../screens/login/login";
import {MainStack} from "../navigation/main.navigator";

export function App() {
  return <MainStack></MainStack>;
}

export default App;
