import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface EditTrackingPlaceProps {
  navigation: any;
}

export function EditTrackingPlace(props: EditTrackingPlaceProps) {
  return (
    <View style={styles.center}>
      <Text>Edit tracking place</Text>
      <Button
        title="Comfirm"
        onPress={() => props.navigation.goBack()}
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

export default EditTrackingPlace;
