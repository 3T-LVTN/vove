import React from "react";
import {StyleSheet, View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import HeatMap from "./heat-map"; // remove PROVIDER_GOOGLE import if not using Google Maps


export const normalMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 10.7644912,
          longitude: 106.702996,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <HeatMap/>
      </MapView>
    </View>)
}


const styles = StyleSheet.create({
  container: {
    height: "95%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default normalMap;
