import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface TrackingListProps {
  navigation: any;
}

export function TrackingList(props: TrackingListProps) {
  return (
    <View style={styles.center}>
      <Text>tracking list</Text>
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
