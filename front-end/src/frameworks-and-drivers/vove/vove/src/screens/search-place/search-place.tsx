import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface SearchPlaceProps {
  navigation: any;
}

export function SearchPlace(props: SearchPlaceProps) {
  return (
    <View style={styles.center}>
      <Text>Search place</Text>
      <Button
        title="Confirm"
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

export default SearchPlace;
