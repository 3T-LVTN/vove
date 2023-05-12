import React from 'react';
import ForgetPassword from '../screens/forget-password/forget-password';
import { createStackNavigator } from '@react-navigation/stack';
import InsertOtp from '../screens/insert-otp/insert-otp';
import {Image} from "react-native";
import ResetPassword from '../screens/reset-password/reset-password';
import ResetPasswordSucceed from '../screens/reset-password-succeed/reset-password-succeed';
import {ScreenSize} from "@front-end/shared/utils";

const Stack = createStackNavigator();

const backButtonImg = () => {
  return (
    <Image
      source={require("../images/back-button.png")}
      style={{
        height: ScreenSize.width * 0.1,
        width: ScreenSize.width * 0.1,
        marginLeft: ScreenSize.width * 0.06,
      }}
    />
  );
};

let center = "center" as "center" | "left" | undefined;


const HeaderStyle = {
  headerBackImage: backButtonImg,
  headerStyle: {
    backgroundColor: "white",
    height: ScreenSize.height * 0.1,
  },
  headerTitleStyle: {fontSize: ScreenSize.width * 0.05},
  headerTintColor: "black",
  headerBackTitleVisible: false,
  headerTitleAlign: center,
};

export const ForgetPasswordStack = () => {
  return (
    <Stack.Navigator screenOptions={HeaderStyle} initialRouteName="ForgetPassword">
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: "Forgot Password?" }}/>
      <Stack.Screen name="InsertOtp" component={InsertOtp} options={{ title: "Insert OTP" }}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Set New Password" }}/>
      <Stack.Screen
        name="ResetPasswordSucceed"
        component={ResetPasswordSucceed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
