import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface InquiryListProps {
  navigation: any;
}

export function InquiryList(props: InquiryListProps) {
  return (
    <View style={styles.center}>
      <Text>Inquiry list</Text>
      <Button
        title="Inquiry 001"
        onPress={() => props.navigation.navigate("InquiryDetail")}
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

export default InquiryList;
