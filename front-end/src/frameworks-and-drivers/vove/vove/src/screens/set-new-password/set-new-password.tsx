import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";
import {InputText} from "../../components/src/inputs/input-text";

export interface SetNewPasswordProps {
  readonly navigation: any;
}

export function SetNewPassword(props: SetNewPasswordProps) {
  return (
    <View style={styles.center}>
      <Text>Set new password</Text>
      <InputText title={"new pass"} placeholder={"insert new pass"}></InputText>
      <InputText title={"repeat"} placeholder={"repeat new pass"}></InputText>
      <Button
        title="Submit"
        onPress={() => props.navigation.navigate("SignupSucceed")}
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

export default SetNewPassword;
