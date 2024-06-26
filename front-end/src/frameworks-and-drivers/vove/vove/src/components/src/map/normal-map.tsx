import React, { useEffect, useRef, useState } from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import HeatMap from './heat-map';
import { Color, ScreenSize } from '@front-end/shared/utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../../../config'
import {getLocationLatLng, getLocationName} from '../../../services';

export const normalMap = (props: any) => {
  const [region, setRegion] = useState({
    latitude: props.lat != null ? props.lat : 10.7644912,
    longitude: props.lng != null ? props.lng : 106.702996,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const mapRef = useRef<any>(null)
  const [isSearching, setSearchingStatus] = useState(false)
  const [name, setName] = useState('')



  async function handleSearchLocation(placeId: string) {
    const res = await getLocationLatLng(placeId, MAP_API_KEY)
    if (mapRef.current) mapRef.current.animateToRegion({
      latitude: res.data.result.geometry.location.lat,
      longitude: res.data.result.geometry.location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
    if (res.data.result){
      var newName = await getLocationName(res.data.result.geometry.location.lat, res.data.result.geometry.location.lng)
      if (newName) {
      props.handleSearch(newName.data.display_name, res.data.result.geometry.location.lat, res.data.result.geometry.location.lng);
    }}
  }


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
        <HeatMap></HeatMap>
      </MapView>

      <View style={styles.searchBar}>
              <View style={{ width: "100%" }}>
                <GooglePlacesAutocomplete
                placeholder='Tìm địa chỉ'
                debounce={400}
                onPress={item =>  handleSearchLocation(item.place_id)}
                enablePoweredByContainer={false}
                query={{
                  key: MAP_API_KEY,
                  language: 'vn',
                }}
                textInputProps={{
                  onFocus: () => setSearchingStatus(true),
                  onEndEditing: () => setSearchingStatus(false),
                  placeholderTextColor: 'grey'
                }}
                styles={{
                  textInput: {
                    borderRadius: ScreenSize.width * 0.02,
                    borderColor: Color.grey_100,
                    borderWidth: 1
                  },
                  row: {
                    borderRadius: ScreenSize.width * 0.02,
                    borderColor: Color.grey_100,
                    borderWidth: 1
                  }
                }}
                />
              </View>

            </View>
      {!isSearching
        ? <View style={{ position: 'absolute' }}>
          <Image
            source={require('../../../images/marker.png')}
            style={{
              width: ScreenSize.width * 0.2,
              height: ScreenSize.width * 0.2,
            }}
          />
        </View>
        : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '95%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    top: ScreenSize.height * 0.06,
    width: ScreenSize.width * 0.75,
    alignItems: 'center',
    position: 'absolute',
    marginTop: -ScreenSize.height * 0.04
  }
});

export default normalMap;
