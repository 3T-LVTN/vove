import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import NormalMap from "../../components/src/map/normal-map";

export interface HomeProps {
  navigation: any;
}

export function Home(props: HomeProps) {
  return (
    <View style={styles.center}>
      <NormalMap></NormalMap>
      <Button
        title="Search"
        onPress={() => props.navigation.navigate("SearchPlace")}
      />
      <Button
        title="Detail"
        onPress={() => props.navigation.navigate("PlaceDetail")}
      />
      <Button
        title="My Tracking List"
        onPress={() => props.navigation.navigate("TrackingSummary")}
      />
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
