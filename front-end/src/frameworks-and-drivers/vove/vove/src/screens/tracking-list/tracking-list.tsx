import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
  TrackingPlaceStatusType,
} from '@front-end/shared/utils';
import { ButtonOption } from '../../components/src/buttons/button-option';
import { TrackingPlacesViewModel } from '@front-end/interface-adapters/view-models/tracking-places';
import { TrackingSummaryCard } from '@front-end/frameworks-and-drivers/vove/vove/src/components';

const trackingSummaryList: TrackingPlacesViewModel[] = [
  {
    id: '1',
    placeName: "Ngoc's house",
    address: 'Lô D, chung cư Lạc Long Quân, Quận 11',
    status: TrackingPlaceStatusType.EPIDEMIC,
    notificationAllowed: true,
  },
  {
    id: '2',
    placeName: "Thinh's house",
    address: '268 Lý Thường Kiệt, Quận 10',
    status: TrackingPlaceStatusType.GOOD,
    notificationAllowed: true,
  },
  {
    id: '3',
    placeName: "Quang's house",
    address: 'Cá sấu hoa cà, Phường 2, Quận 9',
    status: TrackingPlaceStatusType.GOOD,
    notificationAllowed: false,
  },
  {
    id: '4',
    placeName: "Vy's house",
    address: '268 Đoàn Văn Bơ, Quận 4',
    status: TrackingPlaceStatusType.LOW_RISK,
    notificationAllowed: true,
  },
  {
    id: '5',
    placeName: "Khang's house",
    address: 'Vạn Hạnh, Trung Chánh, Hóc Môn',
    status: TrackingPlaceStatusType.LOW_RISK,
    notificationAllowed: false,
  },
];

export interface TrackingListProps {
  navigation: any;
}

export function TrackingList(props: TrackingListProps) {
  const { navigation } = props;
  const [selected, setSelected] = useState(0);
  const buttonColor = (index: number) => {
    return index == selected ? Color.primary_100 : Color.white_100;
  };
  const textColor = (index: number) => {
    return index == selected ? Color.white_100 : Color.primary_100;
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.func}>
          <ButtonOption
            iconName="plus-circle"
            content="New Tracking Place"
            onPress={() => navigation.navigate('NewInquiry')}
          />
        </View>
      </View>
      <View style={{ marginTop: customSize(3) }}>
        <View style={{ flexDirection: 'row', marginTop: customSize(12) }}>
          <Pressable onPress={() => setSelected(0)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(45),
                backgroundColor: buttonColor(0),
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderWidth: 1,
              }}
            >
              <Text style={{ ...TextStyle.h4, color: textColor(0) }}>All</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(1)}>
            <View
              style={{
                ...styles.buttonGroup,
                backgroundColor: buttonColor(1),
                width: customSize(55),
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ ...TextStyle.h4, color: textColor(1) }}>Good</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(2)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(77),
                backgroundColor: buttonColor(2),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
            >
              <Text style={{ ...TextStyle.h4, color: textColor(2) }}>
                Low Risk
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(3)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(77),
                backgroundColor: buttonColor(3),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              }}
            >
              <Text style={{ ...TextStyle.h4, color: textColor(3) }}>
                High Risk
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelected(4)}>
            <View
              style={{
                ...styles.buttonGroup,
                width: customSize(77),
                backgroundColor: buttonColor(4),
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                borderWidth: 1,
              }}
            >
              <Text style={{ ...TextStyle.h4, color: textColor(4) }}>
                Epidemic
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ marginBottom: customSize(24) }}>
        {selected === 0
          ? trackingSummaryList.map((item) => (
              <TrackingSummaryCard
                key={item.id}
                status={item.status}
                navigation={navigation}
                address={item.address}
                notificationAllowed={item.notificationAllowed}
                placeName={item.placeName}
                editable={true}
              />
            ))
          : selected === 1
          ? trackingSummaryList
              .filter((item) => item.status === TrackingPlaceStatusType.GOOD)
              .map((item) => (
                <TrackingSummaryCard
                  key={item.id}
                  status={item.status}
                  navigation={navigation}
                  address={item.address}
                  notificationAllowed={item.notificationAllowed}
                  placeName={item.placeName}
                  editable={true}
                />
              ))
          : selected === 2
          ? trackingSummaryList
              .filter(
                (item) => item.status === TrackingPlaceStatusType.LOW_RISK
              )
              .map((item) => (
                <TrackingSummaryCard
                  key={item.id}
                  status={item.status}
                  navigation={navigation}
                  address={item.address}
                  notificationAllowed={item.notificationAllowed}
                  placeName={item.placeName}
                  editable={true}
                />
              ))
          : selected === 3
          ? trackingSummaryList
              .filter(
                (item) => item.status === TrackingPlaceStatusType.HIGH_RISK
              )
              .map((item) => (
                <TrackingSummaryCard
                  key={item.id}
                  status={item.status}
                  navigation={navigation}
                  address={item.address}
                  notificationAllowed={item.notificationAllowed}
                  placeName={item.placeName}
                  editable={true}
                />
              ))
          : trackingSummaryList
              .filter(
                (item) => item.status === TrackingPlaceStatusType.EPIDEMIC
              )
              .map((item) => (
                <TrackingSummaryCard
                  key={item.id}
                  status={item.status}
                  navigation={navigation}
                  address={item.address}
                  notificationAllowed={item.notificationAllowed}
                  placeName={item.placeName}
                  editable={true}
                />
              ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: '100%',
  },
  func: {
    marginVertical: customSize(12),
  },
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    height: customSize(24),
    borderColor: Color.primary_100,
  },
});

export default TrackingList;
