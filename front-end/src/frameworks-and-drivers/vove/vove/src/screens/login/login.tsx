import React, { useState } from 'react';
import { Image, ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {
  ButtonFullWidth,
  InputPassword,
  InputText,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';

export interface LoginProps {
  readonly navigation: any;
}

export function Login(props: LoginProps) {
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 2000);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

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
            output={setUsername}
            rightIcon={username === '' ? '' : 'check-circle-outline'}
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
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ ...TextStyle.h3, color: Color.grey_100 }}>
                Remember me{' '}
              </Text>
            </View>
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
              if (username === '' || password === '')
                Alert.alert('Please enter all information!');
              else
                props.navigation.navigate('UserStack', {
                  username: username,
                  password: password,
                });
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

          {/*<ButtonFullWidth*/}
          {/*  content="Login Failed"*/}
          {/*  onPress={() => props.navigation.navigate("LoginFailed")}*/}
          {/*></ButtonFullWidth>*/}
        </View>
      </ScrollView>
    </AnimatedSplash>
  );
}

export default Login;
