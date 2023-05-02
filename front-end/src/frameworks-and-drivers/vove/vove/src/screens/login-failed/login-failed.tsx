import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface LoginFailedProps {
  navigation: any;
}

export function LoginFailed(props: LoginFailedProps) {
  return (
    <View style={styles.center}>
      <Text>Login failed</Text>
      <Button
        title="Sign Up"
        onPress={() => props.navigation.navigate("Signup")}
      />
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

export default LoginFailed;
