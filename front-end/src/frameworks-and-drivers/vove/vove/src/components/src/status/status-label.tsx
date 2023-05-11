import {StyleSheet, Text, View} from "react-native";
import {Color, InquiryStatusType, TextStyle} from "@front-end/shared/utils";

export interface StatusLabelProps {
  readonly status: InquiryStatusType;
}
export const StatusLabel = (props: StatusLabelProps) => {
  const {status} = props;
  const STATUS_DATA = [
    {
      color: Color.primary_100,
      text: "Opening",
    },
    {
      color: Color.yellow_20,
      text: "Waiting",
    },
    {
      color: Color.grey_100,
      text: "Closed"
    }
  ];
  return (
    <View
      style={{...styles.container, borderColor: STATUS_DATA[status].color}}
    >
      <Text style={{...TextStyle.label, color: STATUS_DATA[status].color}}>
        {STATUS_DATA[status].text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: Color.white_100,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
});
