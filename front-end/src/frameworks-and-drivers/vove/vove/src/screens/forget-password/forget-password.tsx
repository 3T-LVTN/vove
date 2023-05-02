import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface ForgetPasswordProps {
  navigation: any;
}

export function ForgetPassword(props: ForgetPasswordProps) {
  return (
    <View style={styles.center}>
      <Text>Forget pass</Text>
      <Button
        title="Back to Login"
        onPress={() => props.navigation.navigate("Login")}
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

export default ForgetPassword;
