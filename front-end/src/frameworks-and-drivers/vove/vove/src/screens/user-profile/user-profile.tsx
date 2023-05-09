import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface UserProfileProps {
  navigation: any;
}

export function UserProfile(props: UserProfileProps) {
  return (
    <View style={styles.center}>
      <Text>User profile</Text>
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

export default UserProfile;
