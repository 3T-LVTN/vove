import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
  TrackingPlaceStatusType,
} from '@front-end/shared/utils';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ButtonIcon } from '../buttons/button-icon';

export interface TrackingPlaceStatusProps {
  readonly placeName: string;
  readonly title: string;
  readonly status: TrackingPlaceStatusType;
  readonly lat?: number;
  readonly lng?: number;
  readonly navigation: any;
  readonly readonly?: boolean;
}

export const TrackingSummaryCard = (props: TrackingPlaceStatusProps) => {
  return (
    <Pressable
      onPress={() => {
        props.lat ? props.navigation.navigate('PlaceDetail', { title: props.title, placeName: props.placeName, lat: props.lat, lng: props.lng, status: props.status})
        : props.navigation.navigate('UserProfile')
      }}
      style={{ width: '100%' }}
    >
      <View
        style={{
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={
            props.status === TrackingPlaceStatusType.GOOD
              ? styles.statusCircleGood
              : props.status === TrackingPlaceStatusType.LOW_RISK
              ? styles.statusCircleLowRisk
              : props.status === TrackingPlaceStatusType.HIGH_RISK
              ? styles.statusCircleHighRisk
              : styles.statusCircleEpidemic
          }
        ></View>
        <View style={{ width: '60%', paddingLeft: 8 }}>
          <Text style={{ ...TextStyle.h3, color: Color.dark_80 }}>
            {props.title}
          </Text>
          <Text style={{ ...TextStyle.bodySmall, color: Color.dark_80 }}>
            {props.placeName}
          </Text>
        </View>
        <View style={{ height: customSize(14) }} />
        <View
          style={{
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {props.readonly ? null : <><ButtonIcon
          onPress={() => console.log('')}
          iconName={'cog-outline'}
          customSize={0.7}
          />
           <View style={{ paddingTop: ScreenSize.height * 0.01 }} />
          <ButtonIcon
          onPress={() => console.log('')}
          iconName={'delete'}
          customSize={0.7}
          /></>
          }
          
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    height: (90 / 375) * ScreenSize.width,
    backgroundColor: Color.white_100,
    borderWidth: 1,
    borderColor: Color.dark_40,
    marginTop: (12 / 375) * ScreenSize.width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // elevation: 5,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusCircleGood: {
    backgroundColor: Color.primary_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleHighRisk: {
    backgroundColor: Color.orange_20,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleLowRisk: {
    backgroundColor: Color.yellow_40,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
  statusCircleEpidemic: {
    backgroundColor: Color.red_100,
    borderRadius: 20,
    height: (40 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
  },
});
