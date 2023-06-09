import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ButtonType, Color, ScreenSize, TextStyle, customSize } from '@front-end/shared/utils';
import {
  ButtonFullWidth, ButtonHalfWidth,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import NormalMap from '../../components/src/map/normal-map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, getGetDistrictSummary, postGetPredictionSummary } from '../../services';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export function Home(props: any) {
  const [addressName, setAddressName] = useState('')
  const [searchAddress, setSearchAddress] = useState(false)
  const [homeStatus, setHomeStatus] = useState(0)
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const [mapVisible, setMapVisible] = useState(false)
  const [summaryList, setSummaryList] = useState<number[]>([9,6,4,3])

  async function handleGetHomeStatus() {
    const homeLocation = {
      lat: location.lat,
      lng: location.lng,
      locationCode: location.lat + '-' + location.lng,
      idx: 0
    }
    const list = [] as any
    list.push(homeLocation)
    const res = await postGetPredictionSummary(list)
    const rate = res.data.data[0].rate
    rate == "SAFE" ? setHomeStatus(0)
    : rate == "NORMAL" ? setHomeStatus(1)
    : rate == "LOW_RISK" ? setHomeStatus(2)
    : setHomeStatus(3)
  }

  async function handleRefresh(selfPress: boolean) {
    if (selfPress) await fetchData()

    const realAddress = await AsyncStorage.getItem('address')
    const realAddressName = await AsyncStorage.getItem('addressName')

    if (realAddress) {
      setLocation(JSON.parse(realAddress))
      setAddressName(realAddressName!)
    }
    setMapVisible(false)
  }

  async function handleSearchLocation(placeId: string){
    setAddressName(placeId);
    setSearchAddress(true);
  }
  async function handleGetHCMCSummary() {
    try {
      const realSummary = await getGetDistrictSummary()
      if (realSummary.data.length !== 0) setSummaryList(realSummary.data)
    } catch (err) {
      Alert.alert('Không lấy được thông tin thống kê mới');
    }
  }

  useEffect(() => {
    handleRefresh(false)
    //handleGetHCMCSummary()
  }, []);

  useEffect(() => {
    if (location.lat) {
      handleGetHomeStatus()
    }
  }, [location])

  useEffect(() => {
    setMapVisible(true)
  }, [mapVisible])

  return (
    <View style={styles.screen}>
       <View style={{ paddingTop: ScreenSize.height * 0.02 }}>
       <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
          Dự đoán phân bố muỗi TP.HCM
       </Text>
       </View>
        <View style={styles.placeContainer}>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              justifyContent: 'space-between',
              paddingTop: ScreenSize.height * 0.01,
              paddingHorizontal: ScreenSize.width * 0.005
            }}
          >
            <View
              style={{
                height: ScreenSize.width * 0.22,
                backgroundColor: Color.primary_60,
                width: '83%',
                borderRadius: 10,
                paddingHorizontal: ScreenSize.width * 0.025,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...TextStyle.bodySmall, color: 'white' }}>
                {addressName == '' ? 'Bạn chưa có địa chỉ. Hãy chọn địa chỉ ở trang cá nhân'
                : addressName}
              </Text>
            </View>

            <Pressable
              style={{
                height: ScreenSize.width * 0.22,
                backgroundColor: Color.primary_100,
                width: '15%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                location ?
                  !searchAddress ?
                    props.navigation.navigate('PlaceDetail',
                  { title: 'Nhà của tôi', placeName: addressName,
                    address: location, status: homeStatus })
                    : props.navigation.navigate('PlaceDetail',
                      { title: 'Kết quả dự đoán', placeName: addressName,
                        address: location, status: homeStatus })
                : props.navigation.navigate('UserProfile')
              }}
            >
              <MaterialCommunityIcons name={"menu-right"} size={(50 / 375) * ScreenSize.width} color={Color.light_80}/>
            </Pressable>
          </View>

          <View style={styles.mapContainer}>
            { mapVisible ?
            <NormalMap lat={location.lat} lng={location.lng} handleSearch={handleSearchLocation}></NormalMap> :
            <ActivityIndicator size={'small'} color='black' />
            }
          </View>
        </View>

        <ScrollView>
        {/*<View*/}
        {/*  style={{ alignItems: 'flex-start', width: ScreenSize.width * 0.9 }}*/}
        {/*>*/}
        {/*  <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>*/}
        {/*    Tổng quan tình hình TP.HCM*/}
        {/*  </Text>*/}
        {/*</View>*/}

        <View style={styles.hcmcSummaryContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
              Tốt
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
            {summaryList[0]} quận huyện
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
              Thấp
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
            {summaryList[1]} quận huyện
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
              Vừa
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
            {summaryList[2]} quận huyện
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              Cao
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              {summaryList[3]} quận huyện
            </Text>
          </View>
        </View>
        <View style={{ height: ScreenSize.width * 0.03 }}></View>

        <ButtonFullWidth
          type={ButtonType.DEFAULT}
          content='Danh sách vị trí theo dõi'
          onPress={() => props.navigation.navigate('TrackingList', { homeStatus: homeStatus })}
        />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: '100%',
  },
  placeContainer: {
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1.2,
    marginVertical: (8 / 812) * ScreenSize.height,
    alignItems: 'center',
    alignSelf: 'center',
  },
  mapContainer: {
    width: ScreenSize.width * 0.86,
    height: ScreenSize.width * 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  hcmcSummaryContainer: {
    marginVertical: (8 / 812) * ScreenSize.height,
    paddingVertical: (8 / 812) * ScreenSize.height,
    paddingHorizontal: (8 / 812) * ScreenSize.height,
    alignSelf: 'center',
    width: ScreenSize.width * 0.85,
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1.2,
  },
});

export default Home;
