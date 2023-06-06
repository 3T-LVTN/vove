import React, { useEffect, useState } from 'react';
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
import { ButtonFullWidth, TrackingSummaryCard } from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { ButtonRow } from '../../components/src/buttons/button-row';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, getLocationName } from '../../services';

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

export function TrackingList(props: any) {
  const { navigation } = props;
  const [selected, setSelected] = useState(0);
  const [addressName, setAddressName] = useState('');
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })

  async function handleRefresh() {
    await fetchData()
    const realAddress = await AsyncStorage.getItem('address')
      if (realAddress) {
        const lat = JSON.parse(realAddress).lat
        const lng = JSON.parse(realAddress).lng
        setLocation({ lat: lat, lng: lng })
        const res = await getLocationName(lat, lng)
        setAddressName(res.data.display_name)
    }
  }

  useEffect(() => {
    handleRefresh()
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            ...TextStyle.h3,
            color: Color.primary_100,
            alignSelf: 'flex-start',
          }}
        >
          Nhà của tôi
        </Text>

        {
          addressName == '' ? 
          <TrackingSummaryCard
            status={TrackingPlaceStatusType.LOW_RISK}
            navigation={navigation}
            placeName='Bạn chưa có địa chỉ. Hãy chọn địa chỉ ở trang cá nhân'
            title="Nhà của tôi"
            readonly={true}
          /> :
          <TrackingSummaryCard
            status={TrackingPlaceStatusType.GOOD}
            navigation={navigation}
            placeName={addressName}
            title="Nhà của tôi"
            readonly={true}
            lat={location.lat!}
            lng={location.lng!}
          />
        }
        <View style={{ paddingTop: ScreenSize.height * 0.01 }}/>
        <Text
          style={{
            ...TextStyle.h3,
            color: Color.primary_100,
            alignSelf: 'flex-start',
          }}
        >
          Địa điểm khác
        </Text>
        </View>
      <View style={{ marginTop: customSize(10) }}>
        <ButtonRow list={[
          { name: "Tất cả", width: 70 },
          { name: "Tốt", width: 60 },
          { name: "Thấp", width: 65 },
          { name: "Vừa", width: 65 },
          { name: "Cao", width: 65 }
        ]} callBack={setSelected}/>
      </View>

      <ScrollView style={{ marginBottom: customSize(24) }}>
        {selected === 0
          ? trackingSummaryList.map((item) => (
              <TrackingSummaryCard
                key={item.id}
                status={item.status}
                navigation={navigation}
                title={item.placeName}
                placeName={item.address}
                lat={10}
                lng={10}
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
                title={item.placeName}
                placeName={item.address}
                lat={10}
                lng={10}
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
                title={item.placeName}
                placeName={item.address}
                lat={10}
                lng={10}
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
                title={item.placeName}
                placeName={item.address}
                lat={10}
                lng={10}
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
                title={item.placeName}
                placeName={item.address}
                lat={10}
                lng={10}
                />
              ))}

          <ButtonOption
            iconName="plus-circle"
            content="Thêm địa điểm"
            onPress={() => console.log('new')}
          />
      </ScrollView>
      <View style={styles.func}>

                  <ButtonFullWidth
          content="Tải lại"
          onPress={() => handleRefresh()}
        ></ButtonFullWidth>
        </View>


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
    paddingBottom: ScreenSize.height * 0.04,
  },
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    height: customSize(24),
    borderColor: Color.primary_100,
  },
});

export default TrackingList;
