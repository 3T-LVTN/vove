import {StyleSheet, Text, View} from "react-native";
import {Color, InquiryStatusType, TextStyle} from "@front-end/shared/utils";

export interface StatusLabelProps {
  readonly status: InquiryStatusType;
}
export const StatusLabel = (props: StatusLabelProps) => {
  const {status} = props;
  const STATUS_DATA = [
    {
      color: Color.primary_60,
      text: "Opening",
    },
    {
      color: Color.yellow_80,
      text: "Waiting",
    },
    {
      color: Color.grey_80,
      text: "Closed"
    }
  ];
  return (
    <View
      style={{...styles.container, backgroundColor: STATUS_DATA[status].color}}
    >
      <Text style={{...TextStyle.label, color: "white"}}>
        {STATUS_DATA[status].text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: Color.white_100,
    alignSelf: "flex-start",
  },
});
