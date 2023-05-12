import {Color, customSize, ScreenSize, TextStyle, TrackingPlaceStatusType} from "@front-end/shared/utils";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {InputSwitch} from "@front-end/frameworks-and-drivers/vove/vove/src/components";

export interface TrackingPlaceStatusProps {
  readonly placeName: string;
  readonly address: string;
  readonly status: TrackingPlaceStatusType;
  readonly notificationAllowed: any;
  readonly navigation: any;
}

export const TrackingSummaryCard = (props: TrackingPlaceStatusProps) => {
  const {navigation, placeName, address, status, notificationAllowed} = props
  return (
    <Pressable onPress={() => {navigation.navigate("PlaceDetail")}} style={{width: "100%"}}>
      <View style={styles.container}>
        <View style={status === TrackingPlaceStatusType.GOOD ? styles.statusCircleGood : status === TrackingPlaceStatusType.LOW_RISK ? styles.statusCircleLowRisk : status === TrackingPlaceStatusType.HIGH_RISK ? styles.statusCircleHighRisk : styles.statusCircleEpidemic}></View>
        <View style={{width: "60%", paddingLeft: 8}}>
          <Text style={{...TextStyle.h3, color: Color.dark_80}}>
            {placeName}
          </Text>
          <Text style={{...TextStyle.bodySmall, color: Color.dark_80}}>
            {address}
          </Text>
        </View>
        <View style={{ height: customSize(14) }} />
        <View style={styles.line}>
          <InputSwitch defaultValue={notificationAllowed}></InputSwitch>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    height: (90 / 375) * ScreenSize.width,
    backgroundColor: Color.white_100,
    borderWidth: 1,
    borderColor: Color.dark_40,
    marginTop: (12 / 375) * ScreenSize.width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"

    // elevation: 5,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusCircleGood: {
    backgroundColor: Color.primary_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width
  },
  statusCircleHighRisk: {
    backgroundColor: Color.orange_20,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width
  },
  statusCircleLowRisk: {
    backgroundColor: Color.yellow_40,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width
  },
  statusCircleEpidemic: {
    backgroundColor: Color.red_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width
  },
});
