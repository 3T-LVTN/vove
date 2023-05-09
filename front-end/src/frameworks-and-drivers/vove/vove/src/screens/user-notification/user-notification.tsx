import React from "react";
import {StyleSheet, Text, View} from "react-native";
export interface UserNotificationProps {
  navigation: any;
}

export function UserNotification(props: UserNotificationProps) {
  return (
    <View style={styles.center}>
      <Text>User noti</Text>
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

export default UserNotification;
