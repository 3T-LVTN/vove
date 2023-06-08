import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { ButtonOption } from '../../components/src/buttons/button-option';
import { ButtonFullWidth, TrackingSummaryCard } from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { ButtonRow } from '../../components/src/buttons/button-row';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, postCreateTrackingplace, postGetPredictionSummary } from '../../services';

export function TrackingList({route, navigation}: any) {
  const [homeStatus, setHomeStatus] = useState(route.params.homeStatus)
  const [selected, setSelected] = useState(0);
  const [addressName, setAddressName] = useState('');
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const [trackingList, setTrackingList] = useState<any[]>([])
  const [rateList, setRateList] = useState<number[]>([])
  const [finishedGetRate, setGetRateStatus] = useState(false)

  async function handleAddPlace() {
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postCreateTrackingplace('Vị trí mới', route.params.address, route.params.pickedAddress, JSON.parse(token!))
      handleRefresh(true)
    } catch (err: any) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  async function handleRefresh(selfPress: boolean) {
    if (selfPress) await fetchData()
    const realAddress = await AsyncStorage.getItem('address')
    const realAddressName = await AsyncStorage.getItem('addressName')

    if (realAddress) {
      setLocation(JSON.parse(realAddress))
      setAddressName(realAddressName!)
    }

    const trackingPlaces = await AsyncStorage.getItem('trackingPlaces')
    const parsedData = JSON.parse(trackingPlaces!)
    setTrackingList(parsedData)
  }

  async function handleGetRate() {
    const requestList = trackingList.map((item, index) => ({ 
      lat: item.address.lat,
      lng: item.address.lng,
      locationCode: item.address.lat + '-' + item.address.lng,
      idx: index
    })) as [{
      lat: number,
      lng: number,
      locationCode: string,
      idx: number
    }]
    const res = await postGetPredictionSummary(requestList)
    const responseList = res.data.data
    
    if (responseList.length !== 0) {
      const list = [] as any
      responseList.map((item: any) => list.push(
        item.rate == 'SAFE' ? 0 : item.rate == 'NORMAL' ? 1
        : item.rate == 'LOW_RISK' ? 2 : 3))
      setRateList(list)
    }
  }

  useEffect(() => {
    handleRefresh(false)
  }, []);

  useEffect(() => {
    if (rateList.length !== 0 && !finishedGetRate) setGetRateStatus(true)
  }, [rateList])

  useEffect(() => {
    if (trackingList.length !== 0) {
      setGetRateStatus(false)
      handleGetRate()
      console.log('update tracking list')
    }
  }, [trackingList])

  useEffect(() => {
    if (route.params?.pickedAddress) handleAddPlace()
  }, [route.params?.pickedAddress]);

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
            status={homeStatus}
            navigation={navigation}
            placeName='Bạn chưa có địa chỉ. Hãy chọn địa chỉ ở trang cá nhân'
            title="Nhà của tôi"
            readonly={true}
          /> :
          <TrackingSummaryCard
            status={homeStatus}
            navigation={navigation}
            placeName={addressName}
            title="Nhà của tôi"
            readonly={true}
            address={location as any}
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
      {/* <View style={{ marginTop: customSize(10) }}>
        <ButtonRow list={[
          { name: "Tất cả", width: 70 },
          { name: "Tốt", width: 60 },
          { name: "Thấp", width: 65 },
          { name: "Vừa", width: 65 },
          { name: "Cao", width: 65 }
        ]} callBack={setSelected}/>
      </View> */}

      <ScrollView style={{ marginBottom: customSize(24) }}>
        {
          finishedGetRate ?
          trackingList
          .filter((item) => selected != 0 ? item.status == selected - 1 : item )
          .map((item, index) => (
          <TrackingSummaryCard
            key={index}
            id={item.id}
            status={rateList[index]}
            navigation={navigation}
            title={item.title}
            placeName={item.addressName}
            address={item.address}
            handleRefresh={handleRefresh}
          />
          )) : <View style={{ paddingTop: ScreenSize.height * 0.1395 }}>
          <ActivityIndicator size={'small'} color='black' />
        </View>
        }
        { finishedGetRate ? 
        <>
        <View style={{ paddingTop: ScreenSize.height * 0.03 }}/>
        <ButtonOption
        iconName="plus-circle"
        content="Thêm địa điểm"
        onPress={() => navigation.navigate('MapPick', 
        { originalScene: 'TrackingList', lat: location.lat, lng: location.lng }
        )}
      /></> : null}
      </ScrollView>

      <View style={styles.func}>
        <ButtonFullWidth
          content="Tải lại"
          onPress={() => handleRefresh(true)}
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
  }
});

export default TrackingList;
