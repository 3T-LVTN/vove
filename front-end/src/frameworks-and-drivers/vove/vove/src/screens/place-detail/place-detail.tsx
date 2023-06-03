import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
  TrackingPlaceStatusType,
} from '@front-end/shared/utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PlaceStatusLabel } from '@front-end/frameworks-and-drivers/vove/vove/src/components';

export interface PlaceDetailProps {
  navigation: any;
}

export function PlaceDetail(props: PlaceDetailProps) {
  const placeDetail = props.route.params;
  const placeStatus: string =
    placeDetail.status === TrackingPlaceStatusType.GOOD
      ? 'GOOD'
      : placeDetail.status === TrackingPlaceStatusType.LOW_RISK
      ? 'LOW RISK'
      : placeDetail.status === TrackingPlaceStatusType.HIGH_RISK
      ? 'HIGH RISK'
      : 'EPIDEMIC';
  return (
    <ScrollView
      style={{ height: ScreenSize.height, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <AnimatedCircularProgress
          rotation={-120}
          lineCap="round"
          size={ScreenSize.width * 0.6}
          width={25}
          fill={100}
          arcSweepAngle={240}
          tintColor={Color.red_100}
          backgroundColor={Color.grey_60}
          padding={5}
        />
        <Text style={TextStyle.h2}>{placeDetail.placeName}</Text>
        <Text style={TextStyle.bodyLarge}>{placeDetail.address}</Text>
        <PlaceStatusLabel status={placeDetail.status} />
        <View style={styles.containerWithBorder}>
          <Text
            style={{
              ...TextStyle.h3,
              color: Color.primary_100,
              alignSelf: 'flex-start',
            }}
          >
            How correct is this prediction?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}
          >
            <Pressable style={styles.optionExact}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>Exactly</Text>
            </Pressable>
            <Pressable style={styles.optionNormal}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>Normal</Text>
            </Pressable>
            <Pressable style={styles.optionFalse}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>False</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{ width: '100%', paddingVertical: ScreenSize.height * 0.02 }}
        >
          <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
            What should you do
          </Text>
          <View style={styles.containerWithBorder}>
            <Image source={require('../../images/advices.png')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(30),
    height: '100%',
    alignItems: 'center',
  },
  containerWithBorder: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    marginTop: 15,
  },
  optionExact: {
    backgroundColor: Color.primary_100,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
  optionNormal: {
    backgroundColor: Color.yellow_40,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
  optionFalse: {
    backgroundColor: Color.red_100,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
});

export default PlaceDetail;
