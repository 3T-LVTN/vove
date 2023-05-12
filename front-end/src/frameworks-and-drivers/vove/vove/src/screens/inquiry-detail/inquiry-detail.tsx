import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ButtonType, Color, customSize, InquiryStatusType, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {
  ButtonFullWidth, ButtonHalfWidth,
  ButtonSmall,
  InputInformation
} from "@front-end/frameworks-and-drivers/vove/vove/src/components";

export interface InquiryDetailProps {
  navigation: any;
}

export function InquiryDetail(props: InquiryDetailProps) {
  console.log(props.route.params);
  const inquiryDetail = props.route.params;
  const inquiryStatus: string = inquiryDetail.status === InquiryStatusType.CLOSED ? "CLOSED" : inquiryDetail.status === InquiryStatusType.OPENING ? "OPENING" : "WAITING";
  return (
    <View style={styles.container}>
      <View>
        <Text style={{...TextStyle.h2}}>{inquiryDetail.title}</Text>
      </View>
      <View style={{paddingTop: ScreenSize.height * 0.02}}/>
      <ScrollView style={{paddingTop: 12, backgroundColor: Color.white_100,}} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
        <View style={styles.center}>
          <InputInformation title="Time" information={inquiryDetail.timestamp} width="100%"></InputInformation>
          <InputInformation title="Status" information={inquiryStatus} width="100%"></InputInformation>
          <InputInformation title="Addess" information={inquiryDetail.address} width="100%"></InputInformation>
          <InputInformation title="Message" information={inquiryDetail.content} width="100%"></InputInformation>
        </View>
        <View style={{paddingTop: ScreenSize.height * 0.02}}/>
        {inquiryDetail.comments.length !== 0 ? (
          <View>
            <Text style={{...TextStyle.h3, color: Color.dark_100}}>Comments ({inquiryDetail.comments.length})</Text>
            <View style={{paddingTop: ScreenSize.height * 0.01}}/>
            {inquiryDetail.comments.map((item: any) =>
              <View key={item.index}>
                <View style={{...styles.center, borderColor: item.byUser ? Color.primary_100 : Color.yellow_20}}>
                  <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                    <Text style={{
                      ...TextStyle.bodyLarge,
                      alignSelf: "flex-start",
                      paddingHorizontal: 12,
                      color: item.byUser ? Color.primary_100 : Color.yellow_20
                    }}>{item.byUser ? "Me" : "Admin"}</Text>
                    <Text style={{
                      ...TextStyle.bodySmall,
                      alignSelf: "flex-start",
                      paddingHorizontal: 12,
                      color: item.byUser ? Color.primary_100 : Color.yellow_20
                    }}>{item.timestamp}</Text>

                  </View>
                  <InputInformation title="Message" information={item.content} width="100%"></InputInformation>

                </View>
                <View style={{paddingTop: ScreenSize.height * 0.015}}/>
              </View>
            )}
          </View>
        ) : null}
        <View style={{paddingTop: ScreenSize.height * 0.1}}/>
      </ScrollView>
      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 10}}>
        <ButtonHalfWidth type={inquiryDetail.status !== InquiryStatusType.CLOSED ? ButtonType.DEFAULT : ButtonType.DISABLE} content={"New Comment"} onPress={()=>{console.log('')}}/>
        <ButtonHalfWidth type={inquiryDetail.status !== InquiryStatusType.CLOSED ? ButtonType.RED : ButtonType.DISABLE} content={"Close Inquiry"} onPress={()=>{console.log('')}}/>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1,
    paddingHorizontal: customSize(5),
    paddingVertical: customSize(5),
  },
  container: {
    position: "relative",
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: "100%",
    width: "100%"
  },
});

export default InquiryDetail;

