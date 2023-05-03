import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface ForgetPasswordProps {
  readonly navigation: any;
}

export function ForgetPassword(props: ForgetPasswordProps) {
  return (
    <View style={styles.center}>
      <Text>Forget pass</Text>
      {/*<InputText title="phone" placeholder="phone num"></InputText>*/}
      <Button
        title="Send OTP"
        onPress={() => props.navigation.navigate("InsertOtp")}
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
