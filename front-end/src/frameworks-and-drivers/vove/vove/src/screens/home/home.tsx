import React from "react";
import {StyleSheet, View, Text} from "react-native";

export interface HomeProps {
  navigation: any;
}

export function Home(props: HomeProps) {
  return (
    <View style={styles.center}>
      <Text>Home</Text>
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

export default Home;
