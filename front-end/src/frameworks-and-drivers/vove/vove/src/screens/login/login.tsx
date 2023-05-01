import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {ScreenSize} from "@front-end/shared/utils";
import AnimatedSplash from "react-native-animated-splash-screen";


export function Login() {
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 2000);

  return (
    <AnimatedSplash
      isLoaded={loading}
      logoImage={require('../../assets/Vove.png')}
      backgroundColor={"#ffffff"}
      logoWidth={ScreenSize.height * 0.8}
    >
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </AnimatedSplash>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
