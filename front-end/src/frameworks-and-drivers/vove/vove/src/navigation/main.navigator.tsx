// Screen
import React from 'react';
import { Image } from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenSize } from '@front-end/shared/utils';
import { Login } from '../screens/login/login';
import LoginFailed from '../screens/login-failed/login-failed';
import ForgetPassword from '../screens/forget-password/forget-password';
import { SignUpStack } from './signup.navigator';
import { UserStack } from './user.navigator';
import { ForgetPasswordStack } from './forget-password.navigator';

export function MainStack() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginFailed"
          component={LoginFailed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPasswordStack"
          component={ForgetPasswordStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupStack"
          component={SignUpStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserStack"
          component={UserStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
