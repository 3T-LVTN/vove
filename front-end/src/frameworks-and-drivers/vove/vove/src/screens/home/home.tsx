import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NormalMap from "../../components/src/map/normal-map";

export interface HomeProps {
  navigation: any;
}

export function Home(props: HomeProps) {
  return (
    <View style={styles.center}>
      <NormalMap></NormalMap>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
