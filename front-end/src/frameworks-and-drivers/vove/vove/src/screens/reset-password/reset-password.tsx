import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface ResetPasswordProps {
  navigation: any;
}

export function ResetPassword(props: ResetPasswordProps) {
  return (
    <View style={styles.center}>
      <Text>Reset password</Text>
      <Button
        title="Confirm"
        onPress={() => props.navigation.navigate("ResetPasswordSucceed")}
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

export default ResetPassword
;
