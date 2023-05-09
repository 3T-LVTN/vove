import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface PlaceDetailProps {
  navigation: any;
}

export function PlaceDetail(props: PlaceDetailProps) {
  return (
    <View style={styles.center}>
      <Text>Place detail</Text>
      <Button
        title="Change place"
        onPress={() => props.navigation.navigate("SearchPlace")}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default PlaceDetail;
