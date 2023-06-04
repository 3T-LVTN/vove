import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  ButtonType,
  Color,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { firebase } from '@front-end/frameworks-and-drivers/firebase-auth';
import {
  ButtonFullWidth,
  InputInformation,
  InputSwitch,
  InputText,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, getLocationName, postUpdateProfile } from '../../services';
import { TextInput } from 'react-native-paper';

export function UserProfile({route, navigation}: any) {
  const [addressName, setAddressName] = useState('Chưa xác định');
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const [isUpdating, setUpdatingStatus] = useState(false)

  const [userId, setId] = useState('');

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(
    'https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png'
  );
  const [phone, setPhone] = useState('');
  

  const [newImg, setNewImg] = useState({ uri: '' });

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localSrc = { uri: result.assets[0].uri };
      setNewImg(localSrc);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(newImg.uri);
    const blob = await response.blob();
    const filename = userId + '.png';
    var ref = firebase.storage().ref().child(filename).put(blob);
    try {
      await ref;
    } catch (e) {
      console.log('Error:' + e);
    }
    await firebase
      .storage()
      .ref()
      .child(filename)
      .getDownloadURL()
      .then((re) => {
        setAvatar(re);
        // Set Cache
        const addToCache = { image: re };
        // Cache.merge('USER_INFO', addToCache)
        // Set DTB
        const body = {
          userId: userId,
          image: re,
        };
        // POST.changeImage(body)
        Alert.alert('Ảnh đã thay đổi!');
        setNewImg({ uri: '' });
      });
  };

  async function handleSubmit() {
    setUpdatingStatus(!isUpdating)
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postUpdateProfile(name, avatar, JSON.parse(token!), route.params?.address.lat, route.params?.address.lng)
      await fetchData()
    } catch (err) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  async function handleLogout() {
    AsyncStorage.removeItem('userToken')
    navigation.navigate('Login')
  }

  useEffect(() => {
    async function loadInfo() {
      const realName = await AsyncStorage.getItem('name')
      const realPhone = await AsyncStorage.getItem('phone')
      const realAddress = await AsyncStorage.getItem('address')

      setName(realName!)
      setPhone('0' + realPhone?.substring(3))
      if (realAddress) {
        const lat = JSON.parse(realAddress).lat
        const lng = JSON.parse(realAddress).lng
        setLocation({ lat: lat, lng: lng })
        const res = await getLocationName(lat, lng)
        setAddressName(res.data.display_name)
      }
    }
    loadInfo();
  }, []);

  // Phải làm cách này do truyền function callBack cho navigate nó báo warning
  // không consistent, cách giải quyết thông thường là dùng global state như Redux
  // mà project này không có nên mới chơi trò params này
  useEffect(() => {
    if (route.params?.pickedAddress) {
      setAddressName(route.params.pickedAddress)
      setLocation(route.params.address)
    }
  }, [route.params?.pickedAddress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin cá nhân</Text>
      </View>
      <ScrollView
        style={{ paddingTop: 12, backgroundColor: Color.white_100 }}
      >
        <View style={styles.center}>
          <View>
            <Pressable>
              <Image
                style={{
                  width: (160 / 375) * ScreenSize.width,
                  height: (160 / 375) * ScreenSize.width,
                  borderRadius: 25,
                  marginBottom: 6,
                }}
                source={{
                  uri: avatar,
                }}
              />
            </Pressable>

            {
              isUpdating
              ? <View style={{ alignSelf: 'center' }}>
                  <Pressable onPress={handlePickImage}>
                    <Text style={[ TextStyle.h3, { color: Color.primary_100, justifyContent: 'center' }]}>
                      Chọn ảnh
                    </Text>
                  </Pressable>
              </View>
              : null
            }
            <View style={{ paddingTop: isUpdating ? ScreenSize.height * 0.025 : ScreenSize.height * 0.05 }} />
          </View>

          { isUpdating
            ? <InputText
            title={'Tên'}
            placeholder={'Vui lòng nhập tên hiển thị mới'}
            text={name}
            output={setName}
            />
            : <InputInformation
            title="Tên"
            information={name}
            />
          }

          <InputInformation
            title="Số điện thoại"
            information={phone}
          ></InputInformation>

          { isUpdating
            ? <TextInput
            multiline={true}
            label={
              <Text style={{ ...TextStyle.bodyLarge, color: Color.dark_100 }}>
                Địa chỉ
              </Text>
            }
            value={addressName}
            underlineColor={Color.white_100}
            editable={false}
            style={{
              ...TextStyle.h3,
              width: (327 / 375) * ScreenSize.width,
              backgroundColor: Color.white_100,
            }}
            right={<TextInput.Icon 
              name={'map'} 
              onPress={() => navigation.navigate('MapPick', 
              { originalScene: 'Profile', lat: location.lat, lng: location.lng }
              )}/>}
            />
            : <InputInformation
            title="Địa chỉ"
            information={addressName}
            />
          }
          

          { isUpdating
            ? <ButtonFullWidth
            content={'Hoàn tất'}
            onPress={() => handleSubmit()}
            type={ButtonType.DEFAULT}
            />
            : <>
                <View
                style={{
                  paddingTop: ScreenSize.height * 0.02,
                  paddingBottom: ScreenSize.height * 0.01,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: (310 / 375) * ScreenSize.width,
                }}
                >
                  <Text style={TextStyle.h3}>Nhận thông báo</Text>
                  <InputSwitch defaultValue={true}></InputSwitch>
                </View>

                <ButtonFullWidth
                  content={'Cập nhật thông tin'}
                  onPress={() => setUpdatingStatus(!isUpdating)}
                  type={ButtonType.OUTLINE}
                />
                <View style={{ paddingTop: ScreenSize.height * 0.015 }} />
                <ButtonFullWidth
                  content={'Đăng xuất'}
                  onPress={() => handleLogout()}
                  type={ButtonType.RED}
                />
                <View style={{ paddingTop: ScreenSize.height * 0.015 }} />
              </>
          }
          
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    width: '100%',
    height: ScreenSize.height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ScreenSize.height * 0.05,
  },
  headerText: {
    fontSize: ScreenSize.width * 0.06,
    fontWeight: '600',
    color: Color.dark_100,
    alignSelf: 'center',
  },
  logout: {
    marginTop: 24,
    marginBottom: 24,
  },
})

