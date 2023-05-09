import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface TrackingListProps {
  navigation: any;
}

export function TrackingList(props: TrackingListProps) {
  return (
    <View style={styles.center}>
      <Text>tracking list</Text>
      <Button
        title="New place"
        onPress={() => props.navigation.navigate("NewTrackingPlace")}
      />
      <Button
        title="Edit place"
        onPress={() => props.navigation.navigate("EditTrackingPlace")}
      />
      <Button
        title="Place 001"
        onPress={() => props.navigation.navigate("PlaceDetail")}
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

export default TrackingList;
