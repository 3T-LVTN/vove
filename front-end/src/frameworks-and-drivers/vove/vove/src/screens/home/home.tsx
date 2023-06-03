import React, { useEffect } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import {
  ButtonFullWidth,
  VoveSearchBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import NormalMap from '../../components/src/map/normal-map';
import { fetchData } from '../../services/profile';

export interface HomeProps {
  navigation: any;
}

export function Home(props: HomeProps) {
  // useEffect(() => {
  //   fetchData();
  // });

  return (
    <ScrollView style={{ backgroundColor: Color.white_100 }}>
      <View style={styles.container}>
        <View
          style={{ alignItems: 'flex-start', width: ScreenSize.width * 0.9 }}
        >
          <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
            HCMC Mosquito Distribution
          </Text>
        </View>

        {/*TODO: remove shadow in search bar*/}
        <View style={styles.placeContainer}>
          <VoveSearchBar placeholder={'Search place'}></VoveSearchBar>
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
            HCMC Overview
          </Text>
        </View>
        <View style={styles.hcmcSummaryContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
              Normal
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.primary_20 }}>
              19
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
              Low risk
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.yellow_20 }}>
              1
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
              High risk
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.orange_20 }}>
              1
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              Epidemic
            </Text>
            <Text style={{ ...TextStyle.bodyLarge, color: Color.red_100 }}>
              1
            </Text>
          </View>
        </View>
        <View style={{ height: ScreenSize.width * 0.03 }}></View>
        <ButtonFullWidth
          content="My Tracking List"
          onPress={() => props.navigation.navigate('TrackingSummary')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
