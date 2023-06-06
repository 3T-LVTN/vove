import React, { useEffect } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Color, ScreenSize, TextStyle, customSize } from '@front-end/shared/utils';
import {
  ButtonFullWidth,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import NormalMap from '../../components/src/map/normal-map';

export interface HomeProps {
  navigation: any;
}

export function Home(props: HomeProps) {

  return (
    <View style={styles.screen}>
       <View style={{ paddingTop: ScreenSize.height * 0.04 }}>
       <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
          Dự đoán phân bố muỗi TP.HCM
        </Text>
       </View>
    <ScrollView style={{ backgroundColor: Color.white_100 }}>
      <View style={styles.container}>
        {/*TODO: remove shadow in search bar*/}
        <View style={styles.placeContainer}>
          {/* //<VoveSearchBar placeholder={'Search place'}></VoveSearchBar> */}
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: ScreenSize.width * 0.17,
                backgroundColor: Color.light_40,
                width: '78%',
                borderRadius: 10,
                paddingHorizontal: ScreenSize.width * 0.025,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...TextStyle.bodyLarge, color: 'white' }}>
                WeWork E. Town Central
              </Text>
              <Text style={{ ...TextStyle.bodySmall, color: 'white' }}>
                11 Đoàn Văn Bơ, Phường 12, Quận 4
              </Text>
            </View>
            <Pressable
              style={{
                height: ScreenSize.width * 0.17,
                backgroundColor: Color.primary_100,
                width: '20%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                props.navigation.navigate('PlaceDetail');
              }}
            >
              <Text style={{ ...TextStyle.h4, color: 'white' }}>Detail</Text>
            </Pressable>
          </View>

          <View style={styles.mapContainer}>
            <NormalMap></NormalMap>
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
      </View>
    </ScrollView>

        <View style={{ paddingBottom: ScreenSize.height * 0.04 }}>
        <ButtonFullWidth
            content="Danh sách theo dõi"
            onPress={() => props.navigation.navigate('TrackingList')}
          />
        </View>
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
  container: {
    flex: 1,
    backgroundColor: Color.white_100,
    alignItems: 'center',
    paddingVertical: ScreenSize.height * 0.03,
  },
  placeContainer: {
    width: ScreenSize.width * 0.9,
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1.2,
    marginVertical: (8 / 812) * ScreenSize.height,
    alignItems: 'center',
  },
  mapContainer: {
    width: ScreenSize.width * 0.9,
    height: ScreenSize.width * 0.9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hcmcSummaryContainer: {
    marginVertical: (8 / 812) * ScreenSize.height,
    paddingVertical: (8 / 812) * ScreenSize.height,
    paddingHorizontal: (8 / 812) * ScreenSize.height,
    width: ScreenSize.width * 0.9,
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1.2,
  },
});

export default Home;
