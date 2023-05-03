import React from "react";
import {Button, StyleSheet, View, Text} from "react-native";

export interface ResetPasswordSucceedProps {
  readonly navigation: any;
}

export function ResetPasswordSucceed(props: ResetPasswordSucceedProps) {
  return (
    <View style={styles.center}>
      <Text>Reset pass succeed</Text>
      <Button
        title="OK"
        onPress={() => props.navigation.goBack(props.navigation.popToTop())}
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

export default ResetPasswordSucceed
;
