import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {
  ButtonFullWidth,
  InputDate,
  TrackingSummaryCard
} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import {Color, customSize, ScreenSize, TextStyle, TrackingPlaceStatusType} from "@front-end/shared/utils";
import {TrackingPlacesViewModel} from "@front-end/interface-adapters/view-models/tracking-places";

const trackingSummaryList: TrackingPlacesViewModel[] = [
  {
    id: "1",
    placeName: "Ngoc's house",
    address: "Lô D, chung cư Lạc Long Quân, Quận 11",
    status: TrackingPlaceStatusType.HIGH_RISK,
    notificationAllowed: true
  },
  {
    id: "2",
    placeName: "Thinh's house",
    address: "268 Lý Thường Kiệt, Quận 10",
    status: TrackingPlaceStatusType.GOOD,
    notificationAllowed: true
  }
]



export interface TrackingSummaryProps {
  navigation: any;
}

export function TrackingSummary(props: TrackingSummaryProps) {
  const [dob, setDob] = useState(new Date())

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <InputDate output={setDob}/>
        <View style={{paddingTop: ScreenSize.height * 0.02}}/>

        <Text style={{...TextStyle.h3, color: Color.primary_100, alignSelf: "flex-start"}}>My Place</Text>
        <TrackingSummaryCard placeName={"My area"} address={"24/5R Tân Xuân, Hóc Môn"} status={TrackingPlaceStatusType.LOW_RISK} notificationAllowed={true} navigation={props.navigation}/>
        <View style={{paddingTop: ScreenSize.height * 0.02}}/>

        <Text style={{...TextStyle.h3, color: Color.primary_100, alignSelf: "flex-start"}}>Other saved places</Text>
        {trackingSummaryList.map((trackingPlace) =>
          <TrackingSummaryCard placeName={trackingPlace.placeName} address={trackingPlace.address} status={trackingPlace.status} notificationAllowed={trackingPlace.notificationAllowed} navigation={props.navigation}/>
        )}
      </View>
      <ButtonFullWidth content={"All Saved Places"} onPress={() => props.navigation.navigate("TrackingList")}/>
      <View style={{paddingTop: ScreenSize.height * 0.01}}/>
    </View>
      );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    position: "relative",
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(5),
    backgroundColor: Color.white_100,
    height: "100%",
    width: "100%"
  },
});

export default TrackingSummary;
