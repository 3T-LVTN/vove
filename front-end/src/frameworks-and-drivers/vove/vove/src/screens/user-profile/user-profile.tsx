// import React from "react";
// import {Button, StyleSheet, Text, View} from "react-native";
//
export interface UserProfileProps {
  navigation: any;
}

//
// export function UserProfile(props: UserProfileProps) {
//   return (
//     <View style={styles.center}>
//       <Text>User profile</Text>
//     </View>
//   );
// }
//
//
// // const styles = StyleSheet.create({
// //   center: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     textAlign: "center",
// //   },
// // });
//
// export default UserProfile;


import React, {useEffect, useState} from "react";
import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from "expo-image-picker"
import {ButtonType, Color, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {firebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {
  ButtonFullWidth,
  InputInformation,
  InputSwitch
} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function UserProfile(props: UserProfileProps) {
  const {navigation} = props;

  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const [userId, setId] = useState('');

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Not entered');
  // Cache.get('USER_INFO').then((res) => {
  //   setId(JSON.parse(res)._id)
  //   setName(JSON.parse(res).name);
  //   setAvatar(JSON.parse(res).image)
  //   setGender(JSON.parse(res).gender)
  //   handleDob(JSON.parse(res).dob)
  //   setCCCD(JSON.parse(res).identityNumber)
  //   setPhone(JSON.parse(res).tel)
  //   setEmail(JSON.parse(res).email ? JSON.parse(res).email : '')
  // }).catch((error) => console.log(error))

  const [newImg, setNewImg] = useState({uri: ''})

  const toggleSwitch = () => setNotificationEnabled(previousState => !previousState);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localSrc = {uri: result.assets[0].uri}
      setNewImg(localSrc)
    }
  };

  const uploadImage = async () => {
    const response = await fetch(newImg.uri)
    const blob = await response.blob()
    const filename = userId + '.png'
    var ref = firebase.storage().ref().child(filename).put(blob)
    try {
      await ref
    } catch (e) {
      console.log('Error:' + e)
    }
    await firebase.storage().ref().child(filename).getDownloadURL().then(re => {
      setAvatar(re)
      // Set Cache
      const addToCache = {image: re}
      // Cache.merge('USER_INFO', addToCache)
      // Set DTB
      const body = {
        userId: userId,
        image: re,
      }
      // POST.changeImage(body)
      Alert.alert('Ảnh đã thay đổi!')
      setNewImg({uri: ''})
    })
  }

  useEffect(() => {
    async function loadInfo() {
      const realName = await AsyncStorage.getItem('name')
      const realPhone = await AsyncStorage.getItem('phone')
      const realAddress = await AsyncStorage.getItem('address')
      setName(realName)
      setPhone('0' + realPhone?.substring(3))
      if (realAddress) setAddress(realAddress)
    }
    loadInfo()
  },);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>
      <ScrollView style={{paddingTop: 12, backgroundColor: Color.white_100,}} showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}>
        <View style={styles.center}>
          <View>
            <Pressable onPress={pickImage}>
              <Image
                style={{
                  width: 160 / 375 * ScreenSize.width,
                  height: 160 / 375 * ScreenSize.width,
                  borderRadius: 25,
                  marginBottom: 6
                }}
                source={{
                  uri: avatar,
                }}
              />

            </Pressable>
            {newImg.uri !== '' ?
              <View style={{alignSelf: 'center'}}>
                {/*<Pressable onPress={uploadImage}>*/}
                <Pressable>
                  <Text style={[TextStyle.h3, {
                    color: Color.primary_100,
                    justifyContent: 'center'
                  }]}>Update</Text>
                </Pressable>
              </View>
              : null
            }
            <View style={{paddingTop: ScreenSize.height * 0.05}}/>
          </View>
          <InputInformation title="Username" information={name}></InputInformation>
          <InputInformation title="Phone number" information={phone}></InputInformation>
          <InputInformation title="Address" information={address}></InputInformation>

          {/*Cache.rm('ACCESS_TOKEN')*/}

          <View style={{
            paddingTop: ScreenSize.height * 0.02,
            paddingBottom: ScreenSize.height * 0.01,
            flexDirection: "row",
            justifyContent: "space-between",
            width: (310 / 375) * ScreenSize.width
          }}>
            <Text style={TextStyle.h3}>Allow Notification</Text>
            <InputSwitch defaultValue={true}></InputSwitch>
          </View>
          <ButtonFullWidth content={"Update Information"} onPress={() => {
            navigation.navigate("Login")
          }} type={ButtonType.OUTLINE}/>
          <View style={{paddingTop: ScreenSize.height * 0.015}}/>
          <ButtonFullWidth content={"Log Out"} onPress={() => {
            navigation.navigate("Login")
          }} type={ButtonType.RED}/>
          <View style={{paddingTop: ScreenSize.height * 0.3}}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    width: "100%",
    height: ScreenSize.height * 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: ScreenSize.height * 0.05,
  },
  headerText: {
    fontSize: ScreenSize.width * 0.06,
    fontWeight: "600",
    color: Color.dark_100,
    alignSelf: "center",
  },
  logout: {
    marginTop: 24,
    marginBottom: 24,
  },
});

export default UserProfile;
