import React from 'react';
import ForgetPassword from '../screens/forget-password/forget-password';
import { createStackNavigator } from '@react-navigation/stack';
import InsertOtp from '../screens/insert-otp/insert-otp';
import ResetPassword from '../screens/reset-password/reset-password';
import ResetPasswordSucceed from '../screens/reset-password-succeed/reset-password-succeed';

const Stack = createStackNavigator();

export const ForgetPasswordStack = () => {
  return (
    <Stack.Navigator initialRouteName="ForgetPassword">
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="InsertOtp" component={InsertOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="ResetPasswordSucceed"
        component={ResetPasswordSucceed}
      />
    </Stack.Navigator>
  );
};
