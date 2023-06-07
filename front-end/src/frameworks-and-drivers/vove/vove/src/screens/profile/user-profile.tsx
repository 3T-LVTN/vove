import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { fetchData, postUpdateProfile } from '../../services';
import { TextInput } from 'react-native-paper';

export function UserProfile({route, navigation}: any) {
  const [addressName, setAddressName] = useState('Chưa xác định');
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const [isUpdating, setUpdatingStatus] = useState(false)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(
    'https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png'
  );
  const [newImg, setNewImg] = useState(null as any);
  const [isUploadingImage, setUploadingImageStatus] = useState(false)

  async function handlePickImage() {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })
    if (!pickedImage.canceled) setNewImg(pickedImage.assets![0].uri);
  }

  async function handleUploadImage() {
    setUploadingImageStatus(true)
    const response = await fetch(newImg)
    const blob = await response.blob()
    const filename = phone + '.png'
    try {
      await firebase.storage().ref().child(filename).put(blob)
    } catch (err) {
      navigation.navigate('ActionFailed', {
        title: 'Tải lên hình ảnh thất bại',
        message: 'Đã có sự cố trong lúc tải ảnh\nHãy kiểm tra lại đường truyền của bạn'
      })
    }
    try {
      const url = await firebase.storage().ref().child(filename).getDownloadURL()
      setAvatar(url)
    } catch (err) {
      navigation.navigate('ActionFailed', {
        title: 'Tải về hình ảnh thất bại',
        message: 'Đã có sự cố trong lúc tải ảnh\nHãy kiểm tra lại đường truyền của bạn'
      })
    }
    setNewImg(null)
    setUploadingImageStatus(false)
  };

  async function handleUpdateProfile() {
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postUpdateProfile(name, avatar, JSON.parse(token!), route.params?.address, route.params?.pickedAddress)
      await fetchData()
      navigation.navigate('ActionSuccess', {
        title: 'Cập nhật thành công',
        message: 'Thông tin cá nhân của bạn đã được cập nhật'
      })
    } catch (err) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  async function handleSubmit() {
    setUpdatingStatus(!isUpdating)
    if (newImg != null) await handleUploadImage().then(() => handleUpdateProfile())
    else await handleUpdateProfile()
  }

  async function handleLogout() {
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('addressName')
    navigation.navigate('Login')
  }

  useEffect(() => {
    async function loadInfo() {
      const realName = await AsyncStorage.getItem('name')
      const realPhone = await AsyncStorage.getItem('phone')
      const realAddress = await AsyncStorage.getItem('address')
      const realAddressName = await AsyncStorage.getItem('addressName')
      const realAvatar = await AsyncStorage.getItem('avatar')

      setName(realName!)
      setPhone('0' + realPhone?.substring(3))
      if (realAddress) {
        setLocation(JSON.parse(realAddress))
        setAddressName(realAddressName!)
      }
      setAvatar(realAvatar!)
    }
    loadInfo()
  }, [])

  // Phải làm cách này do truyền function callBack cho navigate nó báo warning
  // không consistent, cách giải quyết thông thường là dùng global state như Redux
  // mà project này không có nên mới chơi trò params này
  useEffect(() => {
    if (route.params?.pickedAddress) {
      setAddressName(route.params.pickedAddress)
      setLocation(route.params.address)
    }
  }, [route.params?.pickedAddress])

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
              <Image
                style={{
                  width: (160 / 375) * ScreenSize.width,
                  height: (160 / 375) * ScreenSize.width,
                  borderRadius: 25,
                  marginBottom: 6,
                }}
                source={{
                  uri: newImg ? newImg : avatar,
                }}
              />

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
              name='map'
              onPress={() => navigation.navigate('MapPick', 
              { originalScene: 'Profile', lat: location.lat, lng: location.lng }
              )}/>}
            />
            : <InputInformation
            title="Địa chỉ"
            information={addressName}
            />
          }
          

          { isUploadingImage
            ? 
            <View style={{ paddingTop: ScreenSize.height * 0.1395 }}>
              <ActivityIndicator size={'small'} color='black' />
            </View>
            : isUpdating ?
            <View style={{ paddingTop: ScreenSize.height * 0.1395 }}>
              <ButtonFullWidth
            content={'Hoàn tất'}
            onPress={() => handleSubmit()}
            type={ButtonType.DEFAULT}
            />
            </View>
            :
            <>
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

