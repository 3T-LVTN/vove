import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Signup, SetNewPassword, InsertOtpSignup } from '../screens'
import { HeaderStyle } from './header.style';

export const SignUpStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={HeaderStyle as any} initialRouteName="Signup">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Tạo tài khoản' }}
      />
      <Stack.Screen
        name="InsertOtpSignup"
        component={InsertOtpSignup}
        options={{ title: 'Xác thực OTP' }}
      />
      <Stack.Screen
        name="SetNewPassword"
        component={SetNewPassword}
        options={{ title: 'Tạo mật khẩu' }}
      />
    </Stack.Navigator>
  );
};
