import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

export interface InquiryDetailProps {
  navigation: any;
}

export function InquiryDetail(props: InquiryDetailProps) {
  return (
    <View style={styles.center}>
      <Text>Inquiry detail</Text>
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

export default InquiryDetail;
