import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface TrackingSummaryProps {
  navigation: any;
}

export function TrackingSummary(props: TrackingSummaryProps) {
  return (
    <View style={styles.center}>
      <Text>Tracking summary</Text>
      <Button
        title="Show all tracking places"
        onPress={() => props.navigation.navigate("TrackingList")}
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

export default TrackingSummary;
