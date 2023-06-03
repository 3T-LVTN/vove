import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenSize } from '@front-end/shared/utils';
import Signup from '../screens/signup/sigup';
import SetNewPassword from '../screens/set-new-password/set-new-password';
import SignupSucceed from '../screens/signup-succeed/signup-succeed';
import InsertOtpSignup from '../screens/insert-otp/insert-otp-signup/insert-otp-signup';

const backButtonImg = () => {
  return (
    <Image
      source={require('../images/back-button.png')}
      style={{
        height: ScreenSize.width * 0.1,
        width: ScreenSize.width * 0.1,
        marginLeft: ScreenSize.width * 0.06,
      }}
    />
  );
};

let center = 'center' as 'center' | 'left' | undefined;

const HeaderStyle = {
  headerBackImage: backButtonImg,
  headerStyle: {
    backgroundColor: 'white',
    height: ScreenSize.height * 0.1,
  },
  headerTitleStyle: { fontSize: ScreenSize.width * 0.05 },
  headerTintColor: 'black',
  headerBackTitleVisible: false,
  headerTitleAlign: center,
};

export type SignupStackPropsData = {
  Signup: undefined;
  InsertOtpSignup: { phoneNumber: string };
  SetNewPassword: undefined;
  SignupSucceed: undefined;
};

const Stack = createStackNavigator<SignupStackPropsData>();

export const SignUpStack = () => {
  return (
    <Stack.Navigator screenOptions={HeaderStyle} initialRouteName="Signup">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="InsertOtpSignup"
        component={InsertOtpSignup}
        options={{ title: 'Insert OTP' }}
      />
      <Stack.Screen
        name="SetNewPassword"
        component={SetNewPassword}
        options={{ title: 'Set New Password' }}
      />
      <Stack.Screen
        name="SignupSucceed"
        component={SignupSucceed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
