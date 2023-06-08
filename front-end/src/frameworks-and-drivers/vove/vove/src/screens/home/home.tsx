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
import { ButtonHalfWidth,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import NormalMap from '../../components/src/map/normal-map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, postGetPredictionSummary } from '../../services';

export function Home(props: any) {
  const [addressName, setAddressName] = useState('')
  const [homeStatus, setHomeStatus] = useState(0)
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const [mapVisible, setMapVisible] = useState(false)

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

  useEffect(() => {
    handleRefresh(false)
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
    <ScrollView style={styles.screen}>
       <View style={{ paddingTop: ScreenSize.height * 0.04 }}>
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
                height: ScreenSize.width * 0.19,
                backgroundColor: Color.light_40,
                width: '78%',
                borderRadius: 10,
                paddingHorizontal: ScreenSize.width * 0.025,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...TextStyle.bodyLarge, color: 'white' }}>
                Nhà của tôi
              </Text>
              <Text style={{ ...TextStyle.bodySmall, color: 'white' }}>
                {addressName == '' ? 'Bạn chưa có địa chỉ. Hãy chọn địa chỉ ở trang cá nhân'
                : addressName}
              </Text>
            </View>

            <Pressable
              style={{
                height: ScreenSize.width * 0.19,
                backgroundColor: Color.primary_100,
                width: '20%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                location ? props.navigation.navigate('PlaceDetail', 
                { title: 'Nhà của tôi', placeName: addressName, 
                  address: location, status: homeStatus })
                : props.navigation.navigate('UserProfile')
              }}
            >
              <Text style={{ ...TextStyle.h4, color: 'white' }}>Chi tiết</Text>
            </Pressable>
          </View>

          <View style={styles.mapContainer}>
            { mapVisible ?
            <NormalMap lat={location.lat} lng={location.lng}></NormalMap> : 
            <ActivityIndicator size={'small'} color='black' />
            }
          </View>
        </View>
        
        <View
          style={{ alignItems: 'flex-start', width: ScreenSize.width * 0.9 }}
        >
          <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
            Tổng quan
          </Text>
        </View>
        
        <View style={styles.hcmcSummaryContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
              Tốt
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
              19
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
              Thấp
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
              1
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
              Vừa
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
              1
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              Cao
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              1
            </Text>
          </View>
        </View>
        <View style={{ height: ScreenSize.width * 0.03 }}></View>

    <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: ScreenSize.height * 0.04,
        }}
      >
        <ButtonHalfWidth
          type={ButtonType.DEFAULT}
          content='Tải lại'
          onPress={() => {
            handleRefresh(true);
          }}
        />
        <ButtonHalfWidth
          type={ButtonType.DEFAULT}
          content='Danh sách theo dõi'
          onPress={() => props.navigation.navigate('TrackingList', { homeStatus: homeStatus })}
        />
      </View>
    </ScrollView>
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
    height: ScreenSize.width * 0.9,
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
