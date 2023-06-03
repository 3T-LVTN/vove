import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AnimatedSplash from 'react-native-animated-splash-screen';
import {
  ButtonFullWidth,
  InputPassword,
  InputText,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogin, fetchData } from '../../services';

export function Login(props: any) {
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 1000);

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const validatePhoneNumber = () => {
    return phoneNumber.length === 10
  };

  async function handleLogin() {
    try {
      const phone = '+84' + phoneNumber.substring(1)
      const res = await postLogin(phone, password)
      AsyncStorage.setItem('userToken', JSON.stringify(res.data.accessToken))
      fetchData()
      props.navigation.navigate('UserStack')
    } catch (err: any) {
        props.navigation.navigate('ActionFailed', {
          title: 'Đăng nhập thất bại',
          message: 'Thông tin đăng nhập không chính xác'
      })
    }
  }

  useEffect(() => {
    async function checkLoginStatus() {
        const isLoggedIn = await AsyncStorage.getItem('userToken')
        if (isLoggedIn) {
            fetchData()
            props.navigation.navigate('UserStack')
        }
    }
    checkLoginStatus()
  })

  return (
    <AnimatedSplash
      isLoaded={loading}
      logoImage={require('../../images/splash.png')}
      backgroundColor={'#ffffff'}
      logoHeight={ScreenSize.width * 0.7}
      logoWidth={ScreenSize.height * 0.7}
    >
      <ScrollView style={{ backgroundColor: Color.white_100 }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: ScreenSize.height * 0.15,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../images/login.png')}
              style={{
                width: ScreenSize.width * 0.67,
                height: ScreenSize.width * 0.6,
              }}
            ></Image>
          </View>
          <InputText
            title={'Phone number'}
            placeholder={'Please enter your phone number'}
            allowOutput={true}
            defaultValue={phoneNumber}
            output={setPhoneNumber}
            rightIcon={validatePhoneNumber() ? 'check-circle-outline' : ''}
            keyboardType="numeric"
          ></InputText>
          <InputPassword
            title="Password"
            allowOutput={true}

            output={setPassword}
          ></InputPassword>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: ScreenSize.height * 0.01,
              marginHorizontal: ScreenSize.width * 0.08,
              width: (327 / 375) * ScreenSize.width,
            }}
          >

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Pressable
                onPress={() => props.navigation.navigate('ForgetPasswordStack')}
              >
                <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
                  Forgot password?
                </Text>
              </Pressable>
            </View>
          </View>

          <ButtonFullWidth
            content="Log In"
            onPress={() => {
              !validatePhoneNumber() ? props.navigation.navigate('ActionFailed', {
                title: 'Đăng nhập thất bại',
                message: 'Ứng dụng chỉ hỗ trợ số điện thoại VN, xin lỗi vì sự bất tiện này'
              })
              : password == '' ? props.navigation.navigate('ActionFailed', {
                title: 'Đăng nhập thất bại',
                message: 'Bạn chưa điền mật khẩu!'
              })
              : handleLogin()
            }}
          ></ButtonFullWidth>

          <View
            style={{
              marginTop: ScreenSize.height * 0.02,
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...TextStyle.h3, color: Color.grey_100 }}>
              No account?{' '}
            </Text>
            <Pressable onPress={() => props.navigation.navigate('SignupStack')}>
              <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
                Create one!
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </AnimatedSplash>
  );
}

export default Login;
