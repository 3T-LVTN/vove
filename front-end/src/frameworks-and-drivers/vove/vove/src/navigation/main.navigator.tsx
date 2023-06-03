// Screen
import React from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpStack } from './signup.navigator';
import { UserStack } from './user.navigator';
import { ForgetPasswordStack } from './forget-password.navigator';
import { ActionFailed, Login } from '../screens';

export function MainStack() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="ForgetPasswordStack"
          component={ForgetPasswordStack}
        />
        <Stack.Screen
          name="SignupStack"
          component={SignUpStack}
        />
        <Stack.Screen
          name="UserStack"
          component={UserStack}
        />
        <Stack.Screen
          name="ActionFailed"
          component={ActionFailed}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
