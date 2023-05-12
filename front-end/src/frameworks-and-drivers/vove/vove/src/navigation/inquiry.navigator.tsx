import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenSize} from '@front-end/shared/utils';
import Home from "../screens/home/home";
import SignupSucceed from "../screens/signup-succeed/signup-succeed";
import InquiryList from "../screens/inquiry-list/inquiry-list";
import InquiryDetail from "../screens/inquiry-detail/inquiry-detail";

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


export const InquiryStack = () => {
  return (
    <Stack.Navigator screenOptions={HeaderStyle} initialRouteName="InquiryList">
      <Stack.Screen name="InquiryList" component={InquiryList} options={{ headerShown: false }}/>
      <Stack.Screen name="InquiryDetail" component={InquiryDetail} options={{ title: "Inquiry Detail" }}/>
    </Stack.Navigator>
  );
};
