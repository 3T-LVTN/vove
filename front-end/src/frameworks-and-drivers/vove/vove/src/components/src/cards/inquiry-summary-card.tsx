import { Pressable, StyleSheet, Text, View } from "react-native";
import {ButtonType, Color, customSize, InquiryStatusType, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {StatusLabel} from "../status/status-label";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import inquiryDetail from "../../../screens/inquiry-detail/inquiry-detail";

export interface InquirySummaryCardProps {
  readonly title: string;
  readonly timeStamp: string;
  readonly status: InquiryStatusType;
  readonly navigation: any;
  readonly inquiryDetail: InquiryViewModel;
}
export const InquirySummaryCard = (props: InquirySummaryCardProps) => {
  const { title, timeStamp, status, navigation, inquiryDetail } = props;

  return (
    <Pressable onPress={() => {navigation.navigate("InquiryDetail", inquiryDetail); console.log("Hello", inquiryDetail)}} style={{width: "100%"}}>
      <View style={styles.container}>
        <View style={styles.line}>
          <Text style={{...TextStyle.bodySmall, color: Color.dark_80}}>
            {timeStamp}
          </Text>
          <StatusLabel status={status} />
        </View>
        <View style={{ height: customSize(14) }} />
        <View style={styles.line}>
          <Text style={TextStyle.h3}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    height: (117 / 375) * ScreenSize.width,
    backgroundColor: Color.white_100,
    borderWidth: 1,
    borderColor: Color.primary_100,
    marginTop: (12 / 375) * ScreenSize.width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});


