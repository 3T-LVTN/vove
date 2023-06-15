import { ButtonType, Color, ScreenSize } from '@front-end/shared/utils';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ButtonFullWidth } from '../../components/src';
import { getLocationLatLng, getLocationName } from '../../services';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../../config';

export const MapPick = ({route, navigation}: any) => {
  const { originalScene } = route.params
  const [region, setRegion] = useState({
    latitude: route.params.lat ? route.params.lat : 10.7644912,
    longitude: route.params.lng ? route.params.lng : 106.702996,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const [name, setName] = useState('')
  const [isGettingName, setGettingNameStatus] = useState(false)
  const [isSearching, setSearchingStatus] = useState(false)
  const mapRef = useRef<any>(null)

  function handleSubmit() {
    if (!isGettingName)
        if (originalScene === 'Profile')
            navigation.navigate('UserProfile',
            {
                pickedAddress: name,
                address: {
                    lat: region.latitude,
                    lng: region.longitude
                }
            })
        else {
          navigation.navigate('TrackingList',
            {
                pickedAddress: name,
                address: {
                    lat: region.latitude,
                    lng: region.longitude
                }
            })
          // navigation.navigate('ActionSuccess', {
          //   title: 'Thêm địa điểm thành công',
          //   message: ''
          // })
        }
  }

  async function handleUpdateLatLng(region: any) {
    setRegion(region)
    setGettingNameStatus(true)
  }

  async function handleLocationName(lat: number, lng: number) {
    const res = await getLocationName(lat, lng)
    setName(res.data.display_name)
    setGettingNameStatus(false)
  }

  async function handleSearchLocation(placeId: string) {
    const res = await getLocationLatLng(placeId, MAP_API_KEY)
    handleUpdateLatLng({
      latitude: res.data.result.geometry.location.lat,
      longitude: res.data.result.geometry.location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
    handleLocationName(res.data.result.geometry.location.lat, res.data.result.geometry.location.lng)
    if (mapRef.current) mapRef.current.animateToRegion({
      latitude: res.data.result.geometry.location.lat,
      longitude: res.data.result.geometry.location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
  }

  return (
    <View style={styles.container}>
        <View style={styles.mapView}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                onRegionChange={(region) => handleUpdateLatLng(region)}
                onRegionChangeComplete={() => handleLocationName(region.latitude, region.longitude)}
            >
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

           { !isSearching
              ? <View style={{ position: 'absolute' }}>
              <Image
                source={require('../../images/marker.png')}
                style={{
                  width: ScreenSize.width * 0.2,
                  height: ScreenSize.width * 0.2,
                }}
              />
            </View>
            : null
           }

        </View>


      <View style={{ paddingTop: ScreenSize.height * 0.02, alignItems: 'center' }}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.locationText}>{region.latitude} - {region.longitude}</Text>
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
    fontSize: ScreenSize.width * 0.03,
    fontWeight: '600',
    color: Color.grey_100,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: ScreenSize.width * 0.03,
    fontWeight: '600',
    color: Color.dark_100,
    textAlign: 'center',
  },
  searchBar: {
    top: ScreenSize.height * 0.06,
    width: ScreenSize.width * 0.8,
    alignItems: 'center',
    position: 'absolute'
  }
});
