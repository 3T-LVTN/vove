import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {InputText} from "../../../components/src/inputs/input-text";

export interface InsertOtpSignupProps {
  readonly navigation: any;
}

export function InsertOtpSignup(props: InsertOtpSignupProps) {

  return (<View style={styles.center}>
    <Text>insert otp</Text>
    <InputText title={"OTP"} placeholder={"insert otp"}></InputText>
    <Button
      title="Next"
      onPress={() => props.navigation.navigate("SetNewPassword")}
    />
  </View>);
}


const styles = StyleSheet.create({
  center: {
    flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center",
  },
});

export default InsertOtpSignup;
