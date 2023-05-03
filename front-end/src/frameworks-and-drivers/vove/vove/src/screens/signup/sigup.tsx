import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface SignupProps {
  navigation: any;
}

export function Signup(props: SignupProps) {
  return (
    <View style={styles.center}>
      <Text>Sign Up</Text>
      <Button
        title="Next"
        onPress={() => props.navigation.navigate("InsertOtpSignup")}
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

export default Signup;
