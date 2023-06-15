import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InsertOtp, ForgetPassword, ResetPassword } from '../screens'
import { HeaderStyle } from './header.style'

export const ForgetPasswordStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={HeaderStyle as any}
      initialRouteName="ForgetPassword"
    >
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ title: 'Quên mật khẩu?' }}
      />
      <Stack.Screen
        name="InsertOtp"
        component={InsertOtp}
        options={{ title: 'Xác thực OTP' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'Đặt lại mật khẩu' }}
      />
    </Stack.Navigator>
  );
};
