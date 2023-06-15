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
import { postLogin, fetchData, getToken } from '../../services';
import { refreshNof } from '../../services/nof';

export function Login(props: any) {
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 500);
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
      await fetchData()
      await refreshNof()
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
        const oldToken = await AsyncStorage.getItem('userToken')
        if (oldToken) {
            const refreshToken = await getToken(JSON.parse(oldToken!))
            AsyncStorage.setItem('userToken', JSON.stringify(refreshToken.data))
            await fetchData()
            props.navigation.navigate('UserStack')
        }
    }
    checkLoginStatus()
  }, [])

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
            title={'Số điện thoại'}
            placeholder={'Vui lòng nhập số điện thoại'}
            text={phoneNumber}
            output={setPhoneNumber}
            rightIcon={validatePhoneNumber() ? 'check-circle-outline' : ''}
            keyboardType="numeric"
          />
          <InputPassword
            title="Mật khẩu"
            text={password}
            output={setPassword}
          />
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
                  Quên mật khẩu?
                </Text>
              </Pressable>
            </View>
          </View>

          <ButtonFullWidth
            content="Đăng nhập"
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
              Chưa có tài khoản?{' '}
            </Text>
            <Pressable onPress={() => props.navigation.navigate('SignupStack')}>
              <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
                Đăng ký
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </AnimatedSplash>
  );
}

export default Login;
