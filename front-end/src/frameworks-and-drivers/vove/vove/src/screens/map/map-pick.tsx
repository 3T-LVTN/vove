import { ButtonType, Color, ScreenSize } from '@front-end/shared/utils';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ButtonFullWidth } from '../../components/src';

export const MapPick = ({route, navigation}: any) => {
  //const { title, message } = route.params
  const [lat, setLat] = useState(10.7644912)
  const [lng, setLng] = useState(106.702996)
  const [name, setName] = useState('WeWork')

  function handleSubmit() {
    console.log('ok')
  }

  return (
    <View style={styles.container}>
        <View style={styles.mapView}>
            <MapView
            provider={PROVIDER_GOOGLE} 
            style={styles.map}
            region={{
            latitude: 10.7644912,
            longitude: 106.702996,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            }}
            />
        </View>
      

      <View style={{ paddingTop: ScreenSize.height * 0.02, alignItems: 'center' }}>
        <Text style={styles.locationText}>{lat} - {lng}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <View style={{ paddingTop: ScreenSize.height * 0.03 }}/>
        <ButtonFullWidth
          type={ButtonType.DEFAULT}
          content="Xác nhận"
          onPress={() => handleSubmit()}
        ></ButtonFullWidth>
        <View style={{ paddingTop: ScreenSize.height * 0.01 }}/>
        <ButtonFullWidth
          type={ButtonType.RED}
          content="Quay lại"
          onPress={() => navigation.goBack()}
        ></ButtonFullWidth>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationText: {
    fontSize: ScreenSize.width * 0.05,
    fontWeight: '600',
    color: Color.dark_100,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: ScreenSize.width * 0.03,
    fontWeight: '500',
    color: Color.grey_100,
    alignSelf: 'center',
  },
});
