import React, {useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {InquirySummaryCard} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import {Color, customSize, InquiryStatusType, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import {ButtonOption} from "../../components/src/buttons/button-option";

const mockInquiries: InquiryViewModel[] = [
  {
    id: "1",
    timestamp: "03/05/2023 15:15",
    title: "The predict results at my living area is incorrect",
    status: InquiryStatusType.OPENING,
    address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
    content: "I am writing to inquire about your epidemic forecast service. I am interested in using your service to help me better understand the likelihood and severity of potential disease outbreaks in my area. Can you provide me with more information about the data sources you use and the accuracy of your forecasts? Additionally, can you tell me more about the range of diseases that your service covers and the methods you use for analyzing and predicting outbreaks?",
    comments: [{byUser: false, content: "I will take a look", timestamp: "05/05/2023 15:00"}, {byUser: true, content: "Please help me", timestamp: "06/05/2023 15:00"}]

  },
  {
    id: "2",
    timestamp: "03/04/2023 15:15",
    title: "I can't find my place on your map",
    status: InquiryStatusType.OPENING,
    address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
    content: "",
    comments: []
  },
  {
    id: "3",
    timestamp: "03/03/2023 15:15",
    title: "Add travel advisories for disease outbreaks",
    status: InquiryStatusType.WAITING,
    address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
    content: "",
    comments: []
  },
  {
    id: "4",
    timestamp: "03/02/2023 15:15",
    title: "Add support for multiple languages",
    status: InquiryStatusType.CLOSED,
    address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
    content: "",
    comments: []
  },
  {
    id: "5",
    timestamp: "03/01/2023 15:15",
    title: "Can you let us choose the theme color",
    status: InquiryStatusType.WAITING,
    address: "Xã Tân Xuân, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
    content: "",
    comments: []
  }
]

export interface InquiryListProps {
  navigation: any;
}

export function InquiryList(props: InquiryListProps) {
  const {navigation} = props;
  const [selected, setSelected] = useState(0);
  const buttonColor = (index: number) => {
    return index == selected ? Color.primary_100 : Color.white_100;
  };
  const textColor = (index: number) => {
    return index == selected ? Color.white_100 : Color.primary_100;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{...TextStyle.h3, color: Color.primary_100}}>Inquiry List</Text>
        <View style={styles.func}>
          <ButtonOption
            iconName="message-draw"
            content="New Inquiry"
            onPress={() => navigation.navigate("NewInquiry")}
          />
        </View>
      </View>
      <View style={{marginTop: customSize(3)}}>
        {/*<Text style={{...TextStyle.h3, color: Color.primary_100}}>Inquiry List</Text>*/}
        <View style={{flexDirection: "row", marginTop: customSize(12)}}>
          <Pressable onPress={() => setSelected(0)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(72),
                backgroundColor: buttonColor(0),
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderWidth: 1
              }}
            >
              <Text style={{...TextStyle.h4, color: textColor(0)}}>
                All
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(1)}>
            <View
              style={{
                ...styles.buttonGroup,
                backgroundColor: buttonColor(1),
                width: customSize(85),
                borderTopWidth: 1,
                borderBottomWidth: 1
              }}
            >
              <Text style={{...TextStyle.h4, color: textColor(1)}}>
                Opening
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(2)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(85),
                backgroundColor: buttonColor(2),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1
              }}
            >
              <Text style={{...TextStyle.h4, color: textColor(2)}}>
                Waiting
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(3)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(85),
                backgroundColor: buttonColor(3),
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                borderWidth: 1
              }}
            >
              <Text style={{...TextStyle.h4, color: textColor(3)}}>
                Closed
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={{marginBottom: customSize(24)}}>
          {selected === 0
            ? mockInquiries.map((item) => <InquirySummaryCard key={item.id} status={item.status} navigation={navigation}
                                                              title={item.title} timeStamp={item.timestamp} inquiryDetail={item}/>)
            : selected === 1
              ? mockInquiries
                .filter((item) => item.status === InquiryStatusType.OPENING)
                .map((item) => <InquirySummaryCard key={item.id} status={item.status} navigation={navigation} title={item.title}
                                                   timeStamp={item.timestamp} inquiryDetail={item} />)
              : selected === 2
                ? mockInquiries
                  .filter((item) => item.status === InquiryStatusType.WAITING)
                  .map((item) => <InquirySummaryCard key={item.id} status={item.status} navigation={navigation} title={item.title}
                                                     timeStamp={item.timestamp} inquiryDetail={item}/>)
                : mockInquiries
                  .filter((item) => item.status === InquiryStatusType.CLOSED)
                  .map((item) => <InquirySummaryCard key={item.id} status={item.status} navigation={navigation} title={item.title}
                                                     timeStamp={item.timestamp} inquiryDetail={item}/>)
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: "100%",
  },
  func: {
    marginVertical: customSize(12),
  },
  buttonGroup: {
    justifyContent: "center",
    alignItems: "center",
    height: customSize(24),
    borderColor: Color.primary_100,
  },
});


export default InquiryList;
